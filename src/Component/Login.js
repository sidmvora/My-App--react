import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../App';


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const { setIsLogedIn } = useContext(LoginContext)

    const handelSubmit = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/auth/login`, credentials)
            .then(res => {
                localStorage.setItem('authtoken', res.data.authtoken)
                setIsLogedIn(true)
                navigate('/');
            })
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-3'>
            <h2>Login to continue to My App</h2>
            <form onSubmit={handelSubmit}>
                <div className="mb-3 my-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login