import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';

import Aside from '../components/asides/Index';
import SelectableInputGroup from '../components/SelectableInputGroup';

const HealthAssessment = (
  { title, description, aside, onSubmit, formDefaults: { answer, assessor } },
) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h1 className="heading-xlarge">{title}</h1>
        <p>
          This section is to be completed following the Healthcare professional assessment.
          Ensure the Healthcare form has been fully completed before starting this section.
        </p>

        <h2 className="heading-medium">Healthcare assessment conducted by</h2>
        <input
          defaultValue={assessor}
          className="form-control u-margin-bottom-default"
          type="text"
          name="assessor"
          placeholder="Enter Name"
        />

        <p className="bold-small">{description}</p>
        <div className="form-group">
          <fieldset>
            <SelectableInputGroup
              default={answer}
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
  formDefaults: PropTypes.shape({
    answer: PropTypes.string,
    accessor: PropTypes.string,
  }),
};

HealthAssessment.defaultProps = {
  formDefaults: {
    answer: '',
    accessor: '',
  },
};

export default HealthAssessment;
