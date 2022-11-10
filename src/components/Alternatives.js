import React from 'react';
import PropTypes from 'prop-types';

class Alternatives extends React.Component {
  render() {
    const { dataid, showAnswer, color, handleAnswer, element, timer } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataid }
        style={ { border: showAnswer && `3px solid ${color}` } }
        onClick={ handleAnswer }
        disabled={ timer < 1 }
      >
        {element}
      </button>
    );
  }
}

Alternatives.propTypes = {
  dataid: PropTypes.string.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Alternatives;
