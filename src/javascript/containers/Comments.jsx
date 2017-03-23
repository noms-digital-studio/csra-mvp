import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';

import Aside from '../components/asides/Index';

const Comments = (
  {
    title,
    description,
    aside,
    onSubmit,
    formDefaults: {
      comments,
    },
  },
) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h1 className="heading-xlarge">{title}</h1>
        <div dangerouslySetInnerHTML={{__html: description}} />

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

Comments.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  aside: PropTypes.object,
  onSubmit: PropTypes.func,
  formDefaults: PropTypes.shape({
    comments: PropTypes.string,
  }),
};

Comments.defaultProps = {
  formDefaults: {
    comments: '',
  },
};

export default Comments;
