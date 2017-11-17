import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

class AppTitle extends Component {
  render() {
    return (
      <section>
        <Link to="/">
          <span style={{fontSize: 30, color: 'rgba(0,0,0,0.64)'}}>
            <strong>Poll</strong>
            <span>Vault</span>
          </span>
          <Logo />
        </Link>
      </section>
    )
  }
}

export default AppTitle;
