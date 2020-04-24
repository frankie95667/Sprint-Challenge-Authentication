import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const {push} = useHistory();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:3300/api/auth/login", values, {withCredentials: true})
      .then((res) => {
        console.log(res);
        push('/jokes');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Login Here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" ref={register()} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            ref={register()}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;
