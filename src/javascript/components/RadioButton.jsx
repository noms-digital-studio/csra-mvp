import React, { Component } from 'react';

class RadioButton extends Component {
    render() {
        const { textValue, id, value, name } = this.props;

        return (
            <label className="block-label c-radio-control" htmlFor={id}>
                <input 
                    type="radio"
                    id={id} 
                    name={name} 
                    defaultValue={value}  
                />
                <span className="c-radio-control__indictor" />
                {textValue}
            </label>
        )
    }
}

export default RadioButton;
