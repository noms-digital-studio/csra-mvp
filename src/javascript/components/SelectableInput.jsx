import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


class SelectableInput extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: props.selected,
      focused: props.focused,
    };
  }

  handleChange() {
    this.setState({ selected: !this.state.selected, focused: true });
  }

  handleBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { text, id, value, name, type, onChange, onBlur, selected, focused } = this.props;

    const isFocused = onBlur ? focused : this.state.focused;
    const isSelected = onChange ? selected : this.state.selected;
    const onChangeFnc = onChange || (e => this.handleChange(e));
    const onBlurFnc = onBlur || (e => this.handleBlur(e));

    const cssClasses = classnames({
      'block-label': true,
      'selection-button-radio': type === 'radio',
      'selection-button-checkbox': type === 'checkbox',
      selected: isSelected,
      focused: isFocused,
    });

    return (
      <label className={cssClasses} htmlFor={id}>
        <input
          data-input={value}
          id={id}
          type={type}
          name={name}
          defaultValue={value}
          checked={isSelected}
          onChange={onChangeFnc}
          onBlur={onBlurFnc}
        />
        {text}
      </label>
    );
  }
}

SelectableInput.propType = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  selected: PropTypes.bool,
};


export default SelectableInput;
