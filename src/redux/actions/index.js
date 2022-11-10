// ACTIONS TYPES
export const ADD_USER = 'ADD_USER';
export const ADD_SCORE = 'ADD_SCORE';

// ACTIONS CREATORS
export const addUser = (data) => ({
  type: ADD_USER,
  data,
});

export const addScore = (value) => ({
  type: ADD_SCORE,
  value,
});
