import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uuid from 'uuid/v4';

import routes from '../constants/routes';

import Aside from '../components/asides/Index';
import SelectableInputGroup from '../components/SelectableInputGroup';

const HealthAssessment = ({ title, description, aside, onSubmit }) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h1 className="heading-medium">{title}</h1>
        <p>
          This section is to be completed following the Healthcare professional assessment.
          Ensure the Healthcare form has been fully completed before starting this section.
        </p>

        <h2 className="heading-medium">Healthcare assessment conducted by</h2>
        <input className="form-control u-margin-bottom-default" type="text" name="assessor-name" placeholder="Enter Name" />

        <p className="bold-small">{description}</p>
        <div className="form-group">
          <fieldset>
            <SelectableInputGroup
              type="radio"
              fields={[
                { value: 'yes', text: 'Yes', name: 'answer' },
                { value: 'no', text: 'No', name: 'answer' },
              ]}
            />
          </fieldset>
        </div>

        <p>
          <input type="submit" className="button" value="Save and continue" />
        </p>
        <p>
          <Link to={routes.SUMMARY}>Save and return</Link>
        </p>
      </form>
    </div>
    <div className="column-third">
      <Aside {...aside} />
    </div>
  </div>
);

HealthAssessment.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  aside: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default HealthAssessment;
