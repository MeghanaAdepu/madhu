import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./u.css";

function UpdateUser() {
    const [userData, setUserData] = useState({ idno: '', name: '', email: '', age: '', phno: '' });
    const navigate = useNavigate();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFetchUserDetails = async (e) => {
        e.preventDefault();
        const userId = userData.idno;
        if (!userId) {
            setErrorMessage("Please enter a valid ID number.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/getuser/${userId}`);
            if (response.status === 404) {
                setErrorMessage(`User with ID ${userId} not found. Please enter a valid ID.`);
                setShowUpdateForm(false);
            } else {
                setUserData({
                    ...userData,
                    name: response.data.name,
                    email: response.data.email,
                    age: response.data.age,
                    phno: response.data.phno
                });
                setShowUpdateForm(true);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            setErrorMessage('Failed to fetch user details due to incorrect ID number. Please enter a valid ID.');
            setShowUpdateForm(false);
        }
    };


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/updateuser/${userData.idno}`, userData)
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.log('Update error:', error);
                alert('Failed to update user.');
            });
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="form-container bg-white rounded p-3">
                <h2>Update User</h2>
                <form onSubmit={handleFetchUserDetails}>
                    <div className="mb-3">
                        <label htmlFor="idno" className="form-label">Enter User ID</label>
                        <input type="text" name="idno" className="form-control" value={userData.idno} onChange={handleChange} placeholder="Enter ID no" />
                        <button type="submit" className="btn btn-primary mt-2">Fetch User Details</button>
                    </div>
                </form>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {showUpdateForm && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="idno" className="form-label">Emp ID</label>
                            <input type="text" name="idno" className="form-control" value={userData.idno} onChange={handleChange} placeholder="Enter ID no" readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" value={userData.name} onChange={handleChange} placeholder="Enter Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={userData.email} onChange={handleChange} placeholder="Enter Email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" name="age" className="form-control" value={userData.age} onChange={handleChange} placeholder="Enter Age" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phno" className="form-label">Phoneno</label>
                            <input type="number" name="phno" className="form-control" value={userData.phno} onChange={handleChange} placeholder="Enter Contact no" />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default UpdateUser;
