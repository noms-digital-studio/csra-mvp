import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const noop = () => {};

class SelecteableInput extends Component {
    constructor(props) {
        super();
        this.state = {
            selected: !!props.selected,
            focused: false
        };
    }

    handleChange() {
        this.setState({ selected: !this.state.selected, focused: true });
    }

    handleBlur() {
        this.setState({ focused: false });        
    }

    render() {
        const { text, id, value, name, type, selected, focused, onChange, onBlur } = this.props;
        const isFocused = !!focused || this.state.focused;
        const isSelected = !!selected || this.state.selected;
        const onChangeFnc = onChange || this.handleChange.bind(this);
        const onBlurFnc = onBlur || this.handleBlur.bind(this); 

        const cssClasses = classnames({
            "block-label": true, 
            "selection-button-radio": type === 'radio',
            "selection-button-checkbox": type === 'checkbox',
            "selected": isSelected,
            "focused": isFocused,
        });
        
        return (
            <label 
                className={cssClasses}
                htmlFor={id}
            >
                <input 
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
        )
    }
}


SelecteableInput.propType = {
    onChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    selected: PropTypes.bool
};

export default SelecteableInput;
