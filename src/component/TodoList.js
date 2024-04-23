import React, { useEffect } from 'react'
import './TodoList.css'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { todoSelector, todoActions, getTodoAsync, deleteTodoAsync, updateTodoAsync } from '../redux/TodoReducer';
import axios from 'axios';
import { GrUpdate } from "react-icons/gr";


//list element
const TodoList = () => {

  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getTodoAsync())
  }, [])



  const handleComplete = (index) => {
    dispatch(todoActions.toggleCompleted(index))
  }

  const handleDelete = (index) => {
    dispatch(todoActions.delete(index));
    dispatch(deleteTodoAsync(index))
  };

  const handleUpdate = (index) => {

    dispatch(todoActions.update(index));
  }

  return (
    <div className='outermost-div'>
      {todos.map((item, index) => {
        //   console.log("todos",item)
        return (
          <div className='todo-outer-div' key={index}>
            <div className='todo-list'>
              <span className='index'>{index + 1 + "."}</span>
              <div className={`todo-content ${item.completed ? 'task-completed' : ''}`}>{item.title}</div>

              <span className='time-span'>{item.time}</span>
              <span className={`checkbox ${item.completed ? 'completed' : 'pending'}`} onClick={() => handleComplete(index)} >{item.completed ? "Completed" : "Pending"}</span>

            </div>
            <button type='button' className='delete-button' onClick={() => handleDelete(index)}><MdDeleteForever className='delete-icon' /></button>
            <button type='button' className='update-button' onClick={() => handleUpdate(index)}><GrUpdate className='update-icon' /></button>
          </div>

        )
      })}
    </div>
  )
}

export default TodoList