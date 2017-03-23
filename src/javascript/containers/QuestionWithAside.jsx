import React, {PropTypes} from 'react';
import uuid from 'uuid/v4';

import Aside from '../components/asides/Index';
import SelectableInputGroup from '../components/SelectableInputGroup';

const QuestionWithAside = ({title, description, aside, onSubmit, formDefaults: {answer}, answerRequired}) => (
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
                  {value: 'yes', text: 'Yes', name: 'answer', required: answerRequired},
                  {value: 'no', text: 'No', name: 'answer', required: answerRequired},
                ]}
              />
            </fieldset>
          </div>

          <p>
            <input type="submit" className="button" value="Save and continue"/>
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
  aside: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formDefaults: PropTypes.shape({
    answer: PropTypes.string,
  }),
  answerRequired: PropTypes.bool,
};

QuestionWithAside.defaultProps = {
  formDefaults: {answer: ''},
  answerRequired: false
};

export default QuestionWithAside;
