import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Hello World !ghg
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
        injectExtension(ext.id);
      }
    });
  };
}

const injectExtension = (id: string) => {
  const event = document.createEvent('Event');
  event.initEvent(JSON.stringify({ inject: id }));
  document.dispatchEvent(event);
};

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.dispose(function(data) {});

  module.hot.accept(function() {
    chrome.management.getAll(result => {
      const extensions = result.filter(x => x.type === 'extension' && x.name !== 'React Developer Tools');
      extensions.forEach(x => {
        injectExtension(x.id);
      });
    });
  });
}
