import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import routes from '../constants/routes';


class Signin extends Component {
  handleSubmit(e) {
    e.preventDefault();
    hashHistory.push({ pathname: `${routes.DASHBOARD}` });
  }

  render() {
    return (
      <form action="/" method="post" className="form" onSubmit={this.handleSubmit}>
        <h1 className="heading-xlarge">CSRA</h1>
        <h2 className="form-title heading-large">Sign in</h2>

        <div className="form-group">
          <label className="form-label-bold" htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" />
        </div>

        <div className="form-group">
          <label className="form-label-bold" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>

        <div className="form-group">
          <input type="submit" className="button" value="Sign in" />
        </div>
      </form>
    );
  }
}

export default Signin;
