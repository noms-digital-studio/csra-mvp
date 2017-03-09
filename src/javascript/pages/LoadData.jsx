import React, { Component } from 'react';
import { Link } from 'react-router';

import { SIGN_IN } from '../constants/routes.js';

import { storeData, readSingleFile } from '../services';

class LoadData extends Component {

    constructor() {
        super();
        this.state = {
            error: false,
            success: false
        }
    }

    handleChange({ target: { files, name }}) {
        readSingleFile(files[0], (error, data) => {
            if (error) return this.setState({ error: true, success: false });
            
            storeData(name, data);
            this.setState({error: false, success: true});
        });
    }

    render() {
        return (
            <div>
                <h1 className="heading-xlarge">Load data</h1>
                <h3 className="heading-medium">Offender NOMIS File</h3>
                <input name="offenderProfiles" onChange={::this.handleChange} type="file" />

                <h3 className="heading-medium">Viper Scores File</h3>
                <input name="viperScores" onChange={::this.handleChange} type="file" />

                {(this.state.error) && <div>Whoops something went wrong</div>}
                {(this.state.success) && <div><h2 className="c-message-text c-messgae-text--success">File successfully loaded</h2></div>}
                
                {(this.state.success) && <Link to={SIGN_IN} className="button c-btn-right--xcustom">Continue to sign in</Link>}

            </div>
        )
    }
}

export default LoadData;
