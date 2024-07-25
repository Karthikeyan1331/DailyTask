import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ContactInfo = ({ onSelectContact }) => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('ChatToken');
    const currentUser = JSON.parse(localStorage.getItem("UserData"))
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Token:', token); // Debugging: Check token value
                const response = await axios.post(
                    'http://localhost:8000/UserData',
                    {},
                    {
                        headers: {
                            'auth-token': token,
                        },
                    }
                );
                console.log(response.data)
                setContacts(response.data.filter(contact => contact.username !== currentUser.username));
                console.log('Contacts:', contacts); // Debugging: Check fetched data
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.response ? error.response.data : 'An error occurred');
            }
        };

        if (token) {
            fetchUserData();
        } else {
            setError('No authentication token found.');
        }
    }, [token]);

    return (
        <div style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-unstyled mb-0">
                {contacts.map((contact, index) => (
                    <li key={index} className="p-2 border-bottom" onClick={() => onSelectContact(contact)}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row">
                                <div>
                                    <img
                                        src={`http://localhost:8000/${contact?.profile ?  contact.profile : "profile.jpg"}`}
                                        alt="avatar"
                                        className="d-flex align-self-center me-2 object-fit-cover border rounded-circle"
                                        width="60"
                                        height="60"

                                    />
                                </div>
                                <div className="pt-1 text-start cursor-pointer">
                                    <p className="fw-bold mb-0 ">{contact.username}</p>
                                    <p className="small text-muted">{contact.lastMessage || "No messages yet"}</p>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="small text-muted mb-1">{contact.lastMessageTime || ""}</p>
                                {contact.unreadCount > 0 && (
                                    <span className="badge bg-success rounded-pill float-end">{contact.unreadCount}</span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactInfo;
