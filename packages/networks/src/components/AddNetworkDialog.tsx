import React, { FC, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';
import { useExtensionEvent } from '@yakapa/shared';
import { Events } from '../events';

interface Props {
  open?: boolean;
}

interface FormValues {
  networkName: string;
}

type Errors = Partial<FormValues>;

export const AddNetworkDialog: FC<Props> = props => {
  const [open, setOpen] = useState(!!props.open);
  useExtensionEvent(Events.OpenAddNetworkDialogEvent, () => setOpen(true));

  const validate = (values: FormValues) => {
    let errors: Errors = {};
    return errors;
  };

  const submit = async (values: FormValues, actions: FormikActions<FormValues>) => {
    try {
      console.log(values);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const cancel = (formikBag: FormikProps<FormValues>) => {
    formikBag.resetForm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Ajouter un réseau</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={{ networkName: '' }}
        validate={validate}
        onSubmit={submit}
        render={(formikBag: FormikProps<FormValues>) => {
          return (
            <>
              <DialogContent>
                <Form>
                  <Field name="networkName" component={TextField} autoFocus label="Nom du réseau" margin="normal" fullWidth autoComplete="off" />
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleClose} color="primary">
                  Créer
                </Button>
              </DialogActions>
            </>
          );
        }}
      />
    </Dialog>
  );
};
