import React, { Component } from 'react';
import { Link } from 'react-router';

import { SIGNIN } from '../constants/routes.js';

const readSingleFile = (file, callback) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ({ target: { result }}) => { 
        callback(null, result);
    }

    reader.onerror = (error) => {
        callback(error.message, null);
    } 

    reader.readAsText(file);
}

const storeData = (key, data) => {
    sessionStorage.setItem(key, data);
}

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
                <h3 className="heading-medium">Viper Scores File</h3>
                <input name="viperScores" onChange={::this.handleChange} type="file" ref={(ref) => { this.viperScoreInput }}/>

                {(this.state.error) && <div>Whoops something went wrong</div>}
                {(this.state.success) && <div><h2 className="c-message-text c-messgae-text--success">File successfully loaded</h2></div>}
                
                {(this.state.success) && <Link to="signin" className="button c-btn-right--xcustom">Continue to signin</Link>}

            </div>
        )
    }
}

export default LoadData;