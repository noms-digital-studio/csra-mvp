import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import SelecteableInput from './SelecteableInput';

class SelecteableInputGroup extends Component {
    constructor(props) {
        super();
        this.state = { 
            selectedInputValue: props.default || '',
            selectedFocused: false 
        }
    }

    handleInputChange({ target }) {
        this.setState({ selectedInputValue: target.value, selectedFocused: true });
    }

    handleInputBlur() {
        this.setState({ selectedFocused: false });        
    }

    renderButtons() {
        const { fields, type } = this.props;

        return fields.map(({ name, value, text }) => (
            <SelecteableInput 
                key={`radio-${value}`}
                id={`radio-${value}`}
                name={name} 
                value={value}
                type={type}
                text={text}
                selected={ this.state.selectedInputValue === value }
                focused={ this.state.selectedInputValue === value && this.state.selectedFocused }
                onChange={(e) => this.handleInputChange(e)}
                onBlur={(e) => this.handleInputBlur(e) }
            />
        ));
    }

    render() {
        return (
            <div>
                {this.renderButtons()}
            </div>
        )
    }
}

SelecteableInputGroup.propTypes = {
    default: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string, 
        value: PropTypes.string, 
        text: PropTypes.string
    })),
    type: PropTypes.string
};

SelecteableInputGroup.defaultProps = {
    type: "checkbox"
};

export default SelecteableInputGroup;