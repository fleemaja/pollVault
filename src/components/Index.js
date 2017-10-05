import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Search from 'material-ui/svg-icons/action/search';
import Polls from './Polls';
import Dialog from 'material-ui/Dialog';
import AddPollForm from './AddPollForm';

class Index extends Component {
  state = {
    drawerOpen: true,
    addPollModalOpen: false
  }

  handleOpen = () => {
    this.setState({addPollModalOpen: true});
  };

  handleClose = () => {
    this.setState({addPollModalOpen: false});
  };

  handleDrawerToggle = () =>
    this.setState({drawerOpen: !this.state.drawerOpen})

  render() {
    const contentWidth = this.state.drawerOpen ? 'calc(100% - 256px)' : '100%';
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
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
              onClick={this.handleDrawerToggle.bind(this)} />
          }
        />

        <Polls contentWidth={contentWidth} />

        <section>
          <Drawer open={this.state.drawerOpen} openSecondary={true}>
            <RaisedButton
              label='+ Add New Poll'
              primary={true}
              fullWidth={true}
              onClick={this.handleOpen}
             />
            <Dialog
              title="Add New Poll"
              actions={actions}
              modal={true}
              open={this.state.addPollModalOpen}
            >
              <AddPollForm handleClose={this.handleClose.bind(this)}/>
            </Dialog>
          </Drawer>
        </section>

      </MuiThemeProvider>
    );
  }
}

export default Index;
