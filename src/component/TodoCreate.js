import React from 'react'
import './TodoCreate.css'
import { todoActions, addTodoAsync, todoSelector, todoEditIndex, updateTodoAsync } from '../redux/TodoReducer'
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions, notificationSelector } from '../redux/notificationReducer';

const TodoCreate = () => {

  const inputRef = useRef();
  const dispatch = useDispatch();
  const todos = useSelector(todoSelector);
  const editingIndex = useSelector(todoEditIndex)
  const message = useSelector(notificationSelector);


  useEffect(() => {
    if (editingIndex !== null) {
      inputRef.current.value = todos[editingIndex].title;
    }
  },[editingIndex,todos])


  const handleAdd = () => {
    const value = inputRef.current.value;
    if (value === "") {
      return  
    }

    if (editingIndex !== null) {
      dispatch(todoActions.add({ value, editingIndex }));
      dispatch(updateTodoAsync({ value, editingIndex }))
      dispatch(todoActions.update(null));
    } else {
      dispatch(todoActions.add({value,editingIndex:null}));
    dispatch(addTodoAsync({value,editingIndex:null}))
    }
  
    inputRef.current.value = ""; // Clearing input field after adding
  }

  if (message) {
    setTimeout(() => {
      dispatch(notificationActions.clear())
    },3000)
  }

  return (
      <div className='create-todo'>
      <h1>TODO CREATER</h1>
      
      {message && <div className={message?'notification-message':""}>{ message}<div className='time-reducing'></div></div>}
          <input ref={inputRef} className="input-tesk" type="text"></input>
          <button type='button' onClick={handleAdd}>{editingIndex?"Updata Task":"Create Task"}</button>
    </div>
  )
}

export default TodoCreate