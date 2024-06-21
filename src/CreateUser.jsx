import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./u.css";


function CreateUser() {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [age, setage] = useState()
    const [idno, setid] = useState()
    const [phno, setphno] = useState()


    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createuser", { idno, name, email, age ,phno })
            .then(r => {
                console.log(r)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 width-80% bg-primary justify-content-center align-items-center">
            <div className="form-container bg-white rounded p-2">
                <h2>Add User</h2>
                <form onSubmit={Submit}>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Emp Id</label>
                        <input type="number" placeholder="Enter ID no" className="form-control" onChange={(e) => setid(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" placeholder="Enter Age" className="form-control" onChange={(e) => setage(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Phoneno</label>
                        <input type="number" placeholder="Enter contact no" className="form-control" onChange={(e) => setphno(e.target.value)} />
                    </div>

                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;