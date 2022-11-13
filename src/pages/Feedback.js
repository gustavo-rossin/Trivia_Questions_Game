import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends React.Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRanking = () => {
    const { name, score, email, history } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    const userData = { name, score, picture };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([userData]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...ranking, userData]));
    }
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    const minAssertions = 3;
    return (
      <div data-testid="feedback-text" className="App-header">
        <Header />
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ranking
        </button>
        <div>
          <p>Seu score foi de:</p>
          <h2 data-testid="feedback-total-score">{score}</h2>
          <p>O número de perguntas corretas foi de:</p>
          <h4 data-testid="feedback-total-question">{assertions}</h4>
          {assertions >= minAssertions
            ? <h3>Well Done!</h3>
            : <h3>Could be better...</h3>}

          <button
            type="button"
            onClick={ this.handlePlayAgain }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
