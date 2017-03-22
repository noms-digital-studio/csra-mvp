import React, {Component} from 'react';
import {Link} from 'react-router';

import {storeData, readSingleFile, clearBrowserStorage} from '../services';

import routes from '../constants/routes';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      errorMessage: '',
      success: false,
      successMessage: ''
    };
  }

  loadFile({target: {files, name}}) {
    readSingleFile(files[0], (error, data) => {
      if (error) return this.setState({error: true, success: false});

      try {
        JSON.parse(data);
      } catch (err) {
        return this.setState({error: true, success: false, errorMessage: err.message });
      }

      storeData(name, data);
      this.setState({error: false, success: true, successMessage: 'File successfully loaded'});
    });
  }

  clearBrowser() {
    clearBrowserStorage();
    this.setState({error: false, success: true, successMessage: 'Browser data cleared successfully'});
  }

  render() {
    return (
      <div>
        <h1 className="heading-xlarge">Admin</h1>

        {this.state.error &&
        <div className="error-summary" role="group" aria-labelledby="error-summary-heading-example-1" tabIndex="-1">

          <h1 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
            Whoops something went wrong. Please ensure that this is a valid JSON file.<br/>
            { this.state.errorMessage }
          </h1>

        </div>
        }

        {this.state.success &&
          <div className="govuk-box-highlight">
            <h1 className="bold-large">Success</h1>
            <p>
              { this.state.successMessage } <br />
            </p>
          </div>
        }

        <h3 className="heading-medium">Load Viper scores file</h3>
        <input name="viperScores" onChange={e => this.loadFile(e)} type="file"/>

        <h3 className="heading-medium">Reset</h3>
        <button onClick={() => this.clearBrowser()} className="button">
          Clear Browser Session and Local Storage
        </button>

        <Link to={routes.SIGN_IN} className="button c-btn-right--xcustom">Continue to sign in</Link>

      </div>
    );
  }

}

export default Admin;
