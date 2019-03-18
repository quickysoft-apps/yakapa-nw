import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const ChatForm = () => {
  const [message, SetMessage] = useState('');

  return (
    <div>
      <TextField
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          SetMessage(e.currentTarget.value)
        }
      />
      <Button>Send</Button>
    </div>
  );
};
