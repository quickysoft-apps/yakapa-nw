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
        <div id="extension" />
      </div>
    );
  }

  private readonly onClick = () => {
    chrome.management.getAll(result => {
      const ext = result.find(x => x.shortName === 'Settings');
      if (ext) {
        console.log('Found extension', ext.name);
        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => console.log(x));
        });
        //Send inject event
        const event = document.createEvent('Event');
        event.initEvent('injectExtension');
        document.dispatchEvent(event);
      }
    });
  };
}

render(<App />, document.getElementById('root'));
