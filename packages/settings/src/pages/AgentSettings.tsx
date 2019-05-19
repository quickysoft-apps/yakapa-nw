import React, { useState, FC } from 'react';
import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { prisma } from '@yakapa/api';
import { Button, Card, CardContent, CardActions, Theme, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  }
});

interface FormValues {
  nickname: string;
  email: string;
}

interface Errors {
  nickname?: string;
  email?: string;
}

const validate = (values: FormValues) => {
  let errors: Errors = {};

  // Email
  if (!values.email) {
    errors.email = 'Obligatoire';
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)
  ) {
    errors.email = 'Adresse email incorrecte';
  }

  return errors;
};

const submit = async (values: FormValues, actions: FormikActions<FormValues>) => {
  console.log({ values, actions });
  console.log(JSON.stringify(values, null, 2));
  const agent = await prisma.createAgent({
    nickname: values.nickname,
    email: values.email
  });
  console.log('Agent created', agent);
  actions.setSubmitting(false);
};

const AgentSettingsComponent: FC<WithStyles> = props => {
  const { classes } = props;
  const [editMode, setEditMode] = useState(false);
  return (
    <Formik
      initialValues={{ nickname: '', email: '' }}
      validate={validate}
      onSubmit={submit}
      render={(formikBag: FormikProps<FormValues>) => (
        <Form>
          <Card>
            <CardContent>
              <Field name="nickname" component={TextField} label="Nom de l'agent" margin="normal" fullWidth autoComplete="off" disabled={!editMode} />
              <Field name="email" component={TextField} label="email" margin="normal" fullWidth autoComplete="off" disabled={!editMode} />
            </CardContent>
            <CardActions>
              {editMode && (
                <div className={classes.buttonsContainer}>
                  <Button onClick={_ => setEditMode(false)}>Annuler</Button>
                  <Button type="submit" color="primary">
                    Enregistrer
                  </Button>
                </div>
              )}
              {!editMode && (
                <div className={classes.buttonsContainer}>
                  <Button color="primary" onClick={_ => setEditMode(true)}>
                    Modifier
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        </Form>
      )}
    />
  );
};

export const AgentSettings = withStyles(styles, { withTheme: true })(AgentSettingsComponent);
