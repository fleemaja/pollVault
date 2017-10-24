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
import TextField from 'material-ui/TextField';
import Signup from './Signup';
import Login from './Login';
import FlashMessagesList from './FlashMessagesList';
import { apiLogoutUser } from '../actions/users';
import { apiSearchPolls, fetchPolls } from '../actions/polls';
import { categories } from '../helpers';
import { connect } from 'react-redux';

class Index extends Component {
  state = {
    drawerOpen: true,
    addPollModalOpen: false,
    signupModalOpen: false,
    loginModalOpen: false,
    sortKey: 'votes',
    category: 'all',
    searchQuery: ''
  }

  handleOpen = () =>
    this.setState({addPollModalOpen: true});

  handleClose = () =>
    this.setState({addPollModalOpen: false});

  handleSignupOpen = () =>
    this.setState({signupModalOpen: true});

  handleSignupClose = () =>
    this.setState({signupModalOpen: false});

  handleLoginOpen = () =>
    this.setState({loginModalOpen: true});

  handleLoginClose = () =>
    this.setState({loginModalOpen: false});

  handleDrawerToggle = () =>
    this.setState({drawerOpen: !this.state.drawerOpen})

  handleSortKeyChange = (event, index, value) =>
    this.setState({sortKey: value});

  handleCategoryChange = (e) =>
    this.setState({ category: e.target.value })

  handleSearchQueryChange = (e) => {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
    if (searchQuery !== '') {
      this.props.searchPolls(searchQuery)
    } else {
      this.props.fetchPolls();
    }
  }

  render() {
    const auth = this.props.auth
    const searchQuery = this.state.searchQuery
    const contentWidth = this.state.drawerOpen ? 'calc(100% - 256px)' : '100%';
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const signupActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleSignupClose}
      />
    ];
    const loginActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleLoginClose}
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
        <FlashMessagesList />

        <Polls
          sortKey={this.state.sortKey}
          category={this.state.category}
          contentWidth={contentWidth} />

        <section>
          <Drawer open={this.state.drawerOpen} openSecondary={true}>
            <section style={{position: 'relative', display: 'inline-block', marginTop: 25}}>
             <Search style={{position: 'absolute', left: 0, top: 15, width: 20, height: 20}}/>
             <TextField
                style={{textIndent: 30}}
                value={searchQuery}
                onChange={this.handleSearchQueryChange.bind(this)}
                hintText="Search"
              />
            </section>
            <section style={{margin: 20}}>
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
                  {
                    categories.map(c => (
                      <RadioButton
                        label={c}
                        value={c} />
                    ))
                  }
                </RadioButtonGroup>
              </label>
            </section>
            <RaisedButton
              label='+ Add New Poll'
              primary={true}
              onClick={this.handleOpen}
              style={{marginLeft: '40px', marginTop: '40px'}}
             />
            <Dialog
              title="Add New Poll"
              autoScrollBodyContent={true}
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
            {
              auth.isAuthenticated ?
                <section>
                  <p>
                    Logged in as <strong>{ auth.user.username }</strong>
                  </p>
                  <RaisedButton
                    label='Logout'
                    onClick={() => this.props.logoutUser()}
                    style={{marginLeft: '40px', marginTop: '40px'}}
                   />
                 </section> :
                 <section>
                   <RaisedButton
                     label='Signup'
                     onClick={this.handleSignupOpen}
                     style={{marginLeft: '40px', marginTop: '40px'}}
                    />
                   <Dialog
                     title="Signup"
                     actions={signupActions}
                     autoScrollBodyContent={true}
                     modal={true}
                     open={this.state.signupModalOpen}
                   >
                     <Signup handleClose={this.handleSignupClose.bind(this)}/>
                   </Dialog>
                   <RaisedButton
                     label='Login'
                     onClick={this.handleLoginOpen}
                     style={{marginLeft: '40px', marginTop: '40px'}}
                    />
                   <Dialog
                     title="Login"
                     actions={loginActions}
                     autoScrollBodyContent={true}
                     modal={true}
                     open={this.state.loginModalOpen}
                   >
                     <Login handleClose={this.handleLoginClose.bind(this)}/>
                   </Dialog>
                </section>
            }
          </Drawer>
        </section>

      </MuiThemeProvider>
    );
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(apiLogoutUser()),
    fetchPolls: () => dispatch(fetchPolls()),
    searchPolls: (searchQuery) => dispatch(apiSearchPolls(searchQuery))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
