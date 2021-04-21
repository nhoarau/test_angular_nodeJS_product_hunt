import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import filterBoardReducer from '../reducers/filterBoardReducer';
import csvEquipmentReducer from '../reducers/csvEquipmentReducer';
import csvCheckpointReducer from '../reducers/csvCheckpointReducer';
import {firestoreReducer} from "redux-firestore";

const rootReducer =  combineReducers({
  filterBoard: filterBoardReducer,
  equipmentCsv: csvEquipmentReducer,
  checkpointCsv: csvCheckpointReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer;