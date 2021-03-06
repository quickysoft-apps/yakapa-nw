import React, { useState, FC } from 'react';
import { Formik, FormikActions, FormikProps, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { prisma, Agent } from '@yakapa/api';
import { Button, Card, CardContent, CardActions, withStyles, WithStyles } from '@material-ui/core';
import { useLocalDB } from '@yakapa/shared';
import { useCurrentAgent } from '@yakapa/api';

const styles = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  }
};

interface FormValues {
  nickname: string;
  email: string;
}

type Errors = Partial<FormValues>;

const AgentIdentificationComponent: FC<WithStyles> = props => {
  const { classes } = props;
  const [editMode, setEditMode] = useState(false);
  const [agentId, setAgentId] = useLocalDB('agentId');
  const agent = useCurrentAgent();

  const validate = (values: FormValues) => {
    let errors: Errors = {};

    const email = values.email ? values.email.toLowerCase() : undefined;

    // Email
    if (!email) {
      errors.email = 'Obligatoire';
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)
    ) {
      errors.email = 'Adresse email incorrecte';
    }

    if (Object.keys(errors).length) {
      return errors;
    }

    return prisma.$exists.agent({ email }).then(result => {
      if ((result && agent && email !== agent.email) || (result && !agent)) {
        errors.email = 'Adresse email déjà utilisée';
      }
      if (Object.keys(errors).length) {
        throw errors;
      }
    });
  };

  const submit = async (values: FormValues, actions: FormikActions<FormValues>) => {
    try {
      let agent: Agent;
      const exists = agentId ? await prisma.$exists.agent({ id: agentId }) : false;
      if (exists) {
        agent = await prisma.updateAgent({
          data: {
            nickname: values.nickname,
            email: values.email
          },
          where: { id: agentId }
        });
        console.log('Agent updated', agent);
      } else {
        agent = await prisma.createAgent({
          nickname: values.nickname,
          email: values.email
        });
        console.log('Agent created', agent);
      }
      setAgentId(agent.id);
      setEditMode(false);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const cancel = (formikBag: FormikProps<FormValues>) => {
    formikBag.resetForm();
    setEditMode(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ nickname: agent ? agent.nickname : '', email: agent ? agent.email : '' }}
      validate={validate}
      onSubmit={submit}
      render={(formikBag: FormikProps<FormValues>) => {
        return (
          <Form>
            <Card>
              <CardContent>
                <Field name="nickname" component={TextField} label="Nom de l'agent" margin="normal" fullWidth autoComplete="off" disabled={!editMode} />
                <Field name="email" component={TextField} label="email" margin="normal" fullWidth autoComplete="off" disabled={!editMode} />
              </CardContent>
              <CardActions>
                {editMode && (
                  <div className={classes.buttonsContainer}>
                    <Button onClick={_ => cancel(formikBag)}>Annuler</Button>
                    <Button disabled={!formikBag.isValid} type="submit" color="primary">
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
        );
      }}
    />
  );
};

export const AgentIdentification = withStyles(styles, { withTheme: true })(AgentIdentificationComponent);
