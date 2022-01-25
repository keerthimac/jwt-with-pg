import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import InputTodos from "./InputTodos";
import ListTodos from "./ListTodos";

function Dashboard({ setAuth }) {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Logged out successfully");
    setAuth(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("/dashboard", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //get Todos
  const getTodos = async () => {
    try {
      const response = await fetch("/dashboard/todos", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //add todo
  const addTodo = async (todo) => {
    try {
      const response = await fetch("/dashboard/todos", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      console.log(data);
      setTodos([data, ...todos]);
      toast.info("todo added successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`dashboard/todos/${id}`, {
        method: "DELETE",
        headers: {
          token: localStorage.token,
        },
      });
      const data = await response.json();
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //Edit todo
  const editTodo = async (id, todo) => {
    try {
      console.log(id, todo);
      const response = await fetch(`dashboard/todos/${id}`, {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      setTodos(
        todos.map((todo) => (todo.todo_id === id ? { ...todo, ...data } : todo))
      );
      toast.info("todo updated successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className='d-flex'>
        <h2>
          Welcome! {user.user_first_name} {user.user_last_name}
        </h2>
        <Link to='/login'>
          <button onClick={handleLogout} className='btn btn-primary mx-2'>
            Log out
          </button>
        </Link>
      </div>
      <InputTodos addTodo={addTodo} />
      <ListTodos todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />

      {/* <Link to="/">
        <button className='btn btn-primary m-2'>Register</button>
      </Link> */}
    </div>
  );
}

export default Dashboard;
