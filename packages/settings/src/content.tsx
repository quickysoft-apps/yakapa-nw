import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { render } from 'react-dom';
import PubNubReact from 'pubnub-react';

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

    this.state = {
      newMessage: ''
    };
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
        message: 'hello world from react',
        channel: 'channel1'
      });
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['channel1']
    });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();

    this.pubnub.publish({
      message: event.target.value,
      channel: 'channel1'
    });
  };

  render() {
    const messages = this.pubnub.getMessage('channel1');

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Button onClick={this.onClick} variant="contained" color="primary">
            Je suis une fucking EXTENSION
          </Button>
          <div>
            <ul>
              {messages.map((m: any, index: number) => (
                <li key={'message' + index}>{m.message}</li>
              ))}
            </ul>
          </div>
          <div>
            <input type="text" name="newMessage" />
            <button type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }

  private readonly onClick = () => {
    console.log('toto');
    chrome.runtime.sendMessage({ clicked: true });
  };
}

const eventType = JSON.stringify({ inject: chrome.runtime.id });

document.addEventListener(eventType, e => {
  injectExtension();
});

function injectExtension() {
  const root = document.getElementById('extension');
  if (root) {
    render(<Content />, root);
  }
}

if (module.hot) {
  module.hot.accept(function() {
    const id = chrome.runtime.id;
    console.log(
      'Hot reload extension',
      chrome.runtime.getManifest().name,
      `(chrome-extension://${id})`
    );
    chrome.runtime.sendMessage({ reload: id }, response => {
      console.log(response);
      if (response.inject) {
        injectExtension();
      }
    });
  });
}
