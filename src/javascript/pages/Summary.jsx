import React, { Component } from 'react';
import { Link } from 'react-router';

const Summary = () => {
    return (
        <div>
            <h1 className="heading-xlarge">Summary Page Placeholder</h1>
            <Link className="button" to="/dashboard" role="button">Return to Dashboard</Link>
        </div>
    )
}

export default Summary;