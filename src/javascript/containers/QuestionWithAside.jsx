import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uuid from 'uuid/v4';

import Aside from '../components/asides/Index';
import SelectableInputGroup from '../components/SelectableInputGroup';

const QuestionWithAside = ({ title, description, aside, onSubmit }) => (
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
          <input type="submit" className="button" value="Save and continue" />
        </p>
        <p>
          <Link to="/">Save and return</Link>
        </p>
      </form>
    </div>
    <div className="column-third">
      <Aside {...aside} />
    </div>
  </div>
);

QuestionWithAside.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  aside: PropTypes.object.isRequired.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionWithAside;
