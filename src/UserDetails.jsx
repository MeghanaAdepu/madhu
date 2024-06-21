import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user-details/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <h2>User Details</h2>
            {user ? (
                <div>
                    <p>ID: {user.idno}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserDetails;