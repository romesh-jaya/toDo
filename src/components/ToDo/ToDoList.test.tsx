import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableRow from '@material-ui/core/TableRow';

import ToDoList from './ToDoList';

configure({ adapter: new Adapter() });

const ONE = 1;
const FOUR = 4;

describe('<ToDoList />', () => {
  let wrapper: any;

  const toDoItems= [
    { toDoItem: 'toDoItemTest1', key: 'abcdefg1'},
    { toDoItem: 'toDoItemTest2', key: 'abcdefg2'},
    { toDoItem: 'toDoItemTest3', key: 'abcdefg3'},
    { toDoItem: 'toDoItemTest4', key: 'abcdefg4'}
  ];

  it('should display the To Do Items in the table', () => {
    wrapper = mount(<ToDoList toDoItems={toDoItems} onRemoveItem={() => {}} onEditItemStart={() => {}}  />);
    expect(wrapper.find('#tableBody').find(TableRow)).toHaveLength(FOUR);
  });


  it('should filter out unwanted To Do Items when a query is entered', () => {
    wrapper = mount(<ToDoList toDoItems={toDoItems} onRemoveItem={() => {}} onEditItemStart={() => {}}  />);

    const queryEvent = {
      preventDefault() {},
      target: { value: '2' }
    };
    wrapper.find('input#query').simulate('change', queryEvent); // the TextField has an input control which contains the text

    expect(wrapper.find('#tableBody').find(TableRow)).toHaveLength(ONE);
  });
  
});

