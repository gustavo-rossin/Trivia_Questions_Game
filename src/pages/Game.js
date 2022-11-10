import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions';
import Header from '../components/Header';
import Alternatives from '../components/Alternatives';

let timerInterval;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      results: [{
        question: '',
        category: '',
        incorrect_answers: [''],
        correct_answer: '',
      }],
      alternatives: [],
      questionIndex: 0,
      isLoading: true,
      showAnswer: false,
      timer: 30,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    try {
      const token = localStorage.getItem('token');
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0 || !data.results) {
        localStorage.removeItem('token');
        return history.push('/');
      }
      this.setState({ results: data.results, isLoading: false });
      this.shuffleQuestions(data.results);
      this.countTimer();
    } catch (error) {
      localStorage.removeItem('token');
      return history.push('/');
    }
  }

  shuffleQuestions = (results) => {
    const alternatives = [];
    results.forEach((element) => {
      const sortConstant = 0.5;
      const shuffledAlternatives = [...element.incorrect_answers, element.correct_answer]
        .sort(() => Math.random() - sortConstant);
      alternatives.push(shuffledAlternatives);
    });
    this.setState({ alternatives });
  };

  handleAnswer = ({ target }) => {
    const { results, questionIndex, timer } = this.state;
    const { dispatch } = this.props;
    const TEN = 10;
    const difficulties = { hard: 3, medium: 2, easy: 1 };
    if (results[questionIndex].correct_answer === target.value) {
      const score = TEN + (timer * difficulties[results[questionIndex].difficulty]);
      dispatch(addScore(score));
    }
    this.setState({ showAnswer: true });
  };

  countTimer = async () => {
    const ONE_SECOND = 1000;
    timerInterval = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
        showAnswer: prev.timer === 1 ? true : prev.showAnswer,
      }));
    }, ONE_SECOND);
  };

  render() {
    const { results, questionIndex, isLoading,
      alternatives, showAnswer, timer } = this.state;

    if (timer === 0 || showAnswer) {
      clearInterval(timerInterval);
    }
    return (
      <div className="App-header">
        <Header />
        <div className="timer-container">
          <span>
            {timer}
            {' '}
            s
          </span>
        </div>
        <div className="question-container">
          {isLoading ? (<p>...Loading</p>)
            : (
              <>
                <p data-testid="question-category">
                  {results[questionIndex].category}
                </p>
                <p type="button" data-testid="question-text">
                  {results[questionIndex].question}
                </p>
                <div data-testid="answer-options">
                  {alternatives[questionIndex].map((element, index) => (
                    <Alternatives
                      key={ `awnser-${questionIndex}-${index}` }
                      showAnswer={ showAnswer }
                      dataid={ results[questionIndex].correct_answer === element
                        ? 'correct-answer' : `wrong-answer-${index}` }
                      color={ results[questionIndex].correct_answer === element
                        ? 'rgb(6, 240, 15)' : 'red' }
                      handleAnswer={ this.handleAnswer }
                      element={ element }
                      timer={ timer }
                    />
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
