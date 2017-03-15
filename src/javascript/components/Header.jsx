import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Header = ({ username }) => (
  <div>
    <header role="banner" id="global-header" className="c-global-header with-proposition">
      <div className="header-wrapper">
        <div className="header-global">
          <div className="header-logo">
            <Link to="/" title="Go to the HMPS homepage" id="logo" className="content">
              <img
                src={require('../../images/gov.uk_logotype_crown_invert_trans.png')}
                width="36"
                height="32"
                alt="GOV.UK"
              />
              <span>&nbsp;HMP</span>
            </Link>
          </div>
        </div>

        <div className="header-proposition">
          <div className="content">
            {username &&
              <div className="c-global-header__wrapper">
                <span className="c-global-header__username">{username}</span>
                <span className="c-profile-holder c-profile-holder--global-header"></span>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
    <div id="global-header-bar" />
  </div>
  );

Header.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = state => ({ username: state.user.name });


export { Header };
export default connect(mapStateToProps)(Header);
