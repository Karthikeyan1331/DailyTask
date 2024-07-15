// src/ChatInterface.js
import React, { useState } from 'react';
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <Container component={Paper} sx={{ marginTop: 4, padding: 2 }} maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Chat Application
      </Typography>
      <List sx={{ maxHeight: '50vh', overflow: 'auto', marginBottom: 2 }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.text} secondary={message.sender} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: 2 }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatInterface;
