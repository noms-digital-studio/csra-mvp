import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uuid from 'uuid/v4';

import routes from '../constants/routes';

import Aside from '../components/asides/Index';
import SelectableInputGroup from '../components/SelectableInputGroup';

const QuestionWithComments = ({ title, description, aside, onSubmit }) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h3 className="heading-medium">{title}</h3>
        <p>{description}</p>

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
          <textarea placeholder="Comments" rows="5" cols="20" className="form-control form-control-3-4" />
        </p>

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

QuestionWithComments.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  aside: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionWithComments;
