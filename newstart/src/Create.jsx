import React, { useState } from 'react';
import { TextField, Button, Container, Box, InputAdornment, Snackbar, Alert } from '@mui/material';
import { AccountCircle, Email } from '@mui/icons-material';
import { addUser } from './UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [open, setOpen] = useState(false);
    const usersD = useSelector((state) => state.users?.userList).at(-1)?.id;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setNameError(false);
        setEmailError(false);

        // Validate fields
        let valid = true;
        if (!name) {
            setNameError(true);
            valid = false;
        }
        if (!email) {
            setEmailError(true);
            valid = false;
        }

        // If valid, handle form submission
        if (valid) {
            console.log('Name:', name);
            console.log('Email:', email);
            dispatch(addUser({ id: usersD + 1, name, email }));

            // Reset form
            setName('');
            setEmail('');

            // Show success message
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    User added successfully!
                </Alert>
            </Snackbar>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <h1>Add User</h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    error={nameError}
                    helperText={nameError ? 'Name is required' : ''}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                    error={emailError}
                    helperText={emailError ? 'Email is required' : ''}
                />
                <div className='d-flex mt-2'>
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={()=>navigate("/")}>
                        Home
                    </Button>
                </div>

            </Box>


        </Container>
    );
};

export default Create;
