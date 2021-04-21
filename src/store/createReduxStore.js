import { createStore, applyMiddleware } from 'redux'
import rootReducer  from './reducers/reducer'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,  applyMiddleware(thunk));

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return store;
}