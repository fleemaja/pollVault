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
          <h1 style={{fontSize: 128}}>{ "( > _ < )" }</h1>
          <p>Page Not Found</p>
        </section>
      </MuiThemeProvider>
    )
  }
}

export default NotFound;
