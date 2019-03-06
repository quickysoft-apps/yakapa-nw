import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Hello World !
        </Button>
        <div id="extension" />
      </div>
    );
  }

  private readonly onClick = () => {
    chrome.management.getAll(result => {
      const ext = result.find(x => x.shortName === 'Settings');
      if (ext) {
        console.log('Found extension', ext.name, process.env.NODE_ENV);

        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => console.log(x));
        });
        injectExtension(ext.id);
      }
    });
  };
}

const injectExtension = (id: string) => {
  const chromeExtensionUrl = `chrome-extension://${id}`;
  console.log('Inject', `(${chromeExtensionUrl})`);
  const event = document.createEvent('Event');
  event.initEvent(JSON.stringify({ inject: id }));
  document.dispatchEvent(event);
};

render(<App />, document.getElementById('root'));
