import React, {Component} from 'react';
import {Link} from 'react-router';

import routes from '../constants/routes';

import {storeData, readSingleFile} from '../services';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      success: false,
    };
  }

  handleChange({target: {files, name}}) {
    readSingleFile(files[0], (error, data) => {
      if (error) return this.setState({error: true, success: false});

      storeData(name, data);
      this.setState({error: false, success: true});
    });
  }

  clearBrowserData() {
    sessionStorage.clear();
    localStorage.clear();
  }

  render() {
    return (
      <div>
        <h1 className="heading-xlarge">Admin</h1>
        <h3 className="heading-medium">Load NOMIS file</h3>
        <input name="offenderProfiles" onChange={e => this.handleChange(e)} type="file"/>

        <h3 className="heading-medium">Load Viper scores file</h3>
        <input name="viperScores" onChange={e => this.handleChange(e)} type="file"/>

        {this.state.error && <div>Whoops something went wrong</div>}
        {this.state.success &&
        <div>
          <h2 className="c-message-text c-messgae-text--success">File successfully loaded</h2>
        </div>}


        <h3 className="heading-medium">Reset</h3>
        <button onClick={() => this.clearBrowserData()} className="button">
          Clear Browser Session and Local Storage
        </button>

        <Link to={routes.SIGN_IN} className="button c-btn-right--xcustom">Continue to sign in</Link>

      </div>
    );
  }

}

export default Admin;
