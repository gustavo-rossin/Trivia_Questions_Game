import { ADD_USER } from '../actions';

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
  default:
    return state;
  }
};

export default player;
