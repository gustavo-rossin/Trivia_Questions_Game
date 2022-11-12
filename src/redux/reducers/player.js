import { ADD_SCORE, ADD_USER } from '../actions';

const initialState = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  email: '', // email-da-pessoa
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      name: action.data.name,
      assertions: 0,
      score: 0,
      email: action.data.email,
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
