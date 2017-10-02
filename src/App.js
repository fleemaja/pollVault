import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    drawerOpen: true
  }

  handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen})

  render() {
    const appBarWidth = this.state.drawerOpen ? 'calc(100% - 256px)' : '100%';
    return (
      <MuiThemeProvider className="App">

        <AppBar
          style={{backgroundColor: '#fff', width: appBarWidth}}
          titleStyle={{color: '#333'}}
          title="PollVault"
          showMenuIconButton={false}
          iconElementRight={<RaisedButton label="Toggle Filters" onClick={this.handleToggle.bind(this)} />}
        />

        <div>
          <Drawer open={this.state.drawerOpen} openSecondary={true}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
