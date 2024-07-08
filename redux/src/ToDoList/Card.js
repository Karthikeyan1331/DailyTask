import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './card.css'
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure you have bootstrap icons installed

const HoverCard = ({ onDelete, data, onUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [edit, setEdit] = useState(false);
  const [header, setHeader] = useState(data.header);
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.text);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleHeaderChange = (e) => setHeader(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);

  const handleDelete = () => {
    onDelete(); // Call the parent onDelete function to remove the card
  };
  const handleUpdateCard = () => {
    const updatedCard = {
      ...data,
      header,
      title,
      text,
    };
    onUpdate(updatedCard); // Update card data in parent component (TodoList)
    setEdit(false); // Exit edit mode
  };
  return (
    <Card
      border="primary"
      className='w-[30vw] mx-2 my-3 cursor-pointer relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='w-full'>
        {edit ? (
          <input
            type="text"
            className="form-control mb-2"
            value={header}
            onChange={handleHeaderChange}
          />
        ) : (
          <Card.Header className=''>{header}</Card.Header>
        )}
      </div>
      <div className={`absolute text-[10px] mt-[13px] ml-[25vw] Tools ${isHovered ? 'block' : 'hidden'}`}>
        <span className='text-blue-50 bg-green-600 mr-1 p-2 rounded-lg' onClick={() => { setEdit(true); }}>
          <i className="bi bi-pencil-fill"></i>
        </span>
        <span className='text-blue-50 bg-red-600 p-2 rounded-lg' onClick={handleDelete}>
          <i className="bi bi-trash3-fill"></i>
        </span>
      </div>
      <Card.Body>
        {edit ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              className="form-control mb-2"
              rows="3"
              value={text}
              onChange={handleTextChange}
            />
          </>
        ) : (
          <>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
          </>
        )}
        <button className={`btn btn-primary ${edit ? 'block' : 'submit'}`} onClick={handleUpdateCard}>
          Submit
        </button>
      </Card.Body>
    </Card>
  );
}

export default HoverCard;
