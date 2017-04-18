import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class SelectableInputWithComments extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: props.selected,
      focused: props.focused,
    };
  }

  handleChange() {
    this.setState({ selected: !this.state.selected });
  }

  handleBlur() {
    this.setState({ focused: false });
  }

  render() {
    const {
      text,
      id,
      value,
      commentValue,
      name,
      type,
      onChange,
      selected,
      required,
    } = this.props;

    const isSelected = onChange ? selected : this.state.selected;
    const onChangeFnc = onChange || (e => this.handleChange(e));

    return (
      <div className="c-radio-comment u-clear-fix">
        <span className="multiple-choice">
          <input
            checked={isSelected}
            data-input={value}
            id={id}
            type={type}
            name={name}
            defaultValue={value}
            required={required}
            onChange={onChangeFnc}
          />
          <label data-label={value} htmlFor={id}>{text}</label>
        </span>
        {isSelected &&
          <div className="panel panel-border-narrow">
            <div className="c-radio-comment__comment-box u-clear-fix">
              <label
                className="c-radio-comment__label"
                htmlFor={`reason-for-${name}`}
              >
                Use the box below to record the reasons for your answer:
              </label>
              <textarea
                maxLength="300"
                id={`reason-for-${name}`}
                name={`reasons-${value}`}
                className="form-control form-control-3-4"
                defaultValue={commentValue}
                cols="20"
                rows="5"
              />
            </div>
          </div>}
      </div>
    );
  }
}

SelectableInputWithComments.propType = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  selected: PropTypes.bool,
  required: PropTypes.bool,
};

SelectableInputWithComments.defaultProps = {
  required: false,
  selected: false,
  commentValue: '',
};

export default SelectableInputWithComments;
