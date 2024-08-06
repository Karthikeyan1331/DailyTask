import React, { useState, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Attachment, SentimentSatisfiedAlt, SendRounded, Clear } from '@mui/icons-material';
import { handleSendMessageToBackend } from './fetchUsers';

const ChatInputBox = ({ message, setMessage, handleSendMessage, senderName, receiverName }) => {
  const [rows, setRows] = useState(1);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const pickerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleInputClick = (e) => {
    setCursorPosition(e.target.selectionStart);
  };

  const handleInputChange = (e) => {
    const textAreaLineHeight = 25;
    e.target.rows = 1; // Reset to a single row to measure the scroll height accurately.
    const currentRows = Math.min(3, Math.ceil(e.target.scrollHeight / textAreaLineHeight));
    setRows(currentRows);
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    const value = message;
    const start = value.substring(0, cursorPosition);
    const end = value.substring(cursorPosition);
    const newValue = start + emoji.native + end;

    setMessage(newValue);
    setCursorPosition(cursorPosition + emoji.native.length);

    inputRef.current.focus();
    setTimeout(() => {
      inputRef.current.setSelectionRange(cursorPosition + emoji.native.length, cursorPosition + emoji.native.length);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    fileInputRef.current.value = null;
  };
  const checkFileIsUploaded = async () => {
    if (senderName && receiverName && uploadedFile) {
      const formData = new FormData();
      formData.append('message', message);
      formData.append('image', uploadedFile);
      const fileName = await handleSendMessageToBackend(formData);
      if (fileName) {
        handleSendMessage(fileName)
        setUploadedFile(null);
        setRows(1);
      }
    }
    else {
      handleSendMessage()
    }
  }
  return (
    <div className="flex flex-col items-center justify-between w-full p-3 border-t border-gray-300">
      {uploadedFile && (
        <div className="flex items-center w-full p-2 mb-2 bg-gray-100 rounded">
          <span className="flex-grow text-gray-700">{uploadedFile.name}</span>
          <button onClick={handleClearFile} className="text-gray-500 hover:text-red-500">
            <Clear />
          </button>
        </div>
      )}
      <div className="flex items-center w-full pr-3 pt-3 mt-2">
        <textarea
          className="form-control rounded-full flex-grow"
          id="exampleFormControlInput2"
          placeholder="Type message"
          style={{ marginRight: '5px', resize: 'none' }}
          value={message}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onSelect={handleInputClick}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          rows={rows}
        />
        <a className="ml-1 text-gray-500 mr-2" href="#!" onClick={handleAttachmentClick}>
          <Attachment />
        </a>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div className="relative inline-block">
          <a className="ml-1 text-gray-500" href="#!" onClick={() => setShowPicker((val) => !val)}>
            <SentimentSatisfiedAlt />
          </a>
          {showPicker && (
            <div className="absolute bottom-[40px] right-0 z-10" ref={pickerRef}>
              <Picker data={data} onEmojiSelect={handleEmojiClick} />
            </div>
          )}
        </div>
        <button
          type="button"
          className="text-white text-sm p-2 rounded-full bg-blue-500 hover:bg-blue-600"
          onClick={checkFileIsUploaded}
        >
          <SendRounded className="text-md" />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox;
