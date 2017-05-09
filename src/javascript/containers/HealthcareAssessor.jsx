import React, { PropTypes } from "react";
import uuid from "uuid/v4";

import Aside from "../components/asides/Index";

const HealthAssessment = ({
  title,
  description,
  aside,
  onSubmit,
  formDefaults,
}) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <form
        key={uuid()}
        action="/"
        method="post"
        className="form"
        onSubmit={onSubmit}
      >
        <h1 className="heading-large">{title}</h1>

        <div className="form-group">
          <label htmlFor="role" className="form-label-bold">Role/Position</label>
          <input
            data-input="role"
            className="form-control form-control-3-4"
            type="text"
            name="role"
            defaultValue={formDefaults.role}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="full-name" className="form-label-bold">Full name</label>
          <input
            data-input="full-name"
            className="form-control form-control-3-4"
            type="text"
            name="full-name"
            defaultValue={formDefaults['full-name']}
            required
          />
        </div>

        <div className="form-date u-clear-fix u-margin-bottom-large">
          <span className="form-label-bold">Date Completed</span>
          <span className="form-hint" id="hint">For example, 31 3 1980</span>
          <div className="form-group form-group-day">
            <label className="form-label" htmlFor="day">Day</label>
            <input
              data-input="day"
              className="form-control"
              id="day"
              name="day"
              type="number"
              pattern="[0-9]*"
              min="0"
              max="31"
              aria-describedby="hint"
              defaultValue={formDefaults['day']}
              required
            />
          </div>
          <div className="form-group form-group-month">
            <label className="form-label" htmlFor="month">Month</label>
            <input
              className="form-control"
              data-input="month"
              id="month"
              name="month"
              type="number"
              pattern="[0-9]*"
              min="0"
              max="12"
              defaultValue={formDefaults['month']}
              required
            />
          </div>
          <div className="form-group form-group-year">
            <label className="form-label" htmlFor="year">Year</label>
            <input
              className="form-control"
              data-input="year"
              id="year"
              name="year"
              type="number"
              pattern="[0-9]*"
              min="0"
              max="2017"
              defaultValue={formDefaults['year']}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" className="button" value="Save and continue" />
        </div>
      </form>
    </div>
    <div className="column-third">
      <Aside {...aside} />
    </div>
  </div>
);

HealthAssessment.propTypes = {
  title: PropTypes.string.isRequired,
  aside: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formDefaults: PropTypes.shape({
    role: PropTypes.string,
    'full-name': PropTypes.string,
    'day': PropTypes.string,
    'month': PropTypes.string,
    'year': PropTypes.string,
  })
};

HealthAssessment.defaultProps = {
  formDefaults: {
    role: '',
    'full-name': '',
    'day': '',
    'month': '',
    'year': '',
  },
};

export default HealthAssessment;
