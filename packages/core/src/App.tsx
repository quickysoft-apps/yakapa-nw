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
    console.log('----->', this.state.source);
    return (
      <div>
        <Button onClick={this.onClick} variant="contained" color="primary">
          Hello World
        </Button>
        <webview id="app" partition="trusted" src={this.state.source} />
      </div>
    );
  }

  private readonly onClick = () => {
    chrome.management.getAll(result => {
      console.log(result);
      const ext = result.find(x => x.shortName === 'Settings');
      if (ext) {
        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => console.log(x));
        });

        this.setState({
          source: `chrome-extension://${ext.id}/index.html`
        });
      }
    });
  };
}

render(<App />, document.getElementById('root'));
