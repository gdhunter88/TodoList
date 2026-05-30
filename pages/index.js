import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState(() => {
    // Check if window is defined (client-side) before accessing localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), text: input.trim(), completed: false };
    setTodos(prev => [...prev, newTodo]);
    setInput('');
  };

  const toggleTodo = id => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      <Head><title>Todo List</title></Head>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Todo List</h1>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <button onClick={addTodo} style={{ padding: '0.5rem 1rem' }}>
          Add
        </button>
        <ul style={{ marginTop: '1rem' }}>
          {todos.map(t => (
            <li key={t.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', textDecoration: t.completed === 'true' ? 'line-through' : 'none' }}>
              <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t.id)} style={{ marginRight: '0.5rem' }} />
              <span>{t.text}</span>
              <button onClick={() => deleteTodo(t.id)} style={{ marginLeft: '1rem', background: 'transparent', border: 'none', color: 'red' }}>×</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}