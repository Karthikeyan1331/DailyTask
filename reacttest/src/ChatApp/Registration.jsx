import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, InputAdornment, IconButton, Stack } from '@mui/material';
import { AccountCircle, EmailRounded, HttpsRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UploadImagePreview from './UploadImagePreview';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
const RegistrationForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null, // Add image state to formData
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (image) => {
        console.log(image)
        setFormData({ ...formData, image }); // Update image state
    };
    // Function to convert Data URI to Blob



    const validate = () => {
        let tempErrors = {};
        if (!formData.username) tempErrors.username = 'Username is required';
        if (!formData.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is not valid';
        }
        if (!formData.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let tempErrors = {};
        if (validate()) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append('username', formData.username);
                formDataToSend.append('email', formData.email);
                formDataToSend.append('password', formData.password);
                formDataToSend.append('image', formData.image); // Append file to FormData

                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                };

                const response = await axios.post('http://localhost:8000/Registration', formDataToSend, config);
                setErrors(tempErrors)
                console.log(response.status)
                if (response.status === 200) {
                    console.log('Registration successful:', response);
                    navigate("/ChatWindow")
                }
                else if (response.status === 201) {
                    tempErrors.username = response?.data?.message || "Username Already existed";

                }
                else if (response.status === 202) {
                    tempErrors.email = response?.data?.message || "Email Already existed";

                }
                else {
                    console.log('Registration failed:', response?.data);
                    // Handle error scenario
                }
                setErrors(tempErrors)
            } catch (error) {
                console.error('Registration failed:', error.response.data);
                // Handle network errors or other exceptions
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    function reCapTcha(value) {
        console.log("Captcha value:", value);
      }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="new-username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="new-email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailRounded />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HttpsRounded />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <UploadImagePreview onChange={handleImageChange} />
                    <ReCAPTCHA
                        sitekey="6LfRsxUqAAAAAJNEuD4bfyEaAXXe5VZsu4yuN1ya"
                        onChange={reCapTcha}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            component="button"
                            variant="body2"
                            underline="hover"
                            onClick={() => navigate('/ChatLogin')}
                        >
                            Login
                        </Link>

                    </Box>

                </Box>
            </Box>
        </Container>
    );
};

export default RegistrationForm;
