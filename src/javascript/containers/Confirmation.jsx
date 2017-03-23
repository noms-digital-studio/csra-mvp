import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';

import SelectableInput from '../components/SelectableInput';

const Confirmation = ({ title, description, onSubmit, formDefaults: { confirmation } }) => (
  <div>
    <div className="grid-row">
      <div className="column-two-thirds">
        <h3 className="heading-medium">{title}</h3>
        <div role="note" aria-label="Information" className="panel panel-border-wide">
           <div dangerouslySetInnerHTML={{__html: description}} />
        </div>
      </div>
    </div>
    <div className="grid-row">
      <div className="column-two-thirds">
        <form className="c-confirmation-form" onSubmit={onSubmit} key={uuid()}>
          <p className="c-form-label-container u-clear-fix bold">
            <SelectableInput
              required
              type="checkbox"
              id="confirmation"
              value="accepted"
              text="I confirm that this has been explained to the prisoner"
              name="confirmation"
              selected={confirmation === 'accepted'}
            />
          </p>

          <p>
            <input className="button" type="submit" value="Save and continue" />
          </p>
        </form>
      </div>
    </div>
  </div>
);

Confirmation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func,
  formDefaults: PropTypes.shape({
    confirmation: PropTypes.string,
  }),
};

Confirmation.defaultProps = {
  formDefaults: {
    confirmation: '',
  },
};

export default Confirmation;
