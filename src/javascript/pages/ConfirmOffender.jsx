import React, { PropTypes } from 'react';
import { replace } from 'react-router-redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import routes from '../constants/routes';
import { confirmPrisoner } from '../actions'

const ConfirmOffender = (props) => {
  const { prisonerDetails: prisoner, onClick } = props;
  return (
    <div>
      <h1 className="heading-xlarge">Prisoner Added</h1>

      <div className="grid-row">
        <div className="column-one-half">
          <p>
            <span className="heading-small">Name:&nbsp;</span>
            <span>{prisoner['first-name']} {prisoner['last-name']}</span>
          </p>

          <p>
            <span className="heading-small">DOB:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {`${prisoner['dob-day']}-${prisoner['dob-month']}-${prisoner['dob-year']}`}
          </p>
        </div>
        <div className="column-one-half">
          <p>
            <span className="heading-small">NOMIS No:</span> {prisoner['nomis-id']}
          </p>
        </div>
      </div>

      <p>
        <button data-confirm onClick={() => { onClick(prisoner) }} className="button">
          Confirm
        </button>
      </p>
      <Link to={routes.ADD_OFFENDER}>Edit</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  prisonerDetails: state.offender.prisonerFormData,
});

const mapActionsToProps = dispatch => ({
  onClick: (prisoner) => {
    dispatch(confirmPrisoner(prisoner));
    dispatch(replace(routes.DASHBOARD));
  }
});

ConfirmOffender.propTypes = {
  prisonerDetails: PropTypes.object,
  onClick: PropTypes.func
};

ConfirmOffender.defaultProps = {
  prisonerDetails: {},
  onClick: () => {},
};

export {ConfirmOffender};

export default connect(mapStateToProps, mapActionsToProps)(ConfirmOffender);
