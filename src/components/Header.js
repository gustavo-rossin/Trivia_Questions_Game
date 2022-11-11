import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, score, email, assertions } = this.props;
    const minAssertions = 3;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        {assertions >= minAssertions
          ? <p>Well Done!</p>
          : <p>Could be better...</p>}
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
