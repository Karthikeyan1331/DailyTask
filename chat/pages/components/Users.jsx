import React from 'react';

const ChatList = ({ users, privateChatUser, handleStartPrivateChat, name, checkHeIsInOnline, GlobalChat }) => {
    return (
        <ul className="overflow-scroll h-[28rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {users.map((user) => (
                <a
                    className={`flex items-center px-3 py-2 
                        text-sm transition duration-150 ease-in-out 
                        cursor-pointer border-b focus:outline-none
                    ${privateChatUser?.name !== user.email ? "border-gray-300  hover:bg-gray-100" : "bg-gray-100  border-gray-300"} `}
                    key={user._id} onClick={() => handleStartPrivateChat(user)}>
                    <img className="object-cover w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
                    <div className="w-full pb-2">
                        <div className="flex justify-between">
                            <span className="block ml-2 font-semibold text-gray-600">{user.email} {user.email === name ? "(Yourself)" : ""}</span>
                            <span className="block ml-2 text-sm text-gray-600"></span>
                            {checkHeIsInOnline(user.email) && <span className="block w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>}
                        </div>
                        <span className="block ml-2 text-sm text-gray-600"></span>
                    </div>
                    <li></li>
                </a>
            ))}
            <a className="flex items-center px-3 py-2 text-sm transition 
                duration-150 ease-in-out cursor-pointer border-b focus:outline-none 
                bg-gray-100  border-gray-300" onClick={GlobalChat}>
                <img className="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png" alt="Global" />
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">Global</span>
                        <span className="block ml-2 text-sm text-gray-600"></span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600"></span>
                </div>
            </a>
        </ul>
    );
};

export default ChatList;
