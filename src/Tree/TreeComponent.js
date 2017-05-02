import React from 'react'
import { Component } from 'react';
import Tree from './Tree';

export default class TreeComponent extends Component {

  handleAddChildClick = () => {
    const { addChild, createNode, id } = this.props;
    const childId = createNode().nodeId;
    addChild(id, childId);
  };

  handleRemoveClick = () => {
    const { removeChild, deleteNode, parentId, id } = this.props;
    removeChild(parentId, id);
    deleteNode(id);
  };

  handleChangeName = () => {
    const { changeName, id, name } = this.props;
    const result = prompt('Enter name of node', name) || name;

    changeName(id,result);
  };

  renderChild = childId => {
    const { id } = this.props;
    return (
      <div key={childId}>
        <Tree id={childId} parentId={id} />
      </div>
    )
  };

  render() {
    const { id, name, childIds, handleFetch, isFetching } = this.props;

    if(isFetching)
      return <div>Fetching data from the server...</div>;

    let remove = null;
    let control = null;
    if(id!==0) {
      remove = (
        <button onClick={this.handleRemoveClick}>
          Remove
        </button>
      );
    }
    else {
      control = (<button onClick={handleFetch}>Fetch from server</button>);
    }

    return (
      <div>
        {control}
        <div>
          {name}
          <button onClick={this.handleChangeName}>
            Change name
          </button>
          {remove}
          <button onClick={this.handleAddChildClick}>
            Add child
          </button>
          <ul>
            {childIds.map(this.renderChild)}
          </ul>
        </div>
      </div>
    )
  }
}