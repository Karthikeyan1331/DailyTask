import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, InputAdornment, IconButton } from '@mui/material';
import { AccountCircle, EmailRounded, HttpsRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) {
            tempErrors.email = 'Email is required';
        }
        if (!formData.password) tempErrors.password = 'Password is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tempErrors = {};
        if (validate()) {
            const response = await axios.post('http://localhost:8000/Login', formData)

            console.log(response.status)
            try {
                setErrors(tempErrors)
                if (response.status === 200) {
                    console.log('Registration successful:', response.data);
                    // Optionally redirect to login page
                }
                else if (response.status === 201) {
                    tempErrors.email = response?.data?.message || "Username is incorrect";

                }
                else if (response.status === 202) {
                    tempErrors.password = response?.data?.message || "Password is incorrect";

                }
                else {
                    console.log('Login failed:', response.data);
                }
                setErrors(tempErrors)
            }
            catch (error) {
                console.error('Login failed:', error.response.data);
            }
        }
    };

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
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        autoFocus
                        type='text'
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
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
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
                            onClick={() => navigate('/ChatRegistration')}
                        >
                            Registration
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Login
