import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:8080', { withCredentials: true })
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteUser/${id}`, { withCredentials: true, })
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success mb-3"> Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-success me-2">Update</Link>
                                        <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}> Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Users;
