import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

class AppTitle extends Component {
  render() {
    return (
      <section>
        <Link to="/">
          <span style={{fontSize: 30}}>PollVault</span>
          <Logo />
        </Link>
      </section>
    )
  }
}

export default AppTitle;
