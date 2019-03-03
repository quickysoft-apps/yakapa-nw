import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { render } from 'react-dom';

class Content extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Je suis une fucking EXTENSIONvv
        </Button>
      </div>
    );
  }

  private readonly onClick = () => {
    chrome.runtime.sendMessage({ clicked: true });
  };
}

const eventType = JSON.stringify({ inject: chrome.runtime.id });
console.log('--------', eventType);

document.addEventListener(eventType, e => {
  console.log('---------------', e);
  injectExtension();
});

function injectExtension() {
  const root = document.getElementById('extension');
  if (root) {
    render(<Content />, root);
  }
}
