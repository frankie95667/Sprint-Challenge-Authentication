import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const { handleSubmit, register, errors }  = useForm();
    const {push} = useHistory();

    const onSubmit = values => {
        axios.post("http://localhost:3300/api/auth/register", values)
        .then(res => {
            console.log(res);
            push("/login");
        })
        .catch(err => console.error(err));
    }

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
                    <input id="password" name="password" type="password" ref={register()} />
                </div>
                <div>
          <button type="submit">Register</button>
        </div>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}

export default Register;