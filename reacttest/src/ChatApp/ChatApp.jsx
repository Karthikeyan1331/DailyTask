import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useNavigate } from 'react-router-dom';
import ContactInfo from './ChatComponent/ContactInfo';
import SearchProfile from './ChatComponent/SearchProfile';
import './Chat.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Profile from './ChatComponent/Profile';

const SERVER_URL = 'http://localhost:8000';

const ChatComponent = () => {
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState(1);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState(); // List of contacts
  const [activeContact, setActiveContact] = useState(null); // Active contact
  const pickerRef = useRef(null);
  const inputRef = useRef(null);
  const socket = io.connect(SERVER_URL)
  useEffect(() => {
    if ('UserData' in localStorage)
      setContacts(JSON.parse(localStorage.getItem('UserData')))
  }, [])


  useEffect(() => {
    if (!localStorage.getItem('ChatToken')) {
      navigate('/ChatLogin');
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleInputChange = (e) => {
    const textAreaLineHeight = 25;
    const previousRows = e.target.rows;
    e.target.rows = 1;
    const currentRows = Math.min(3, Math.floor(e.target.scrollHeight / textAreaLineHeight));

    if (currentRows !== previousRows) {
      e.target.rows = currentRows;
    }

    setRows(currentRows);
    setInputValue(e.target.value);
  };

  const handleInputClick = (e) => {
    setCursorPosition(e.target.selectionStart);
  };

  const handleEmojiClick = (emoji) => {
    const value = inputValue;
    const start = value.substring(0, cursorPosition);
    const end = value.substring(cursorPosition);
    const newValue = start + emoji.native + end;

    setInputValue(newValue);
    setCursorPosition(cursorPosition + emoji.native.length);

    inputRef.current.focus();
    setTimeout(() => {
      inputRef.current.setSelectionRange(cursorPosition + emoji.native.length, cursorPosition + emoji.native.length);
    }, 0);
  };

  const sendMessage = () => {
    console.log("try to emit")
    socket.emit("send_message", { message: "hello" })
    // if (inputValue.trim() && activeContact) {
    //   console.log("try to emit1")
    //   const message = {
    //     text: inputValue,
    //     sender: contacts.username,
    //     receiver: activeContact.username,
    //     timestamp: new Date().toLocaleTimeString(),
    //   };
    //   console.log(message)
    //   socket.emit("message",message)
    //   setMessages((prevMessages) => [...prevMessages, message]);
    //   setInputValue('');
    // }
  };
  useEffect(() => {
    socket.on("recieve message", (data) => {
      alert(data)
    })
  }, [socket])
  const handleContactSelect = (contact) => {
    console.log(contact)
    setActiveContact(contact);
    // Fetch messages for the selected contact
    // You might need to implement an API call here to fetch messages from your server
    // setMessages(fetchedMessages);
  };

  const formatTimestamp = (timestamp) => {
    const [time, period] = timestamp.split(' ');
    const [hours, minutes, seconds] = time.split(':').map(Number);

    let adjustedHours = hours;
    if (period === 'pm' && hours !== 12) {
      adjustedHours += 12;
    } else if (period === 'am' && hours === 12) {
      adjustedHours = 0;
    }

    const date = new Date();
    date.setHours(adjustedHours, minutes, seconds);

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const timeFormatted = date.toLocaleString('en-GB', timeOptions);

    const dateOptions = { month: 'short', day: '2-digit' };
    const dateFormatted = date.toLocaleString('en-US', dateOptions);

    return `${timeFormatted}|${dateFormatted}`;
  };

  return (
    <section style={{ backgroundColor: '#CDC4F9' }}>
      <div className="container py-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <Profile />
                    <div className="p-3">
                      <SearchProfile />
                      <ContactInfo onSelectContact={handleContactSelect} />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-7 col-xl-8">
                    <Navbar expand="lg" className="bg-body-tertiary">
                      <Container className="d-flex align-items-center">
                        <Navbar.Brand className="d-flex align-items-center">
                          <img
                            src={`http://localhost:8000/${activeContact?.profile || "profile.jpg"}`}
                            width="40"
                            height="40"
                            className="rounded-circle me-2 object-fit-cover border rounded-circle"
                            alt="Profile"
                          />
                          <span>{activeContact ? activeContact.username : 'Select a contact'}</span>
                        </Navbar.Brand>
                      </Container>
                    </Navbar>
                    <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                      <div className="d-flex flex-column">
                        {messages
                          .filter((msg) => msg.receiver === (activeContact?.username || msg.sender === activeContact?.username))
                          .map((msg, index) => (
                            <div
                              key={index}
                              className={`d-flex flex-row mb-3 ${msg.sender === contacts?.username ? 'justify-content-end' : 'justify-content-start'}`}
                            >
                              <div>
                                <p
                                  className={`small p-2 ${msg.sender === contacts?.username ? 'me-1 mb-0 text-white bg-primary' : 'ms-3 bg-body-secondary'} rounded-3 text-start`}
                                >
                                  {msg.text}
                                </p>
                                <p
                                  className="small rounded-3 text-muted me-1 float-end"
                                  style={{ fontSize: '0.75rem' }}
                                >
                                  {formatTimestamp(msg.timestamp)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="d-flex align-items-center pe-3 pt-3 mt-2">
                      <img
                        src={`http://localhost:8000/${contacts?.profile ? contacts.profile : "profile.jpg"}`}
                        alt="avatar"
                        className='rounded-circle object-fit-cover me-1'
                        width='50'
                        height='40'
                      />
                      <textarea
                        className="form-control form-control-md"
                        id="exampleFormControlInput2"
                        placeholder="Type message"
                        style={{ marginRight: '5px', resize: 'none' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={handleInputClick}
                        onSelect={handleInputClick}
                        ref={inputRef}
                        rows={rows}
                      />
                      <a className="ms-1 text-muted" href="#!">
                        <i className="fas fa-paperclip"></i>
                      </a>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <a className="ms-1 text-muted" href="#!" onClick={() => setShowPicker((val) => !val)}>
                          <i className="fas fa-smile"></i>
                        </a>
                        {showPicker && (
                          <div style={{ position: 'absolute', bottom: '40px', right: '0px', zIndex: 1 }} ref={pickerRef}>
                            <Picker data={data} onEmojiSelect={handleEmojiClick} />
                          </div>
                        )}
                      </div>
                      <button type="button" className="btn btn-primary btn-md" style={{ paddingTop: '.55rem' }} onClick={sendMessage}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatComponent;
