import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Search from 'material-ui/svg-icons/action/search';
import Polls from './Polls';

class Index extends Component {
  state = {
    drawerOpen: true
  }

  handleToggle = () => this.setState({drawerOpen: !this.state.drawerOpen})

  render() {
    const contentWidth = this.state.drawerOpen ? 'calc(100% - 256px)' : '100%';
    return (
      <MuiThemeProvider>

        <AppBar
          style={{backgroundColor: '#fff', width: contentWidth}}
          titleStyle={{color: '#333'}}
          title="PollVault"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              title='Toggle Filters'
              icon={this.state.drawerOpen ? <RightArrow color='#333' /> : <Search color='#333' />}
              onClick={this.handleToggle.bind(this)} />
          }
        />

        <Polls contentWidth={contentWidth} />

        <section>
          <Drawer open={this.state.drawerOpen} openSecondary={true}>
          </Drawer>
        </section>

      </MuiThemeProvider>
    );
  }
}

export default Index;
