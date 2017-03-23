import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';

import SelectableInput from '../components/SelectableInput';
import Aside from '../components/asides/Index';

const Viper = (
  { content, aside, onSubmit, formDefaults: { confirmation }, viperScore },
) => (
  <div>
    <div className="grid-row">
      <div className="column-two-thirds">
        <h1 className="heading-large">{content[viperScore].title}</h1>

        <div dangerouslySetInnerHTML={{ __html: content[viperScore].description }} />

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
        <Aside {...{...aside, rating: viperScore}} />
      </div>
    </div>
  </div>
);

Viper.propTypes = {
  content: PropTypes.object,
  onSubmit: PropTypes.func,
  aside: PropTypes.object,
  formDefaults: PropTypes.shape({
    confirmation: PropTypes.string,
  }),
  rating: PropTypes.string,
};

Viper.defaultProps = {
  formDefaults: {
    confirmation: '',
  },
  aside: {},
  rating: 'unknown'
};

export default Viper;


