import { UPDATE_FILTER } from '../actions/actionsType';

const filterBoardReducer = (state = {}, action) => {
  switch (action && action.type) {
    case UPDATE_FILTER:
      state = action.payload;
      return {...state};
    default:
      return state;
  }
};
  
export default filterBoardReducer;