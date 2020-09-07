import React from 'react';
import './App.css';
import TodoItem from "./TodoItem";
import {useState} from 'react';

const initialTasks: Array<Todo> = [{text: "Math Lecture", complete: true}, {text: "chem lab report", complete: false}];

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useState(initialTasks);
  
  const toggleTask: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => {
      if(todo === selectedTodo)
        return {
          ...todo,
          complete: !todo.complete
        }
        return todo;
    });
    setTodos(newTodos);
  };

  return (
    <React.Fragment>
      <TodoItem todo={initialTasks[0]} toggleTodo={toggleTask}  />
      <TodoItem todo={initialTasks[1]} toggleTodo={toggleTask}  />
    </React.Fragment>
  );
};

export default App;
