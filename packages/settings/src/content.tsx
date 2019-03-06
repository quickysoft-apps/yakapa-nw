import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { render } from 'react-dom';

class Content extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Je suis une fucking EXTENSION !!!!!!
        </Button>
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
    console.log('Hot reload extension', chrome.runtime.getManifest().name, `(chrome-extension://${id})`);
    chrome.runtime.sendMessage({ reload: id }, response => {
      console.log(response);
      if (response.inject) {
        injectExtension();
      }
    });
  });
}
