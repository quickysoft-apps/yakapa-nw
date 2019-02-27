import React, { Component } from 'react';
import { render } from 'react-dom';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return <FlatButton {...this.props} label="Login" />;
  }
}

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class App extends Component {
  state = {
    logged: true
  };

  handleChange = (event, logged) => {
    this.setState({ logged: logged });
  };

  render() {
    return (
      <div>
        <Toggle
          label="Logged"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{ margin: 20 }}
        />
        <AppBar
          title="Title"
          iconElementLeft={
            <IconButton>
              <NavigationClose />
            </IconButton>
          }
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

// class App extends Component {

//   render() {
//     return (
//       <div>
//         <AppBar onClick={this.onClick} variant="contained" color="primary">
//           Hello World
//         </Button>
//         <div id="extension"></div>
//       </div>
//     );
//   }

//   private readonly onClick = () => {
//     chrome.management.getAll(result => {
//       const ext = result.find(x => x.shortName === 'Settings');
//       if (ext) {
//         console.log('Found extension', ext.name);
//         chrome.management.getPermissionWarningsById(ext.id, warnings => {
//           warnings.forEach(x => console.log(x));
//         });
//         //Send inject event
//         const event = document.createEvent('Event');
//         event.initEvent('injectExtension');
//         document.dispatchEvent(event);
//       }
//     });
//   };
// }

render(<App />, document.getElementById('root'));
