import React, { FC, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core';
import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useExtensionEvent, useLocalStorage } from '@yakapa/shared';
import { Events } from '../events';

import { prisma, Network } from '@yakapa/api';

interface Props {
  open?: boolean;
}

interface FormValues {
  networkName: string;
}

type Errors = Partial<FormValues>;

export const AddNetworkDialog: FC<Props> = props => {
  const [open, setOpen] = useState(!!props.open);
  const [agentId, setAgentId] = useLocalStorage('agentId');
  useExtensionEvent(Events.OpenAddNetworkDialogEvent, () => setOpen(true));

  const validate = (values: FormValues) => {
    let errors: Errors = {};

    const networkName = values.networkName ? values.networkName.toLowerCase() : undefined;

    // Network name
    if (!networkName) {
      errors.networkName = 'Obligatoire';
    } else if (!/^[^\\/?%*:|"<>]+$/.test(values.networkName)) {
      errors.networkName = 'Nom du réseau non valide';
    }

    if (Object.keys(errors).length) {
      return errors;
    }

    //Async validate uniqueness of network name
    return prisma.$exists.network({ name: networkName, master: { id: agentId } }).then(result => {
      if (result) {
        errors.networkName = 'Nom de réseau déjà utilisé';
      }
      if (Object.keys(errors).length) {
        throw errors;
      }
    });
  };

  const submit = async (values: FormValues, actions: FormikActions<FormValues>) => {
    try {
      //TODO: call api for network creation
      console.log(values);
    } finally {
      actions.setSubmitting(false);
      setOpen(false);
    }
  };

  const cancel = (formikBag: FormikProps<FormValues>) => {
    formikBag.resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <Formik
        enableReinitialize
        initialValues={{ networkName: '' }}
        validate={validate}
        onSubmit={submit}
        render={(formikBag: FormikProps<FormValues>) => {
          return (
            <Form>
              <DialogTitle id="form-dialog-title">Ajouter un réseau</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Donnez un nom à votre réseau. Vous pourrez préciser par la suite sa localisation, ses contacts ainsi que plein d'autres détails. Vous pourrez ensuite inviter des
                  agents dans votre réseau.
                </DialogContentText>
                <Field name="networkName" component={TextField} autoFocus label="Nom du réseau" margin="normal" fullWidth autoComplete="off" />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => cancel(formikBag)}>Annuler</Button>
                <Button disabled={!formikBag.isValid} type="submit" color="primary">
                  Créer
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      />
    </Dialog>
  );
};
