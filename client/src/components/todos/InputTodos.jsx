import { useState } from "react";

function InputTodos({ addTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      return;
    } else {
      const newTodo = {
        description: todo,
      };

      addTodo(newTodo);
      setTodo("");
    }
  };

  return (
    <div>
      <h1 className='text-center my-5'>Include Your Todo</h1>
      <form onSubmit={handleSubmit} className='d-flex'>
        <input
          type='text'
          value={todo}
          placeholder='Enter your todo'
          onChange={(e) => setTodo(e.target.value)}
          className='form-control '
        />
        <button className='btn btn-success'>Add</button>
      </form>
    </div>
  );
}

export default InputTodos;
