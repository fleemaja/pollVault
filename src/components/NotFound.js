import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import AppTitle from './AppTitle';

const muiTheme = getMuiTheme({
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
  palette: {
    primary1Color: '#363636',
    textColor: '#363636',
    disabledColor: 'rgba(0,0,0,0.74)'
  }
});

class NotFound extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar
          style={{backgroundColor: '#fff'}}
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
