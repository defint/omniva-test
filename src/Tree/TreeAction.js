import {v4} from 'node-uuid';

export const CREATE_NODE = 'tree/CREATE_NODE';
export const DELETE_NODE = 'tree/DELETE_NODE';
export const ADD_CHILD = 'tree/ADD_CHILD';
export const REMOVE_CHILD = 'tree/REMOVE_CHILD';
export const CHANGE_NAME = 'tree/CHANGE_NAME';

export const REQUEST_TREE = 'tree/REQUEST_TREE';
export const RECEIVE_TREE = 'tree/RECEIVE_TREE';

export const requestTree = () => ({
  type: REQUEST_TREE
});

export const receiveTree = (json) => ({
  type: RECEIVE_TREE,
  tree: json.tree
});

export const fetchTree = dispatch => {
  dispatch(requestTree());

  return new Promise((resolve) => {
    setTimeout(() => {
      fetch(`/dataSample.json`)
        .then(response => response.json())
        .then(json => dispatch(receiveTree(json)))
        .then(result => resolve(result));
    }, 3000)
  });
};

export const createNode = () => ({
  type: CREATE_NODE,
  nodeId: `node_${v4()}`
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
});

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
});

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
});

export const changeName = (nodeId, name) => ({
  type: CHANGE_NAME,
  nodeId,
  name
});
