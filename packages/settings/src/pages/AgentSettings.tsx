import React, { FC } from 'react';
import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { prisma } from '@yakapa/api';
import { Button } from '@material-ui/core';

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

export const AgentSettings: FC<{}> = () => {
  return (
    <div>
      <Formik
        initialValues={{ nickname: '', email: '' }}
        validate={validate}
        onSubmit={submit}
        render={(formikBag: FormikProps<FormValues>) => (
          <Form>
            <Field name="nickname" component={TextField} label="Nom de l'agent" margin="normal" fullWidth autoComplete="off" />
            <Field name="email" component={TextField} label="email" margin="normal" fullWidth autoComplete="off" />
            <Button type="submit" color="primary">
              Save
            </Button>
          </Form>
        )}
      />
    </div>
  );
};
