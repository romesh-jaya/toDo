import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddToDoItem from './AddToDoItem';

configure({ adapter: new Adapter() });

describe('<AddToDoItem /> Basic adding functionality', () => {
  let wrapper: any;
  const mockCallback = jest.fn();

  beforeEach(() => {
    wrapper = mount(<AddToDoItem onAddToDoItem={mockCallback} onEditedToDoItem={() => {}} onCancelClicked={() => {}}  />);
  });

  it('should not display the Cancel Button', () => {
    expect(wrapper.find('#btnCancel').exists()).toBeFalsy();
  });

  it('should not display any error at start', () => {
    expect(wrapper.find('#errorText').text()).toBeFalsy();
  });

  it('should display an error when the Save Button is clicked - if Item is empty', () => {
    wrapper.find('button').simulate('submit');
    expect(wrapper.find('#errorText').text()).toBeTruthy();
  });

  it('should return name and country in onAddToDoItem() when the Save Button is clicked - if Item is filled in', () => {
    const itemEvent = {
      preventDefault() {},
      target: { value: 'testToDoItem' }
    };

    wrapper.find('#item').simulate('change', itemEvent);
    wrapper.find('button').simulate('submit');
    expect(mockCallback.mock.calls[0][0]).toEqual('testToDoItem');
  });
});

describe('<AddToDoItem /> Editing functionality', () => {
  let wrapper: any;
  const mockCallback = jest.fn();
  const editItem= { toDoItem: 'toDoItemTest', key: 'abcdefg'};

  beforeEach(() => {
    wrapper = mount(<AddToDoItem editItem={editItem} onAddToDoItem={() => {}} onEditedToDoItem={mockCallback} onCancelClicked={() => {}}  />);
  });

  it('should display the text to edit in the Item Input', () => {
    expect(wrapper.find('#item').text()).toEqual('toDoItemTest');
  });

  it('should display the Cancel Button', () => {
    expect(wrapper.find('#btnCancel').exists()).toBeTruthy();
  });

  it('should return edited text in onEditedToDoItem() when the Save Button is clicked', () => {
    const itemEvent = {
      preventDefault() {},
      target: { value: 'editedToDoItem' }
    };

    wrapper.find('#item').simulate('change', itemEvent);
    wrapper.find('#btnSave').simulate('submit');
    expect(mockCallback.mock.calls[0][0]).toEqual({ toDoItem: 'editedToDoItem', key: 'abcdefg'} );
  });
});

