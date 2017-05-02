import { connect } from 'react-redux';
import * as actions from './TreeAction';
import TreeComponent from './TreeComponent';

const mapStateToProps = (state, ownProps) => {
  if(state.tree.isFetching) {
    return {
      isFetching: true
    }
  }

  return state.tree[ownProps.id];
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeName: (nodeId, name) => {
      dispatch(actions.changeName(nodeId, name));
    },
    addChild: (nodeId, childId) => {
      dispatch(actions.addChild(nodeId, childId));
    },
    removeChild: (nodeId, childId) => {
      dispatch(actions.removeChild(nodeId, childId));
    },
    deleteNode: (nodeId) => {
      dispatch(actions.deleteNode(nodeId));
    },
    createNode: () => {
      const action = actions.createNode();
      dispatch(action);
      return action;
    },
    handleFetch: () => {
      actions.fetchTree(dispatch);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);