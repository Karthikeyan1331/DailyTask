import React, { useState } from 'react';
import { TextField, Button, Container, Box, InputAdornment, Snackbar, Alert } from '@mui/material';
import { AccountCircle, Email, Person, Info } from '@mui/icons-material';
import { CREATE_DOCTOR } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [specialityError, setSpecialityError] = useState(false);
    const [open, setOpen] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setFirstNameError(false);
        setLastNameError(false);
        setSpecialityError(false);

        // Validate fields
        let valid = true;
        if (!firstName) {
            setFirstNameError(true);
            valid = false;
        }
        if (!lastName) {
            setLastNameError(true);
            valid = false;
        }
        if (!speciality) {
            setSpecialityError(true);
            valid = false;
        }

        // If valid, handle form submission
        if (valid) {
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Speciality:', speciality);
            dispatch(CREATE_DOCTOR({ firstName, lastName, speciality }));

            // Reset form
            setFirstName('');
            setLastName('');
            setSpeciality('');

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
                <h1>Add Doctor</h1>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                    error={firstNameError}
                    helperText={firstNameError ? 'First Name is required' : ''}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                    error={lastNameError}
                    helperText={lastNameError ? 'Last Name is required' : ''}
                />
                <TextField
                    label="Speciality"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Info />
                            </InputAdornment>
                        ),
                    }}
                    error={specialityError}
                    helperText={specialityError ? 'Speciality is required' : ''}
                />
                <div className='d-flex mt-2'>
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate("/")}>
                        Home
                    </Button>
                </div>
            </Box>
        </Container>
    );
};

export default Create;
