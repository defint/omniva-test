import { ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE, CHANGE_NAME, REQUEST_TREE, RECEIVE_TREE } from './TreeAction';

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ];
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId);
    default:
      return state;
  }
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        childIds: [],
        name: "Unnamed node"
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name
      };
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      };
    default:
      return state;
  }
};

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
);

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state;
};

const tree = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TREE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_TREE:
      return {
        isFetching: false,
        ...action.tree
      };
    default:
      return state
  }
};

export default (state = {
  isFetching: false,
  0: {
    id: 0,
    childIds: [],
    name: 'Unnamed node'
  }
}, action) => {

  if(action.type === RECEIVE_TREE || action.type === REQUEST_TREE) {
    return {
      ...state,
      ...tree(state, action)
    }
  }

  const { nodeId } = action;

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
