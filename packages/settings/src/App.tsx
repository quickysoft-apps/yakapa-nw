import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }

  private readonly onClick = () => {
    console.log('nw', nw.Window.get());
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('---message----', message);
  console.log('---sender----', sender);
  if (message.injectApp) {
    injectApp();
    sendResponse({ startedExtension: true });
  }
});

function injectApp() {
  const div = document.createElement('div');
  div.setAttribute('id', 'chromeExtensionSettings');
  document.body.appendChild(div);
  render(<App />, div);
}
