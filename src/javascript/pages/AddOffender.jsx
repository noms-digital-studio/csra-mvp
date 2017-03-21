import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import serialize from 'form-serialize';

import moment from 'moment';
import { Link } from 'react-router';

import { allFormFieldsComplete } from '../utils';

import { addPrisoner } from '../actions'

import routes from '../constants/routes';

class AddOffender extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const formData = serialize(event.target, { hash: true });
    const FormInputNames = Array.from(event.target.elements)
      .filter(element => element.name !== '')
      .map(element => element.name);

    if (allFormFieldsComplete(formData, FormInputNames)) {
      this.props.onSubmit(formData);
    }
  }

  render() {
    const { date, prisonerDetails } = this.props;

    return (
      <div className="form-section">
        <p><Link className="link-back" to={routes.DASHBOARD}>Back to dashboard</Link></p>
        <header>
          <h1 className="heading-xlarge">
            <span className="heading-secondary">Add Offender</span>
            {date}
          </h1>
        </header>
        <form action="/" method="POST" onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label className="form-label-bold" htmlFor="first-name">First name</label>
            <input className="form-control" name="first-name" type="text" id="first-name" defaultValue={prisonerDetails['first-name']}/>
          </div>
          <div className="form-group">
            <label className="form-label-bold" htmlFor="last-name">Last name</label>
            <input className="form-control" name="last-name" type="text" id="last-name" defaultValue={prisonerDetails['last-name']}/>
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
                    defaultValue={prisonerDetails['dob-day']}
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
                    defaultValue={prisonerDetails['dob-month']}
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
                    defaultValue={prisonerDetails['dob-year']}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <label className="form-label-bold" htmlFor="nomis-id">Nomis ID</label>
            <span className="form-hint" id="nomis-id-hint">For example, A5558ZO</span>
            <input className="form-control" name="nomis-id" type="text" id="nomis-id" defaultValue={prisonerDetails['nomis-id']}/>
          </div>
          <input type="submit" className="button" value="Add offender" />
        </form>
      </div>
    );
  }
}

AddOffender.propTypes = {
  date: PropTypes.string,
  onSubmit: PropTypes.func,
  prisonerDetails: PropTypes.object,
};

AddOffender.defaultProps = {
  prisonerDetails: {},
};

const mapStateToProps = state => ({
  date: moment().format('dddd MMMM DD YYYY'),
  prisonerDetails: state.offender.prisonerFormData,
});

const mapActionsToProps = dispatch => ({
  onSubmit: (prisoner) => {
    dispatch(addPrisoner(prisoner));
    dispatch(push(routes.CONFIRM_OFFENDER));
  },
});

export { AddOffender };
export default connect(mapStateToProps, mapActionsToProps)(AddOffender);
