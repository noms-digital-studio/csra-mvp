import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';

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
    answerRequired
  },
) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h1 className="heading-xlarge">{title}</h1>
        <div dangerouslySetInnerHTML={{__html: description}} />

        <div className="form-group">
          <fieldset>
            <SelectableInputGroup
              default={answer}
              type="radio"
              fields={[
                { value: 'yes', text: 'Yes', name: 'answer', required: answerRequired  },
                { value: 'no', text: 'No', name: 'answer', required: answerRequired  },
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
