import { combineReducers } from 'redux';
import tree from '../Tree/TreeReducer';

const appReducer = combineReducers({
  tree
});

export default appReducer;