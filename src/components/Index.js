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
import Avatar from 'material-ui/Avatar';
import AddPollForm from './AddPollForm';
import SelectField from 'material-ui/SelectField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Signup from './Signup';
import Login from './Login';
import FlashMessagesList from './FlashMessagesList';
import UserAvatarForm from './UserAvatarForm';
import { apiLogoutUser } from '../actions/users';
import { fetchPolls } from '../actions/polls';
import { categories, letterToHexColor } from '../helpers';
import { connect } from 'react-redux';

class Index extends Component {
  state = {
    drawerOpen: true,
    addPollModalOpen: false,
    signupModalOpen: false,
    loginModalOpen: false,
    userMenuOpen: false,
    userAvatarModalOpen: false,
    anchorEl: null,
    sortKey: 'trending',
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

  handleUserMenuClose = () =>
    this.setState({userMenuOpen: false});

  handleUserAvatarOpen = () => {
    this.setState({userAvatarModalOpen: true})
  }

  handleUserAvatarClose = () =>
    this.setState({userAvatarModalOpen: false})

  handleDrawerToggle = () =>
    this.setState({drawerOpen: !this.state.drawerOpen})

  handleSortKeyChange = (event, index, value) => {
    const sortKey = value;
    const { searchQuery, category } = this.state;

    this.setState({ sortKey });
    this.props.fetchPolls(category, searchQuery, sortKey);
  }

  handleCategoryChange = (e) => {
    const category = e.target.value;
    const { searchQuery, sortKey } = this.state;

    this.setState({ category });
    this.props.fetchPolls(category, searchQuery, sortKey);
  }

  handleSearchQueryChange = (e) => {
    const searchQuery = e.target.value;
    const { category, sortKey } = this.state;

    this.setState({ searchQuery });
    this.props.fetchPolls(category, searchQuery, sortKey);
  }

  handleUserMenuTap = (e) => {
    this.setState({
      userMenuOpen: true,
      anchorEl: e.currentTarget,
    });
  };

  render() {
    const auth = this.props.auth
    const user = auth.user
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
    const avatarActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleUserAvatarClose}
      />
    ];
    const letter = user.username && user.username.charAt(0);
    return (
      <MuiThemeProvider>

        <AppBar
          style={{backgroundColor: '#fff', width: contentWidth, position: 'fixed', top: 0}}
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
        <section style={{marginTop: 64}}>
          <FlashMessagesList />

          <Polls
            sortType={this.state.sortKey}
            category={this.state.category}
            searchQuery={this.state.searchQuery}
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
                <MenuItem value='trending' primaryText='Trending' />
                <MenuItem value='popular' primaryText='Most Votes' />
                <MenuItem value='recent' primaryText='Most Recent' />
              </SelectField>
              {
                auth.isAuthenticated ?
                  <section style={{cursor: 'pointer'}} onClick={this.handleUserMenuTap}>
                    {
                      user.photo ?
                      <Avatar src={`uploads/${user.photo}`} /> :
                      <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
                    }
                    <span>
                      Logged in as <strong>{ user.username }</strong>
                    </span>
                    <Popover
                      open={this.state.userMenuOpen}
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                      onRequestClose={this.handleUserMenuClose}
                    >
                      <Menu>
                        <MenuItem
                          onClick={this.handleUserAvatarOpen}
                          primaryText="Change Avatar" />
                        <MenuItem
                          onClick={() => this.props.logoutUser()}
                          primaryText="Logout" />
                      </Menu>
                    </Popover>
                    <Dialog
                      title="Change User Avatar"
                      actions={avatarActions}
                      autoScrollBodyContent={true}
                      modal={true}
                      open={this.state.userAvatarModalOpen}
                    >
                      <UserAvatarForm handleClose={this.handleUserAvatarClose.bind(this)}/>
                    </Dialog>
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
    fetchPolls: (category, searchQuery, sortType) => dispatch(fetchPolls(category, searchQuery, sortType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
