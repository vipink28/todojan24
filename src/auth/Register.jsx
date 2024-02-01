import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Register(props) {

    const { registerUser, message, setMessage } = useContext(AuthContext);

    const [formData, setFormData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        setMessage("");
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerUser(formData);
    }

    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type="text" className='form-control' name='name' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="email" className='form-control' name='email' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" className='form-control' name='password' onChange={handleChange} />
            </div>
            <p>{message}</p>
            <button className='btn btn-primary' onClick={handleSubmit}>Register</button>
        </form>
    );
}

export default Register;