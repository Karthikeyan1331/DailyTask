import React,{useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap';
import { TextField, Button, Container, Box, InputAdornment, Snackbar, Alert } from '@mui/material';
import { AccountCircle, Email, Person, Info } from '@mui/icons-material';
import { CREATE_DOCTOR } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ModalOverlayCreate = ({ show, handleClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [specialityError, setSpecialityError] = useState(false);
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
            handleClose()
        }
    };


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalOverlayCreate
