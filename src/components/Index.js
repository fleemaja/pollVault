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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class Index extends Component {
  state = {
    drawerOpen: true,
    addPollModalOpen: false,
    sortKey: 'votes',
    category: 'all'
  }

  handleOpen = () =>
    this.setState({addPollModalOpen: true});

  handleClose = () =>
    this.setState({addPollModalOpen: false});

  handleDrawerToggle = () =>
    this.setState({drawerOpen: !this.state.drawerOpen})

  handleSortKeyChange = (event, index, value) =>
    this.setState({sortKey: value});

  handleCategoryChange = (e) =>
    this.setState({ category: e.target.value })

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

        <Polls
          sortKey={this.state.sortKey}
          category={this.state.category}
          contentWidth={contentWidth} />

        <section>
          <Drawer open={this.state.drawerOpen} openSecondary={true}>
            <section style={{width: '100%', height: '64px', borderBottom: '1px solid #ccc'}}>
            </section>
            <label for="category" style={{marginTop: '40px'}}>
              <p>Category</p>
              <RadioButtonGroup
                name="category"
                id="category"
                defaultSelected="all"
                onChange={this.handleCategoryChange.bind(this)}>
                <RadioButton
                  value="all"
                  label="All Categories"
                />
                <RadioButton
                  value="sports"
                  label="Sports"
                />
                <RadioButton
                  value="food"
                  label="Food"
                />
                <RadioButton
                  value="movies"
                  label="Movies"
                />
              </RadioButtonGroup>
            </label>
            <RaisedButton
              label='+ Add New Poll'
              primary={true}
              onClick={this.handleOpen}
              style={{marginLeft: '40px', marginTop: '40px'}}
             />
            <Dialog
              title="Add New Poll"
              actions={actions}
              modal={true}
              open={this.state.addPollModalOpen}
            >
              <AddPollForm handleClose={this.handleClose.bind(this)}/>
            </Dialog>

            <SelectField
              floatingLabelText="Sorting"
              value={this.state.sortKey}
              onChange={this.handleSortKeyChange}
              style={{width: 150, marginLeft: '40px'}}
            >
              <MenuItem value='votes' primaryText='Most Votes' />
              <MenuItem value='timestamp' primaryText='Most Recent' />
            </SelectField>
          </Drawer>
        </section>

      </MuiThemeProvider>
    );
  }
}

export default Index;
