import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const noop = () => {};

class SelecteableInput extends Component {
    constructor(props) {
        super();
        this.state = {
            focused: false
        };
    }

    render() {
        const { text, id, value, name, selected, focused, onChange, onBlur } = this.props;
        const cssClasses = classnames({
            "block-label": true, 
            "selection-button-radio": true,
            "selected": selected,
            "focused": focused,
        });

        return (
            <label 
                className={cssClasses}
                htmlFor={id}
            >
                <input 
                    id={id} 
                    type="radio" 
                    name={name} 
                    defaultValue={value} 
                    checked={selected}
                    onChange={onChange}
                    onBlur={onBlur}
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

SelecteableInput.defaultProps = {
    onChange: noop
};

export default SelecteableInput;
