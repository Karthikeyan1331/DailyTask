import React, { useState, useEffect, useMemo } from 'react';
import HoverCard from './Card';

const TodoList = () => {
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      header: 'Header',
      title: 'Title',
      text: 'Write some Content',
    };
    console.log(cards)
    setCards([newCard, ...cards]);
  };
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('todoCards')) || [];
    setCards(storedCards);
  }, []);
  useEffect(() => {
    localStorage.setItem('todoCards', JSON.stringify(cards));
  }, [cards]);
  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  };
  const handleUpdateCard = (updatedCard) => {
    const updatedCards = cards.map(card => (card.id === updatedCard.id ? updatedCard : card));
    setCards(updatedCards);
  };

  return (
    <div>
      <div className='bg-orange-500 w-full p-3 relative'>
        <div className='right-0 left-0 justify-center flex font-bold text-xl text-white'>To Do List</div>
      </div>
      <div className='bg-gray-800 min-h-[90vh]'>
        <div 
          className='bg-blue-500 mb-3 text-white w-fit font-bold cursor-pointer hover:bg-blue-600 transition-all rounded-md text-[20px] px-[10px] py-[1px] text-center float-right translate-x-[-1vw] translate-y-[.8vw]' 
          onClick={handleAddCard}
        >
          Add +
        </div>
        <div className='flex flex-wrap w-full'>
          {cards.map(card => (
            <HoverCard key={card.id} data={card}
            onUpdate={handleUpdateCard} onDelete={() => handleDeleteCard(card.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
