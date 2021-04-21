import { SET_EQUIPEMENT_DATA } from '../actions/actionsType';

const csvEquipmentReducer = (state = {}, action) => {
  switch (action && action.type) {
    case SET_EQUIPEMENT_DATA:
        state = action.payload;
        return {
            ...state
    }
    default:
      return state;
  }
};
  
export default csvEquipmentReducer;