import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uuid from 'uuid/v4';

import routes from '../constants/routes';

import { newLineToParagraph } from '../utils/components';

import Aside from '../components/asides/Index';
import SelectableInputGroup from '../components/SelectableInputGroup';

const QuestionWithComments = (
  {
    title,
    description,
    aside,
    onSubmit,
    formDefaults: {
      answer,
      comments,
    },
  },
) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h3 className="heading-medium">{title}</h3>
        {newLineToParagraph(description)}

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
          <textarea
            defaultValue={comments}
            name="comments"
            placeholder="Comments"
            rows="5"
            cols="20"
            className="form-control form-control-3-4"
          />
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
  title: PropTypes.string,
  description: PropTypes.string,
  aside: PropTypes.object,
  onSubmit: PropTypes.func,
  formDefaults: PropTypes.shape({
    answer: PropTypes.string,
    comments: PropTypes.string,
  }),
};

QuestionWithComments.defaultProps = {
  formDefaults: {
    answer: '',
    comments: '',
  },
};

export default QuestionWithComments;
