import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Jokes = () => {
    const [jokes, setJokes] = useState([]);
    const {push} = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3300/api/jokes", {withCredentials: true})
        .then(res => {
            console.log(res);
            setJokes(res.data);
        })
        .catch(err => {
            console.error(err)
            push('/login');
        });
       
    }, [push])
    return (
        <div>
            <ul>
                {jokes.map(joke => {
                    return <li key={joke.id}>{joke.joke}</li>
                })}
            </ul>
        </div>
    );
}

export default Jokes;