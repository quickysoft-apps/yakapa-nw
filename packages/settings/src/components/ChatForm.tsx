import React, { ChangeEvent, useState, useEffect } from 'react';
import PubNub from 'pubnub';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const ChatForm = () => {
  const [message, SetMessage] = useState('Envoyez votre message ici');
  const [response, setResponse] = useState('Ici les messages reçus');

  const sendMessage = () => {
    pubnub.publish(
      {
        message,
        channel: 'channel1',
        storeInHistory: true,
        sendByPost: true,
        meta: null
      },
      (status: { error: any }, response: { timetoken: any }) => {
        if (status.error) {
          // handle error
          console.log(status);
        } else {
          console.log('message Published w/ timetoken', response.timetoken);
        }
      }
    );
  };

  const pubnub = new PubNub({
    publishKey: 'pub-c-e151911f-1da3-4590-8ac7-8e5cb0332af0',
    subscribeKey: 'sub-c-b1756fc2-4328-11e9-b827-4e8ff5d9951b'
  });

  useEffect(() => {
    pubnub.addListener({
      status: function(statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
        }
      },
      message: function(msg) {
        setResponse(msg.message.text);
      }
    });
    pubnub.subscribe({
      channels: ['Channel1']
    });
  });

  return (
    <div>
      <TextField
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          SetMessage(e.currentTarget.value)
        }
      />
      <Button onClick={sendMessage}>Send</Button>
      <TextField value={response} />
    </div>
  );
};
