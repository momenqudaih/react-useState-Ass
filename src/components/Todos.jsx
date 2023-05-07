const { useState } = require('react');

const Todos = () => {
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        const todo = document.querySelector('#todo');

        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                describtion: todo.value,
            },
        ]);

        todo.value = '';
        todo.focus();
    };

    const handleRemoveTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <input type="text" id="todo" />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {/* here we can separate the Todo component */}
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.describtion}
                        <button onClick={() => handleRemoveTodo(todo.id)}>
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;
