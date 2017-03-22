import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';

import { newLineToParagraph } from '../utils/components';

import SelectableInput from '../components/SelectableInput';
import Aside from '../components/asides/Index';

const ConfirmationWithAside = (
  { title, description, aside, onSubmit, formDefaults: { confirmation } },
) => (
  <div>
    <div className="grid-row">
      <div className="column-two-thirds">
        <h3 className="heading-medium">{title}</h3>
        <div role="note" aria-label="Information" className="panel panel-border-wide">
          {newLineToParagraph(description)}
        </div>

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
            <input type="submit" className="button" value="Save and continue" />
          </p>
        </form>
      </div>
      <div className="column-third">
        <Aside {...aside} />
      </div>
    </div>
  </div>
);

ConfirmationWithAside.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  aside: PropTypes.object,
  formDefaults: PropTypes.shape({
    confirmation: PropTypes.string,
  }),
};

ConfirmationWithAside.defaultProps = {
  formDefaults: {
    confirmation: '',
  },
};

export default ConfirmationWithAside;
