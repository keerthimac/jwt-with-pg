import TodoItem from "./TodoItem";

function ListTodos({ todos, deleteTodo, editTodo }) {
  return (
    <div>
      <table className='table mt-5'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.todo_id}
              todo={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
            // <tr key={todo.id}>
            //   <td>{todo.description}</td>
            //   <td>edit</td>
            //   <td>delete</td>
            // </tr>
          ))}
          {/* <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodos;
