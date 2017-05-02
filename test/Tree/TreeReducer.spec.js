import deepFreeze from 'deep-freeze'
import reducer from '../../src/Tree/TreeReducer'
import {createNode,addChild,deleteNode,removeChild} from '../../src/Tree/TreeAction'

describe('reducer', () => {
  it('should provide the initial state', () => {
    expect(reducer(undefined, {})).not.toBeUndefined();
  });

  it('should handle CREATE_NODE action', () => {
    const stateBefore = {};
    const action = createNode();
    const stateAfter = {
      [action.nodeId]: {
        id: action.nodeId,
        childIds: [],
        name: "Unnamed node"
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  });

  it('should handle CREATE_NODE action', () => {
    const stateBefore = {};
    const action = createNode();
    const stateAfter = {
      [action.nodeId]: {
        id: action.nodeId,
        childIds: [],
        name: "Unnamed node"
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  });

  it('should handle ADD_CHILD action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        name: "Unnamed node",
        childIds: []
      },
      'node_1': {
        id: 'node_1',
        name: "Unnamed node",
        childIds: []
      }
    };
    const action = addChild('node_0', 'node_1');

    const stateAfter = {
      'node_0': {
        id: 'node_0',
        name: "Unnamed node",
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        name: "Unnamed node",
        childIds: []
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  });


  it('should handle DELETE_NODE action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        name: "Unnamed node",
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        name: "Unnamed node",
        childIds: []
      },
      'node_2': {
        id: 'node_2',
        name: "Unnamed node",
        childIds: [ 'node_3', 'node_4' ]
      },
      'node_3': {
        id: 'node_3',
        name: "Unnamed node",
        childIds: []
      },
      'node_4': {
        id: 'node_4',
        name: "Unnamed node",
        childIds: []
      }
    };

    const action = deleteNode('node_2');

    const stateAfter = {
      'node_0': {
        id: 'node_0',
        name: "Unnamed node",
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        name: "Unnamed node",
        childIds: []
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  });

  it('should handle REMOVE_CHILD action', () => {
    const stateBefore = {
      'node_0': {
        id: 'node_0',
        name: "Unnamed node",
        childIds: [ 'node_1' ]
      },
      'node_1': {
        id: 'node_1',
        name: "Unnamed node",
        childIds: []
      }
    };

    const action = removeChild('node_0', 'node_1');
    const stateAfter = {
      'node_0': {
        id: 'node_0',
        name: "Unnamed node",
        childIds: []
      },
      'node_1': {
        id: 'node_1',
        name: "Unnamed node",
        childIds: []
      }
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
});
