import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { EquipmentBoard } from './components/EquipmentBoard';
import { EquipmentDetail } from './components/EquipmentDetail';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import createReduxStore from './store/createReduxStore'
import { firebase } from './firebase'
import './App.css';
import { createFirestoreInstance } from "redux-firestore";

const rrfConfig = { userProfile: 'users',   useFirestoreForProfile: true }

const store = createReduxStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

class App extends Component {
  render() {
  return (
    <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <div className="App">
              <Switch>
                <Route exact path='/' component= { EquipmentBoard } />
                <Route path='/equipmentDetail' component={ EquipmentDetail } />
              </Switch>
          </div>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
    </React.StrictMode>
  )
  }
}

export default App;
