import React from 'react';
import { shallow } from 'enzyme';
import Tree from '../../src/Tree/Tree';
import TreeComponent from '../../src/Tree/TreeComponent'
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

function setup(id, isFetching, childIds, parentId) {
  const actions = {
    addChild: jest.fn(),
    changeName: jest.fn(),
    createNode: jest.fn()
  };

  const component = shallow(
    <TreeComponent name="root node" id={id} isFetching={isFetching} parentId={parentId} childIds={childIds} {...actions} store={mockStore({
      tree: {
        isFetching: false,
        0: {
          id: 0,
          counter: 0,
          childIds: [],
          name: 'Unnamed node'
        }
      }
    })} />
  );

  return {
    component: component,
    addButton: component.findWhere(n => n.type() === 'button' && n.contains('Add child')),
    changeNameButton: component.findWhere(n => n.type() === 'button' && n.contains('Change name')),
    actions: actions
  }
}

describe('Tree component', () => {
  it('should display fetching message', () => {
    const { component } = setup(0, true, []);
    expect(component.text()).toMatch("Fetching data from the server...")
  });

  it('should display the root node', () => {
    const { component } = setup(0, false, []);
    expect(component.text()).toMatch("root node")
  });

  it('should not display the remove button on the root node', () => {
    const { component } = setup(0, false, []);
    expect(component.text()).not.toMatch("Remove")
  });

  it('should add new child node', () => {
    const { addButton, actions } = setup(0, false, []);
    actions.createNode.mockReturnValue({ nodeId: 3 });
    addButton.simulate('click');
    expect(actions.createNode).toBeCalled()
  });

  it('should change name of the node', () => {
    const { changeNameButton, actions } = setup(0, false, []);
    actions.changeName.mockReturnValue({ nodeId: 3 })
    changeNameButton.simulate('click');
    expect(actions.changeName).toBeCalled()
  });
});
