import React from 'react';
import PropTypes from 'prop-types';

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
      questionIndex: 0,
      isLoading: true,
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
    } catch (error) {
      localStorage.removeItem('token');
      return history.push('/');
    }
  }

  render() {
    const { results, questionIndex, isLoading } = this.state;
    const sortConstant = 0.5;

    const wrongAnswers = results[questionIndex].incorrect_answers.map((e, i) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${i}` }
        key={ `wrong-answer-${i}-${questionIndex}` }
      >
        {e}
      </button>
    ));
    const correctAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        key={ `correct-answer-${questionIndex}` }
      >
        {results[questionIndex].correct_answer}
      </button>
    );

    const alternatives = [...wrongAnswers, correctAnswer]
      .sort(() => Math.random() - sortConstant);

    return (
      <div className="App-header">
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
                  {alternatives}
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
};

export default Game;
