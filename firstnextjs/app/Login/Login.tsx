'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box, InputAdornment } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useRouter } from 'next/navigation'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/chatLogin', {
                email,
                password,
            });
            console.log('Login successful:', response?.data?.userData);
            localStorage.setItem('userData', JSON.stringify(response?.data?.userData))

            router.push('/Chat', { scroll: true })
            // Handle successful login, e.g., redirect to another page
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error, e.g., show error message to the user
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                className="bg-white p-8 shadow-md rounded"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h5" className="mb-4 font-bold">
                    Login
                </Typography>
                <Box
                    component="form"
                    sx={{
                        mt: 1,
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className="mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        className="mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="mt-3"
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
