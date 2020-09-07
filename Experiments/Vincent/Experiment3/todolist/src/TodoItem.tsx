import React from "react";

interface TodoListProps{
    todo: Todo;
    toggleTodo: ToggleTodo;
}

export const TodoItem: React.FunctionComponent<TodoListProps> = ({todo, toggleTodo}) =>{
    return(
        <li>
            <label>
                <input type="checkbox" checked={todo.complete} 
                onChange={() => toggleTodo(todo)}/>
                {todo.text}
            </label>
        </li>
    );
}

export default TodoItem;