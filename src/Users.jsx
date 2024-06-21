import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./a.css";


function Users() {
    const [users, setUsers] = useState([]);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedUserId, setHighlightedUserId] = useState("");
    const [highlightedUsername, setHighlightedUsername] = useState("");
    const [highlightedUseremail, setHighlightedUseremail] = useState("");
    const [highlightedUserage, setHighlightedUserage] = useState("");
    const [highlightedUserphno, setHighlightedUserphno] = useState("");

    const tableRef = useRef(null);


    useEffect(() => {
        axios.get("http://localhost:3001")
            .then(r => setUsers(r.data))
            .catch(err => console.log(err));
    }, []);

    const handleDeleteClick = () => {
        setShowDeleteForm(true);
    };

    const handleDelete = () => {
        if (deleteId && !isNaN(deleteId)) {
            axios.delete(`http://localhost:3001/deleteuser/${deleteId}`)
                .then(res => {
                    console.log(res.data);
                    alert(res.data);
                    setDeleteId("");
                    setShowDeleteForm(false);
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    alert("Failed to delete user");
                });
        } else {
            alert("Invalid ID format");
        }
    };

    const scrollToEntry = (id) => {
        const entry = document.getElementById(id);
        if (entry) {
            entry.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
    };

    const handleSearch = () => {
        const allRows = document.querySelectorAll('.highlighted-row');
        allRows.forEach(row => {
            row.classList.remove('highlighted-row');
        });

        const query = searchQuery.toLowerCase();
        if (query.length === 0) {
            alert('Please enter a search query');
            return;
        }

        const usersToHighlight = users.filter(user =>
            (user.idno && user.idno.toString().toLowerCase()===query) ||
            (user.name && user.name.toLowerCase()===query) ||
            (user.email && user.email.toLowerCase()===query) ||
            (user.age && user.age.toString().toLowerCase()===query)
        );
        if (usersToHighlight.length === 0) {
            alert('No matching employee is found');
            return;
        }

        console.log("Search query:", query);
        console.log("Users to highlight:", usersToHighlight);

        const firstUserToHighlight = usersToHighlight[0];
        setHighlightedUserId(firstUserToHighlight.idno);
        setHighlightedUsername(firstUserToHighlight.name);
        setHighlightedUseremail(firstUserToHighlight.email);
        setHighlightedUserage(firstUserToHighlight.age);
        setHighlightedUserphno(firstUserToHighlight.phno);

        usersToHighlight.forEach(user => {
            const row = document.getElementById(`user-row-${user.idno}`);
            console.log("User ID:", user.idno);
            console.log("Row:", row);
            if (row) {
                row.classList.add('highlighted-row');
                // row.style.backgroundColor = 'yellow';
                scrollToEntry(`user-row-${user.idno}`);
            } else {
                console.log(`Row with ID ${user.idno} not found`);
            }
        });

    };

    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex justify-content-center align-items-center ">
                <h2>Welcome to Tech solutions!!</h2>
            </div>
            <div className="d-flex justify-content-center align-items-center ">
                <h5>Employee list 2024-25</h5>
            </div>
            <div className="form-container bg-white rounded p-3">
                <div className="mb-3" style={{ position: 'relative' }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by ID, Name, or Email "
                        className="form-control"
                        style={{ paddingRight: '40px' }}
                    />
                    <button className="btn btn- ml-2" style={{ position: 'absolute', top: 0, right: 0, height: '100%' }} onClick={handleSearch}><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg></button>
                </div>
                <div className="button-container">
                <div className="mb-3">
                    <Link to="/create" className="btn btn-success" style={{ marginRight: '20px' }}>Add +</Link>
                    <button className="btn btn-danger mr-4" style={{ marginRight: '20px' }} onClick={handleDeleteClick}>Delete</button>
                    <Link to="/update" className="btn btn-warning mr-4" style={{ marginRight: '20px' }}>Update</Link>
                </div>
                {showDeleteForm && (
                    <div>
                        <input
                            type="text"
                            value={deleteId}
                            onChange={(e) => setDeleteId(e.target.value)}
                            placeholder="Enter Employee ID"
                            className="form-control mr-2"
                        />
                        <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={handleDelete}>Submit</button>
                    </div>
                )}
                </div>
                <div style={{ marginRight: '200px' }}>
                    <table className="table" ref={tableRef}>
                        <thead>
                            <tr>
                                <th style={{ width: "50%", paddingRight: '250px' }}>Emp_id</th>
                                <th style={{ width: "50%", paddingRight: '250px' }}>Name</th>
                                <th style={{ width: "50%", paddingRight: '250px' }}>Email</th>
                                <th style={{ width: "50%", paddingRight: '250px' }}>Age</th>
                                <th style={{ width: "50%", paddingRight: '200px' }}>Phone_no</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.idno}
                                    id={`user-row-${user.idno}`}
                                // className={highlightedUserId === user.idno ? 'highlighted-row' : ''}
                                // onMouseEnter={() => setHighlightedUserId(user.idno)}
                                // onMouseLeave={() => setHighlightedUserId(null)}
                                // style={highlightedUserId === user.idno ? { backgroundColor: 'yellow', transition: 'transform 0.2s ease', transform: 'scale(1.03)' } : null}
                                >
                                    <td style={highlightedUserId === user.idno ? { backgroundColor: 'yellow' } : null}>{user.idno ? user.idno.toString().padStart(3, '0') : ''}</td>
                                    <td style={highlightedUsername === user.name ? { backgroundColor: 'yellow' } : null}>{user.name}</td>
                                    <td style={highlightedUseremail === user.email ? { backgroundColor: 'yellow' } : null}>{user.email}</td>
                                    <td style={highlightedUserId === user.idno ? { backgroundColor: 'yellow' } : null}>{user.age}</td>
                                    <td style={highlightedUserphno === user.phno ? { backgroundColor: 'yellow' } : null}>{user.phno}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );

}

export default Users;

