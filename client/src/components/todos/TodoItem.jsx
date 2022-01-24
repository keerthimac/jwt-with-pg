import EditTodo from "./EditTodo";

function TodoItem({ todo, deleteTodo, editTodo }) {
  const handleDelete = () => {
    deleteTodo(todo.todo_id);
  };

  return (
    <tr>
      <td>{todo.description}</td>
      <td>
        <EditTodo editTodo={editTodo} todo={todo} />
      </td>
      <td>
        <button onClick={handleDelete} className='btn btn-danger'>
          {" "}
          delete
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;
