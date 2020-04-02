import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import EditIcon from '@material-ui/icons/Edit';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import TrashIcon from '@material-ui/icons/Delete';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';

import './ToDoList.css';
import IToDoListData from '../../interfaces/IToDoListData';

const OFFSET_VALUE = 1;

type Order = 'asc' | 'desc';

interface IProps {
  toDoItems: IToDoListData[],
  onRemoveItem(key: string): any
  onEditItemStart(data?: IToDoListData): any
};

interface IToDoListDataWithIndex {
  toDoItem: string,
  key: string,
  index: number
};

const ToDoList: React.FC<IProps> = (props) => {
  const [orderByActive, setorderByActive] = useState(false);
  const [order, setOrder] = useState<Order>('asc');
  const [query, setQuery] = useState('');

  const {toDoItems , onRemoveItem, onEditItemStart} = props;
  let filteredItems = toDoItems;

  if (query)
  {
    const lowercaseQuery = query.toLowerCase();
    filteredItems = toDoItems.filter(item => item.toDoItem.toLowerCase().includes(lowercaseQuery));
  }
   
  // Add index property
  const itemsWithIndex = filteredItems.map((item, index) => ({
    toDoItem: item.toDoItem,
    key: item.key,
    index: (index + OFFSET_VALUE)})
  );
  
  const orderedItems : IToDoListDataWithIndex[] = orderBy(
    itemsWithIndex,
    'index',
    order
  );

  const handleRequestSort = () : void => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setorderByActive(true);
  };

  const queryOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) : void => {
    setQuery(event.target.value);
  };


  const noItems = !orderedItems.length && !query? <p>No To Do Items have been registered.</p> : null;
  const tableContents = orderedItems.length || query? (
    <> 
      <div>
        <TextField
          label="Query To Do Items"
          value={query}
          onChange={queryOnChange}
          id='query'
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderByActive}
                  direction={orderByActive ? order : 'asc'}
                  onClick={handleRequestSort}
                >
                          Index
                  {
                    orderByActive ? (
                      <span className='visually-hidden'>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null
                  }
                </TableSortLabel>
              </TableCell>
              <TableCell>To Do Item</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody id='tableBody'>
            {
              orderedItems.map((row) => (
                <TableRow key={row.key}>
                  <TableCell component="th" scope="row">
                    {row.index}
                  </TableCell>
                  <TableCell>{row.toDoItem}</TableCell>
                  <TableCell>
                    <span
                      className="change-icon span-custom"
                      onClick={() => onEditItemStart({toDoItem: row.toDoItem, key: row.key})}
                      onKeyDown={() => onEditItemStart({toDoItem: row.toDoItem, key: row.key})}
                      role="button"
                      tabIndex={0}
                    >
                      <EditTwoToneIcon className="icon-default"  />
                      <EditIcon className="icon-hover" />
                    </span>
                    <span
                      className="change-icon"
                      onClick={() => onRemoveItem(row.key)}
                      onKeyDown={() => onRemoveItem(row.key)}
                      role="button"
                      tabIndex={0}
                    >
                      <DeleteTwoToneIcon className="icon-default"  />
                      <TrashIcon className="icon-hover" />
                    </span>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : null;


  return (
    <>
      {noItems}
      {tableContents}
    </>
  );
};

ToDoList.propTypes = {
  toDoItems: PropTypes.arrayOf(PropTypes.shape({
    toDoItem: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onEditItemStart: PropTypes.func.isRequired
};

export default ToDoList;
