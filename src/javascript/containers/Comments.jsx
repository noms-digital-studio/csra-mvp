import React, { PropTypes } from 'react';
import uuid from 'uuid/v4';
import CommentBox from '../components/CommentBox';

const Comments = (
  {
    title,
    description,
    onSubmit,
    formDefaults: {
      comments,
    },
  },
) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form key={uuid()} action="/" method="post" className="form" onSubmit={onSubmit}>
        <h1 className="heading-large">{title}</h1>
        <p className="lede text c-text-hint">{description}</p>
        <CommentBox
          id="commentBox"
          limit={300}
          text={comments}
          name="comments"
          cssClassName="form-control form-control-3-4 u-margin-bottom-default"
        />
        <p>
          <input type="submit" className="button" value="Save and continue" />
        </p>
      </form>
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
