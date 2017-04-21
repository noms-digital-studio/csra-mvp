import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import classnames from 'classnames';

class CommentBox extends Component {
  constructor(props) {
    super();
    this.state = {
      charactersLeft: props.limit - props.text.length,
    };
  }

  handleChange(e) {
    this.setState({ charactersLeft: this.props.limit - e.target.value.length });
  }

  render() {
    const { charactersLeft } = this.state;
    const { limit, text, name, cssClassName } = this.props;
    const handleChange = e => this.handleChange(e);

    return (
      <div>
        <textarea
          onChange={handleChange}
          onPaste={handleChange}
          spellCheck="true"
          maxLength={limit}
          id={name}
          name={name}
          className={cssClassName}
          defaultValue={text}
          cols="20"
          rows="5"
        />
        <p className="c-text-hint" data-character-limit={charactersLeft} >You have {charactersLeft} {pluralize('character', charactersLeft)} left.</p>
      </div>
    );
  }
}

CommentBox.defaultProps = {
  limit: 300,
  text: '',
  name: '',
  cssClassName: 'form-control',
};

CommentBox.propTypes = {
  limit: PropTypes.number,
  text: PropTypes.string,
  name: PropTypes.string,
  cssClassName: PropTypes.string,
};

export default CommentBox;
