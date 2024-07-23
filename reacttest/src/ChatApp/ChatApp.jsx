import React, { useState, useEffect, useRef } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ChatComponent = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const pickerRef = useRef();
  const inputRef = useRef();
  const handleClickOutside = (event) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target) &&
      !inputRef.current.contains(event.target)
    ) {
      setShowPicker(false);
    }
  };
  const handleEmojiClick = (emoji) => {
    const value = inputValue;
    const start = value.substring(0, cursorPosition);
    const end = value.substring(cursorPosition);
    const newValue = start + emoji.native + end;
    setInputValue(newValue);
    setCursorPosition(cursorPosition + emoji.native.length);


    // Move cursor to the new position
    inputRef.current.focus();
    setTimeout(() => {
      inputRef.current.setSelectionRange(cursorPosition + emoji.native.length, cursorPosition + emoji.native.length);
    }, 0);
  };

  useEffect(() => {
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
    setInputValue(e.target.value);
  };

  const handleInputClick = (e) => {
    setCursorPosition(e.target.selectionStart);
  };
  return (
    <section style={{ backgroundColor: '#CDC4F9' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div className="p-3">
                      <div className="input-group rounded mb-3">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span className="input-group-text border-0" id="search-addon">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <div style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                        <ul className="list-unstyled mb-0">
                          <li className="p-2 border-bottom">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span className="badge bg-success badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">Marie Horwitz</p>
                                  <p className="small text-muted">Hello, Are you there?</p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">Just now</p>
                                <span className="badge bg-success rounded-pill float-end">3</span>
                              </div>
                            </div>
                          </li>
                          {/* Repeat similar structure for other chat items */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-7 col-xl-8">
                    <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                      <div className="d-flex flex-row justify-content-start">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar 1"
                          style={{ width: '45px', height: '100%' }}
                        />
                        <div>
                          <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua.
                          </p>
                          <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-end">
                        <div>
                          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                          </p>
                          <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar 1"
                          style={{ width: '45px', height: '100%' }}
                        />
                      </div>
                      {/* Repeat similar structure for other messages */}
                    </div>
                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 3"
                        style={{ width: '40px', height: '100%', marginRight: "5px" }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-md"
                        id="exampleFormControlInput2"
                        placeholder="Type message"
                        style={{ marginRight: '5px' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={handleInputClick}
                        onSelect={handleInputClick}
                        ref={inputRef}
                      />
                      <a className="ms-1 text-muted" href="#!">
                        <i className="fas fa-paperclip"></i>
                      </a>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <a className="ms-3 text-muted" href="#!" onClick={() => setShowPicker(!showPicker)}>
                          <i className="fas fa-smile"></i>
                        </a>
                        {showPicker && (
                          <div ref={pickerRef} style={{ position: 'absolute', top: '0%', transform: 'translate(-18vw, -70vh)', left: '0', right: '0', zIndex: 1 }}>
                            <Picker data={data} onEmojiSelect={handleEmojiClick} />
                          </div>
                        )}
                      </div>
                      <a className="ms-3" href="#!">
                        <i className="fas fa-paper-plane"></i>
                      </a>
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
