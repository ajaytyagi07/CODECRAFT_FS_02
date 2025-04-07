import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/getUser/${id}`, { withCredentials: true })
            .then(result => {
                console.log("Fetched user:", result.data);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })
            .catch(err => console.log("Error fetching user:", err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/updateUser/${id}`, {
            name,
            email,
            age: Number(age)
        }, {
            withCredentials: true
        })
            .then(result => {
                console.log("Update successful:", result.data);
                navigate('/user');
            })
            .catch(err => {
                console.log("Update error:", err);
                alert("You are not authorized to update this user.");
            });
    };

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>

                    <div className='mb-2'>
                        <label>Employee Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label>Age</label>
                        <input
                            type="number"
                            placeholder='Enter Age'
                            className='form-control'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
