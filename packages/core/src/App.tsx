import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';

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
    chrome.tabs.create({ url: 'chrome-extension://kffcccokkgaooalajeihldalfjkfokob/dist/index.html' });
    chrome.management.getAll(result => {
      console.log(result);
    });
    chrome.runtime.sendMessage({ injectApp: true }, response => {
      console.log('RESPONSE', response);
    });
    // chrome.tabs.query({ index: 0 }, tabs => {
    //   const tabId = tabs[0].id || tabs[0].index;
    //   chrome.tabs.sendMessage(tabId, { injectApp: true });
    // });
  };
}

render(<App />, document.getElementById('root'));
