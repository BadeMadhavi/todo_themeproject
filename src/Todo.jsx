import React, { useState } from 'react';
import { combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import "./index.css";
 

const ADDTODO = 'ADDTODO';
const REMOVETODO = 'REMOVETODO';
const TOGGLETODO = 'TOGGLETODO';
const TOGGLETHEME = 'TOGGLETHEME';
 
const addTodo = (text) => ({ type: ADDTODO, payload: text })
const removeTodo = (id) => ({ type: REMOVETODO, payload: id })
const toggleTodo = (id) => ({ type: TOGGLETODO, payload: id })
const toggleTheme = () => ({ type: TOGGLETHEME });
 
 
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADDTODO:
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case REMOVETODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TOGGLETODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state;
  }
}
 
const themeReducer = (state = 'light', action) => {
  switch (action.type) {
    case TOGGLETHEME:
      return state === 'light' ? 'dark' : 'light'
    default:
      return state
  }
}
 
 
const rootReducer = combineReducers({
  todos: todosReducer,
  theme: themeReducer,
})
 
 
const Todo = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const theme = useSelector((state) => state.theme)
 
  const [input, setInput] = useState('')
  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input))
      setInput('')
    }
  }
 
  return (
    
    <div className={`app ${theme}`}>
         <button style={{backgroundColor:"gray",borderRadius:"50px",padding:"10px",color:"white",border:"none"}} 
         onClick={() => dispatch(toggleTheme())}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      <header>
        <h1>Todo List</h1>

      </header>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"/>
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => dispatch(toggleTodo(todo.id))}>{todo.text}</span>
            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Todo;
export { rootReducer };
 
 