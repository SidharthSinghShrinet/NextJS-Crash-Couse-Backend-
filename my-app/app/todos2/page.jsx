"use client";

import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn Next.js", completed: true },
    { id: 2, text: "Build a Todo App", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-bounce">📝</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            My Todos
          </h1>
          <p className="text-purple-300 text-lg">
            Stay organized and track your tasks
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20">
          {/* Input Section */}
          <div className="p-8 border-b border-purple-500/20 bg-gradient-to-r from-slate-800/50 to-purple-900/20">
            <form onSubmit={addTodo} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="✨ Add a new task..."
                className="flex-1 px-5 py-4 bg-slate-700/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300/60 backdrop-blur-sm transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all font-bold shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                Add
              </button>
            </form>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 p-8 bg-gradient-to-b from-purple-900/20 to-slate-900 border-b border-purple-500/20">
            <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <p className="text-4xl font-bold text-purple-400">
                {todos.length}
              </p>
              <p className="text-sm text-purple-300 mt-2">Total Tasks</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-blue-500/20 hover:border-blue-500/50 transition-all">
              <p className="text-4xl font-bold text-blue-400">{activeCount}</p>
              <p className="text-sm text-blue-300 mt-2">Active</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-green-500/20 hover:border-green-500/50 transition-all">
              <p className="text-4xl font-bold text-green-400">
                {completedCount}
              </p>
              <p className="text-sm text-green-300 mt-2">Completed</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="p-8 border-b border-purple-500/20 flex gap-3 justify-center flex-wrap bg-gradient-to-r from-slate-800/30 to-purple-900/10">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg transition-all font-semibold ${
                filter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-slate-700/50 text-purple-300 hover:bg-slate-600/70 border border-purple-500/30"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-6 py-2 rounded-lg transition-all font-semibold ${
                filter === "active"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                  : "bg-slate-700/50 text-blue-300 hover:bg-slate-600/70 border border-blue-500/30"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-6 py-2 rounded-lg transition-all font-semibold ${
                filter === "completed"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50"
                  : "bg-slate-700/50 text-green-300 hover:bg-slate-600/70 border border-green-500/30"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Todos List */}
          <div className="p-8">
            {filteredTodos.length === 0 && (
              <p className="text-center text-purple-300/60 py-12 text-lg">
                {todos.length === 0
                  ? "✨ No todos yet. Add one to get started!"
                  : "📭 No tasks in this category"}
              </p>
            )}

            <ul className="space-y-4">
              {filteredTodos.map((todo, index) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-700/40 to-slate-800/40 rounded-xl hover:from-slate-700/60 hover:to-purple-800/40 transition-all group border border-purple-500/10 hover:border-purple-500/30 backdrop-blur-sm"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <style>{`
                    @keyframes slideIn {
                      from {
                        opacity: 0;
                        transform: translateX(-10px);
                      }
                      to {
                        opacity: 1;
                        transform: translateX(0);
                      }
                    }
                  `}</style>

                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-6 h-6 rounded cursor-pointer flex-shrink-0 accent-purple-500"
                  />

                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => startEdit(todo.id, todo.text)}
                      className={`flex-1 cursor-pointer text-lg transition-all ${
                        todo.completed
                          ? "line-through text-slate-400"
                          : "text-purple-100 hover:text-white"
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}

                  {editingId === todo.id ? (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all text-sm font-semibold shadow-lg hover:shadow-green-500/50"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all text-sm font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="px-3 py-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all text-sm hover:scale-110"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-sm hover:scale-110"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-purple-300/70 text-sm">
            💡 Tip: Click text to edit • Check off to complete • Hover for
            actions
          </p>
        </div>
      </div>
    </div>
  );
}
