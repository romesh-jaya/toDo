import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import ToDoList from '../../components/ToDo/ToDoList';
import AddToDoItem from '../../components/ToDo/AddToDoItem/AddToDoItem';
import IToDoListData from '../../interfaces/IToDoListData';
 
const ToDoOverview: React.FC = () => {
  const [toDoListItemArray, setToDoListItemArray] = useState<IToDoListData[]>([]);
  const [firstTimeRun, setfirstTimeRun] = useState(true);
  const [editItem, setEditItem] = useState<IToDoListData>();
  const ref = useRef<IToDoListData[]>();

  const onAddToDoItem = (toDoItem: string): void => {
    const newToDoItem = { toDoItem, key: uuidv4() };
    setToDoListItemArray((prevArray) => [...prevArray, newToDoItem]);
  };

  const onEditedToDoItem = (data: IToDoListData): void => {
    let newEditItem;
    setToDoListItemArray((prevArray) => prevArray.map((item) => (item.key === data.key ? data : item)));
    setEditItem(newEditItem);
  };

  const onCancelClicked = () : void => {
    let newEditItem;
    setEditItem(newEditItem);
  };

  const onPerformDelete = (key: string) : void => {
    setToDoListItemArray((prevArray) => prevArray.filter((item) => item.key !== key));
  };

  const onRemoveItem = (key: string): void => {
    confirmAlert({
      title: 'Question',
      message: 'Are you sure you wish to remove this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {onPerformDelete(key);}
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };


  const onEditItemStart = (data: IToDoListData): void => {
    setEditItem(data);
  };

  // custom hook for getting previous value 
  const usePrevious = (value: IToDoListData[]) : any => {
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevToDoListItemArray = usePrevious(toDoListItemArray);

  // set localStorage
  useEffect(() => {
    if (firstTimeRun)
    {
      setfirstTimeRun(false);
      return;
    }

    if (JSON.stringify(toDoListItemArray) !== JSON.stringify(prevToDoListItemArray)) 
    {
      localStorage.setItem('toDoItems', JSON.stringify(toDoListItemArray));
    }
  }, [firstTimeRun, prevToDoListItemArray, toDoListItemArray]);

  // update localStorage
  useEffect(() => {
    const cacheVal = localStorage.getItem('toDoItems');
    if (cacheVal)
    {
      const parsedData = JSON.parse(cacheVal);
      if (parsedData && parsedData.length)
      {
        setToDoListItemArray(parsedData);
        ref.current = parsedData;
      }
    }
  }, []);

  return (
    <>
      <h1>To Do List</h1>
      <div className='margin-b-20'>
        <AddToDoItem onAddToDoItem={onAddToDoItem} editItem={editItem} onEditedToDoItem={onEditedToDoItem} onCancelClicked={onCancelClicked} />
      </div>
      <ToDoList toDoItems={toDoListItemArray} onRemoveItem={onRemoveItem} onEditItemStart={onEditItemStart} />
    </>
  );
};
 
export default ToDoOverview;