import React, { useReducer, ChangeEvent, FormEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface State {
  nickname: string;
  nicknameError: string;
  emailAddress: string;
  emailAddressError: string;
  submitted: boolean;
}

const defaultState = {
  nickname: '',
  nicknameError: '',
  emailAddress: '',
  emailAddressError: '',
  submitted: false
};

interface SetNickname {
  type: 'SET_NICKNAME';
  value: string;
}

interface SetEmailAddress {
  type: 'SET_EMAIL_ADDRESS';
  value: string;
}

interface Submit {
  type: 'SUBMIT';
  nickname: string;
  emailAddress: string;
}

type Actions = SetNickname | SetEmailAddress | Submit;

const validateNickname = (value: string) => {
  const error = value ? '' : 'You must enter a nickname';
  return error;
};

const validateEmailAddress = (value: string): string => {
  const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  )
    ? ''
    : 'You must enter a valid email address';
  return error;
};

export const SettingsForm = () => {
  const [state, dispatch] = useReducer((state: State, action: Actions) => {
    switch (action.type) {
      case 'SET_NICKNAME':
        return {
          ...state,
          nickname: action.value,
          nicknameError: validateNickname(action.value)
        };
      case 'SET_NICKNAME':
        return {
          ...state,
          emailAddress: action.value,
          emailAddressError: validateEmailAddress(action.value)
        };
      case 'SUBMIT':
        const nicknameError = validateNickname(action.nickname);
        const emailAddressError = validateEmailAddress(action.emailAddress);
        if (nicknameError === '' && emailAddressError === '') {
          // Store nickname and emailAdress somewhere... :)
          // prisma ...
          return {
            ...state,
            submitted: true
          };
        } else {
          return {
            ...state,
            nicknameError,
            emailAddressError
          };
        }
      default:
        return state;
    }
  }, defaultState);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
          type: 'SUBMIT',
          nickname: state.nickname,
          emailAddress: state.emailAddress
        });
      }}
    >
      <TextField
        id="nickname"
        label="Nickname"
        value={state.nickname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_NICKNAME', value: e.currentTarget.value })}
        margin="normal"
      />
      <TextField
        id="emailAddress"
        label="Email Address"
        value={state.emailAddress}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_EMAIL_ADDRESS', value: e.currentTarget.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};
