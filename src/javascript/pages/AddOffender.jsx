import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import routes from '../constants/routes';

const AddOffender = ({ date }) => (
  <div className="form-section">
    <p><Link className="link-back" to={routes.DASHBOARD}>Back to dashboard</Link></p>
    <header>
      <h1 className="heading-xlarge">
        <span className="heading-secondary">Add Offender</span>
        {date}
      </h1>
      {/* <div className="grid-row">
            <div className="column-one-half">
                <h1 className="heading-large">Add Offender</h1>
            </div>
            <div className="column-one-half u-text-align-right">
                <span className="heading-large u-d-block">{date}</span>
            </div>
        </div>*/}
    </header>
    <form>
      <div className="form-group">
        <label className="form-label-bold" htmlFor="first-name">First name</label>
        <input className="form-control" name="first-name" type="text" id="first-name" />
      </div>
      <div className="form-group">
        <label className="form-label-bold" htmlFor="last-name">Last name</label>
        <input className="form-control" name="last-name" type="text" id="last-name" />
      </div>
      <div className="form-group">
        <fieldset>
          <legend>
            <span className="form-label-bold">Date of birth</span>
            <span className="form-hint" id="dob-hint">For example, 31 3 1980</span>
          </legend>
          <div className="form-date">
            <div className="form-group form-group-day">
              <label className="form-label" htmlFor="dob-day">Day</label>
              <input
                className="form-control"
                id="dob-day"
                name="dob-day"
                type="number"
                pattern="[0-9]*"
                min="0"
                max="31"
                aria-describedby="dob-hint"
              />
            </div>
            <div className="form-group form-group-month">
              <label className="form-label" htmlFor="dob-month">Month</label>
              <input
                className="form-control"
                id="dob-month"
                name="dob-month"
                type="number"
                pattern="[0-9]*"
                min="0"
                max="12"
              />
            </div>
            <div className="form-group form-group-year">
              <label className="form-label" htmlFor="dob-year">Year</label>
              <input
                className="form-control"
                id="dob-year"
                name="dob-year"
                type="number"
                pattern="[0-9]*"
                min="0"
                max="2016"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div className="form-group">
        <label className="form-label-bold" htmlFor="nomis-id">Nomis ID</label>
        <span className="form-hint" id="dob-hint">For example, A5558ZO</span>
        <input className="form-control" name="nomis-id" type="text" id="nomis-id" />
      </div>
      {/* <input type="submit" className="button" value="Add offender" />*/}
      <Link className="button" to={routes.CONFIRM_OFFENDER}>Add offender</Link>
    </form>
  </div>
  );

AddOffender.propTypes = {
  date: PropTypes.string,
  onSubmit: PropTypes.func,
};

AddOffender.defaultProps = {
  date: moment().format('dddd MMMM DD YYYY'),
};

export { AddOffender };
export default connect(null)(AddOffender);
