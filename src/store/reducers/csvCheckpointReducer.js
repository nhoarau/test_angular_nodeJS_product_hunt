import { SET_CHECKPOINT_DATA } from '../actions/actionsType';

const csvCheckpointReducer = (state = {}, action) => {
  switch (action && action.type) {
    case SET_CHECKPOINT_DATA:
      state = action.payload;
      return {
          ...state
    }
    default:
      return state;
  }
};
  
export default csvCheckpointReducer;