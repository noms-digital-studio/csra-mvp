import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import routes from '../constants/routes';

const ConfirmOffender = ({ details: { First_Name, Date_of_Birth, NOMS_Number, Surname } }) => (
  <div>
    <h1 className="heading-xlarge">Offender Added</h1>

    <div className="grid-row">
      <div className="column-one-half">
        <p>
          <span className="heading-small">Name:&nbsp;</span>
          <span>{First_Name} {Surname}</span>
        </p>

        <p>
          <span className="heading-small">DOB:&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {Date_of_Birth}
        </p>
      </div>
      <div className="column-one-half">
        <p>
          <span className="heading-small">NOMIS No:</span> Unavailable
        </p>
      </div>
    </div>

    <p>
      <Link to={`${routes.DASHBOARD}`} className="button">
        Confirm
      </Link>
    </p>
    <Link to={routes.ADD_OFFENDER}>Edit</Link>
  </div>
);

// const mapStateToProps = state => ({
//   details: state.offender.selected,
// });

ConfirmOffender.propTypes = {
  details: PropTypes.shape({
    First_Name: PropTypes.string,
    Date_of_Birth: PropTypes.string,
    NOMS_Number: PropTypes.string,
    Surname: PropTypes.string,
  }),
};

ConfirmOffender.defaultProps = {
  details: {
    First_Name: 'Foo first name',
    Date_of_Birth: 'Foo DOB',
    NOMS_Number: 'Foo NOMS_Number',
    Surname: 'FOO surname',
  },
};

export default connect(null)(ConfirmOffender);
