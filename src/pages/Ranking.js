import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  sortNumbers = (a, b) => b.score - a.score;

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort(this.sortNumbers);
    const { history } = this.props;
    return (
      <div className="App-header">
        <h1 data-testid="ranking-title">Ranking</h1>
        { sortedRanking.map((user, index) => (
          <section key={ index }>
            <img src={ user.picture } alt={ user.name } />
            <p key={ index } data-testid={ `player-name-${index}` }>
              { user.name }
            </p>
            <p data-testid={ `player-score-${index}` }>
              { user.score }
            </p>

          </section>
        ))}
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Ranking;
