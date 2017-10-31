import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AppTitle extends Component {
  render() {
    return (
      <section>
        <Link to="/">
          PollVault
        </Link>
      </section>
    )
  }
}

export default AppTitle;
