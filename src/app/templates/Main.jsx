import React, { PropTypes } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainTemplate = ({ children }) => {
    return (
        <div className="o-csra-container">
          <Header location="Liverpool" />
          <main id="content" role="main">
            {children}
          </main>
          <Footer />
        </div>
    );
}

MainTemplate.propTypes = {
  children: PropTypes.element
};

export default MainTemplate;