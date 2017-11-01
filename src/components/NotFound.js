import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AppTitle from './AppTitle';

class NotFound extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          style={{backgroundColor: '#fff'}}
          titleStyle={{color: '#333'}}
          title={<AppTitle />}
          showMenuIconButton={false}
        />
        <section style={{textAlign: 'center'}}>
          <p style={{fontSize: 128}}>{ "( > _ < )" }</p>
          <p>404 - Page Not Found</p>
        </section>
      </MuiThemeProvider>
    )
  }
}

export default NotFound;
