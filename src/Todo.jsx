function Todo({ todo, handleDelete, onToggle }) {
  return (
    <div className="todoItem">
      <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </p>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
}
export default Todo;
