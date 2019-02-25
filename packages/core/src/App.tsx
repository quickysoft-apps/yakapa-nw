import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';

interface State {
  source?: string;
}

class App extends Component<{}, State> {
  /**
   *
   */
  constructor(props: {}) {
    super(props);
    this.state = {
      source: undefined
    };
  }
  render() {
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Hello World
        </Button>
        <webview src={this.state.source} />
      </div>
    );
  }

  private readonly onClick = () => {
    this.setState({
      source:
        'chrome-extension://kffcccokkgaooalajeihldalfjkfokob/dist/index.html'
    });
    // chrome.tabs.create({
    //   url: 'chrome-extension://kffcccokkgaooalajeihldalfjkfokob/dist/index.html'
    // });
    // chrome.management.getAll(result => {
    //   console.log(result);
    // });
    // chrome.runtime.sendMessage({ injectApp: true }, response => {
    //   console.log('RESPONSE', response);
    // });
    // chrome.tabs.query({ index: 0 }, tabs => {
    //   const tabId = tabs[0].id || tabs[0].index;
    //   chrome.tabs.sendMessage(tabId, { injectApp: true });
    // });
  };
}

render(<App />, document.getElementById('root'));
