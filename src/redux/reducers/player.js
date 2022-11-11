import { ADD_SCORE, ADD_USER } from '../actions';

const initialState = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      ...action.data,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.value,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
