import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Go to supermarket', completed: false },
    { id: 2, text: 'Do my homework', completed: true },
    { id: 3, text: 'Play game', completed: false },
    { id: 4, text: 'Read novel', completed: false }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');
  const [searchKey, setSearchKey] = useState('');

  // Thêm todo mới
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const newTask = { id: Date.now(), text: newTodo, completed: false };
    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  // Đánh dấu hoàn thành todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Lọc todo theo trạng thái
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'inprogress') return !todo.completed;
    return true;
  }).filter(todo => todo.text.toLowerCase().includes(searchKey.toLowerCase()));

  return (
    <div className="app">
      <h1>TODO</h1>
      
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Input search key" 
          value={searchKey} 
          onChange={(e) => setSearchKey(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="New task" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
        />
        <button onClick={handleAddTodo}>Create</button>
      </div>

      <div className="filter-container">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Done</button>
        <button onClick={() => setFilter('inprogress')}>In-progress</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;