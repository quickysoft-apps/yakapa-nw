import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PubNubReact from 'pubnub-react';
import { renderExtension } from '@yakapa/shared';

import { SettingsForm } from './components/SettingsForm';

interface Props {}

class Content extends Component<Props> {
  private pubnub: any;

  constructor(props: Props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-e151911f-1da3-4590-8ac7-8e5cb0332af0',
      subscribeKey: 'sub-c-b1756fc2-4328-11e9-b827-4e8ff5d9951b'
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    this.pubnub.subscribe({
      channels: ['channel1'],
      withPresence: true
    });

    this.pubnub.getMessage('channel1', (msg: string) => {
      console.log(msg);
    });

    this.pubnub.getStatus((st: any) => {
      this.pubnub.publish({
        message: `status ${JSON.stringify(st, null, 2)}`,
        channel: 'channel1'
      });
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['channel1']
    });
  }

  render() {
    const messages = this.pubnub.getMessage('channel1');

    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Click ME
        </Button>
        <SettingsForm />
        <div>
          <ul>
            {messages.map((m: any, index: number) => (
              <li key={'message' + index}>{m.message}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  private readonly onClick = () => {
    console.log('toto');
    chrome.runtime.sendMessage({ clicked: true });
  };
}

renderExtension(<Content />, module);
