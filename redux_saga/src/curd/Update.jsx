import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Person, Info } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_DOCTOR_FETCH, EDIT_DOCTOR } from '../actions'; // Ensure these actions are defined in your actions file

const Update = () => {
    const { id } = useParams(); // Get the doctor ID from the URL
    console.log(id)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let doctor = useSelector((state) => state.myReducer);
    console.log(doctor)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [specialityError, setSpecialityError] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(GET_DOCTOR_FETCH())
    }, [id])

    useEffect(() => {
        if (doctor && doctor.doctors) {
            let w = doctor.doctors.filter((cur) => cur._id == id)
            if (w[0]) {
                console.log(w, "hello")
                setFirstName(w[0].firstname);
                setLastName(w[0].lastname);
                setSpeciality(w[0].speciality);
            }
        }
    }, [doctor]);

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
            dispatch(EDIT_DOCTOR({ id, firstName, lastName, speciality }));

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
                    Doctor updated successfully!
                </Alert>
            </Snackbar>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <h1>Update Doctor</h1>
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

export default Update;
