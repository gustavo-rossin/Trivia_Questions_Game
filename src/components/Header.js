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
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p>Seu score foi de:</p>
        <h2 data-testid="header-score">{score}</h2>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <p>O número de perguntas corretas foi de:</p>
        <h4 data-testid="feedback-total-question">{assertions}</h4>
        {assertions >= minAssertions
          ? <h3>Well Done!</h3>
          : <h3>Could be better...</h3>}
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
