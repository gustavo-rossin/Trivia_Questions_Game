import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    const minAssertions = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Feedback);
