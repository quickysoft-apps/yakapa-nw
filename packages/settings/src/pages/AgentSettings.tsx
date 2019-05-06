import React, { FC } from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps } from 'formik';
import { TextField } from 'formik-material-ui';

interface MyFormValues {
  nickname: string;
}

export const AgentSettings: FC<{}> = () => {
  return (
    <div>
      <Formik
        initialValues={{ nickname: '' }}
        onSubmit={(values: MyFormValues, actions: FormikActions<MyFormValues>) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        render={(formikBag: FormikProps<MyFormValues>) => (
          <Form>
            <Field name="nickname" component={TextField} label="Nom de l'agent" margin="normal" fullWidth variant="filled" autoComplete="off" />
          </Form>
        )}
      />
    </div>
  );
};
