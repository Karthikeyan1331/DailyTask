import React from 'react';
import ChatInterface from './ChatApp';
import { CssBaseline } from '@mui/material';

const Home = () => {
    return (
        <div className="App">
          <CssBaseline />
          <ChatInterface />
        </div>
      );
}

export default Home
