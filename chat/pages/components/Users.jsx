import React, { useState, useEffect } from 'react';
import { countMessageNotSeen } from './fetchUsers';

const ChatList = ({ users, privateChatUser, handleStartPrivateChat, name, checkHeIsInOnline, GlobalChat, countNotifications, setCountNotifications }) => {
    return (
        <ul className="overflow-scroll h-[28rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {users.map((user, index) => (
                <li
                    key={user._id}
                    className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer border-b focus:outline-none ${privateChatUser?.name !== user.email ? "border-gray-300 hover:bg-gray-100" : "bg-gray-100 border-gray-300"
                        }`}
                    onClick={() => handleStartPrivateChat(user)}
                >
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                        alt="username"
                    />
                    <div className="w-full pb-2">
                        <div className="flex justify-between">
                            <span className="block ml-2 font-semibold text-gray-600">
                                {user.email} {user.email === name ? "(Yourself)" : ""}
                            </span>
                            {checkHeIsInOnline(user.email) && (
                                <span className="block w-3 h-3 bg-green-600 rounded-full"></span>
                            )}

                        </div>
                        {countNotifications[user.email] && <div className='text-gray-50 font-bold float-end bg-red-600 w-5 h-5 text-center rounded-full'>
                            {countNotifications[user.email]}
                        </div>}

                    </div>
                </li>
            ))}
            <li
                className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer border-b focus:outline-none bg-gray-100 border-gray-300"
                onClick={GlobalChat}
            >
                <img
                    className="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                    alt="Global"
                />
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">Global</span>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default ChatList;
