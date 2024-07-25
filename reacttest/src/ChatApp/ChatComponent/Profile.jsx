import React from 'react'
import { Container } from 'react-bootstrap';

const Profile = () => {
    const contacts = JSON.parse(localStorage.getItem("UserData"))
    const handleLogIn = () => {
        if ("ChatToken" in localStorage){    
            localStorage.removeItem("ChatToken")
            localStorage.removeItem("UserData")
            window.location.href="./ChatLogin"
        }
    }
    return (
        <Container className="d-flex align-items-center mt-3 ms-3">
            <img
                src={`http://localhost:8000/${contacts?.profile ?  contacts.profile : "profile.jpg"}`}
                alt="avatar"
                className="me-1 rounded-circle object-fit-cover"
                width="40"
                height="40"
            />
            <button className='btn btn-danger btn-sm ms-auto me-3' onClick={handleLogIn}>Log Out</button>
        </Container>
    )
}

export default Profile
