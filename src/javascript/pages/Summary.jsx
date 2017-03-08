import React, { Component } from 'react';
import { Link } from 'react-router';

const Summary = () => {
    return (
        <div>
            <h1 className="heading-xlarge">Summary Page Placeholder</h1>
            <Link className="button" to="/assessment/introduction" role="button">Restart Questionaire</Link>
        </div>
    )
}

export default Summary;