import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './AppReducer';
import Tree from '../Tree/Tree';
import {loadState,saveState} from './LocalStorage';
import {throttle} from "lodash";
import thunk from "redux-thunk";

const middleware = [ thunk ];
const store = createStore(reducers,loadState(),applyMiddleware(...middleware));
store.subscribe(throttle(() => {
  saveState({
    tree: store.getState().tree
  });
},1000));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ul>
            <Tree id={0} />
          </ul>
        </div>
      </Provider>
    );
  }
}

export default App;
