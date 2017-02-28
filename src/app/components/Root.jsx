import React from 'react';
import MainTemplate from '../templates/Main';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MainTemplate>
        <form action="/" method="post" className="form">
          <h1 className="heading-xlarge">CSRA</h1>
          <h2 className="form-title heading-large">Sign in</h2>

          <div className="form-group">
            <label className="form-label-bold" htmlFor="full-name">USERNAME</label>
            <input type="text" className="form-control" id="full-name" />
          </div>

          <div className="form-group">
            <label className="form-label-bold" htmlFor="password">PASSWORD</label>
            <input type="text" className="form-control" id="password" />
          </div>

          <div className="form-group">
            <input type="submit" className="button" value="Sign in" />
          </div>
        </form>
      </MainTemplate>
    );
  }
}

export default Root;