import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io.connect("http://localhost:8000")
function App() {
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [preMessage, setPreMessage] = useState([])
  useEffect(() => {
    const handleMessageReceive = (data) => {
      console.log(data);
      setPreMessage((pre) => [...pre, data]);
    };

    socket.on('message_receive', handleMessageReceive);

    return () => {
      socket.off('message_receive', handleMessageReceive);
    };
  }, [socket]);
  const send_message = () => {
    socket.emit("send_message", { message, room })
    setMessage('')
  }
  const join_room = () => {
    if (room !== '') {
      socket.emit("join_room", room)
    }
  }
  return (
    <div className="App">
      <input type='text' name='join' id='join'
        placeholder='Enter key to join' value={room}
        onChange={(e) => setRoom(e.target.value)} />
      <button onClick={join_room}>Join</button><br /><br />
      <input type='text' name='message' id='message' placeholder='Message...'
        value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={send_message}>Send</button>
      <ul>
        {preMessage && preMessage.map((cur, index) => (
          <li key={index}>{cur.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
