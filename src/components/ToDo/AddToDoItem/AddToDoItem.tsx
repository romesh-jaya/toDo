import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../../UI/CustomButton/CustomButton';
import Card from '../../UI/Card/Card';
import IToDoListData from '../../../interfaces/IToDoListData';

import './AddToDoItem.css';

interface IProps {
  onAddToDoItem: (toDoItem: string) => void;
  onEditedToDoItem: (data: IToDoListData) => any;
  onCancelClicked: () => void; 
  editItem?: IToDoListData
}

const ZERO_POS = 0;
const MAX_INPUT_LENGTH = 100;

const AddToDoItem: React.FC<IProps> = (props) => {
  const [enteredItem, setEnteredItem] = useState('');
  const [errorText, setErrorText] = useState('');
  const { onAddToDoItem, editItem, onEditedToDoItem, onCancelClicked } = props;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!enteredItem.length) {
      setErrorText('Text is mandatory for a To Do item.');
    } else {
      if (!editItem)
      {
        onAddToDoItem(enteredItem);
      }
      else
      {
        onEditedToDoItem({toDoItem: enteredItem, key: editItem!.key});
      }
      setEnteredItem('');
      setErrorText('');
    }
  };

  const onItemChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let newVal = event.target.value;
    if (event.target.value.length > MAX_INPUT_LENGTH) {
      newVal = event.target.value.slice(ZERO_POS, MAX_INPUT_LENGTH);
    }
    setEnteredItem(newVal);
    setErrorText('');
  };

  const onCancelButtonClicked = () : void => {
    setEnteredItem('');
    setErrorText('');
    onCancelClicked();
  };

  useEffect(() => {
    if (editItem)
    {
      setEnteredItem(editItem.toDoItem);
    }
  }, [editItem]);

  return (
    <section className='margin-b-20'>
      <Card>
        <form onSubmit={submitHandler}>
          <p>
            {editItem? 'Edit existing To Do Item:' : 'Add new To Do Item:'}
          </p>
          <div className='margin-b-20 input-div-style'>
            <textarea
              id="item"
              value={enteredItem}
              className='input-style'
              onChange={onItemChanged}
            />
          </div>
          <div className='red-color'>
            <small id="errorText">{errorText}</small>
          </div>
          <div>
            <CustomButton buttonType="submit" margined curved id='btnSave'>
              Save
            </CustomButton>
            {
              editItem? (
                <CustomButton onClick={onCancelButtonClicked} margined curved id='btnCancel'>
                            Cancel
                </CustomButton>
              ) : null
            }
          </div>
        </form>
      </Card>
    </section>
  );
};

AddToDoItem.propTypes = {
  onAddToDoItem: PropTypes.func.isRequired,
  onEditedToDoItem: PropTypes.func.isRequired,
  onCancelClicked: PropTypes.func.isRequired,
  editItem: PropTypes.shape({
    toDoItem: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }),
};


AddToDoItem.defaultProps = {
  editItem: undefined
};


export default AddToDoItem;
