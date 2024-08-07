'use client'
import Link from 'next/link';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import io from 'socket.io-client';
import {
    fetchUsers, fetchMessages, formatTimestamp, fetchLastSeen,
    userSeenMessage, powerNotified, handleDownload, countMessageNotSeen
} from './fetchUsers';
import ChatList from './Users';
import { DoneAllRounded, CheckRounded, CloudDownloadRounded } from '@mui/icons-material';
import ChatInputBox from './ChatBox';
const Chat = () => {
    const API_URL = "http://localhost:8000"
    const curUser = useRef();
    const curSender = useRef();
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [privateChatUser, setPrivateChatUser] = useState(null);
    const [onlineMembers, setOnlineMembers] = useState([]);
    const [lastSeen, setLastSeen] = useState();
    const [onlineSeen, setOnlineSeen] = useState(false)
    const [countNotifications, setCountNotifications] = useState({});
    useEffect(() => {
        const getMessages = async (user1, user2) => {
            try {

                const fetchedMessages = await fetchMessages(user1, user2);
                let temp = privateChatUser?.name
                if (name && temp) {
                    console.log("hello123123", name, temp)
                    socket.emit("seenMessageByReceiver", { user: temp, receiver: name });
                }
                if (fetchedMessages) {
                    console.log(fetchedMessages, "sdklgoldfh")
                    setMessages((prevMessages) => [...prevMessages, ...fetchedMessages]);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (privateChatUser && name) {
            // socket.emit("BlueTickValidate", ({ user1: privateChatUser.name, user2: name }))
            if (privateChatUser.name === "Global")
                getMessages("Global", "Global");
            else
                getMessages(privateChatUser.name, name);
        }

    }, [privateChatUser])


    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
                console.log(fetchedUsers);
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, []);
    const getNotificationCount = async () => {
        try {
            const fetchedUsers = await countMessageNotSeen(name);
            const combinedNotifications = fetchedUsers.reduce((acc, obj) => {
                return { ...acc, ...obj };
            }, {});
            console.log(combinedNotifications);
            setCountNotifications(combinedNotifications);
        } catch (error) {
            console.error(error);
        }
    };
    //Notification code
    useEffect(() => {
        if (name) getNotificationCount();
    }, [name]);
    useEffect(() => {
        console.log("left", onlineSeen)
        if (onlineSeen) {
            console.log(messages)
            console.log("Message seen")
            if (name) {

                setMessages((prevMessages) =>
                    prevMessages.map((message) =>
                        message.user === name ? { ...message, seen: 2 } : message
                    )
                );
                setOnlineSeen(false)
            }
        }
        if (name && messages.at(-1)?.user !== "Info007") {
            if (!privateChatUser?.name)
                getNotificationCount()
            else
                if (privateChatUser.name !== messages.at(-1)?.user)
                    getNotificationCount()
        }
    }, [messages, onlineSeen, name])
    useEffect(() => {
        console.log("llklklklklklklkl")
        const fetchLastSeenTime = async () => {
            if (!checkHeIsInOnline(privateChatUser?.name)) {
                const lastSeenTime = await fetchLastSeen(privateChatUser?.name);
                setLastSeen(lastSeenTime);
            }
        };

        fetchLastSeenTime();

    }, [onlineMembers, privateChatUser])
    useEffect(() => {
        const newSocket = io(API_URL);
        setSocket(newSocket);

        const fetchUserData = () => {
            if ("userData" in localStorage) {
                let userData = JSON.parse(localStorage.getItem("userData"));
                setName(userData.email);
                newSocket.emit("join", { name: userData.email, room: "" }, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        };
        fetchUserData();

        newSocket.on("onlinePeople", (onlineData) => {
            console.log(onlineData?.users); // Should print the list of online users
            setOnlineMembers(onlineData?.users || []);
        });

        newSocket.on('message', (message) => {
            let temp = curSender.current.innerHTML == "You" ? message.user : curSender.current.innerHTML
            message.timestamp = formatTimestamp(message.timestamp)

            if (curUser.current?.innerHTML == "You") {
                message.seen = 2
                setMessages((prevMessages) => [...prevMessages, message]);
            }
            else {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
            console.log(curUser?.current?.innerHTML, message.user)

            console.log(temp, "dshjgfkgf")
            if (curUser?.current?.innerHTML === message.user && temp) {
                newSocket.emit("seenMessageByReceiver", { user: message.user, receiver: temp });
            }
            else {
                powerNotified(message.user, message.text)
            }

        });
        newSocket.on('messageSeenByReceiver', ({ receiver }) => {
            console.log(receiver)
            if (curSender?.current)
                userSeenMessage(curSender.current.innerHTML, receiver)
            setOnlineSeen(true)
            console.log("Hello")
        });
        newSocket.on('connect', () => {
            console.log(`Connected with socket ID: ${newSocket.id}`);
        });

        newSocket.on('disconnect', () => {
            console.log(`Disconnected from socket ID: ${newSocket.id}`);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [API_URL]);

    const handleSendMessage = (fileName = null) => {
        if (privateChatUser.name === "Global") {
            GlobalSend()
            return
        }
        if ((fileName || message) && socket) {
            if (privateChatUser) {
                socket.emit('privateMessage', { message, to: privateChatUser.name, fileName }, (seenOrNot) => {
                    const timestamp = formatTimestamp(new Date());
                    if (privateChatUser?.name !== name)
                        setMessages((prevMessages) => [...prevMessages, { text: message, user: name, timestamp: timestamp, seen: seenOrNot, fileName: fileName }])
                    setMessage('')
                });
            } else {
                alert("Select a user to chat with privately.");
            }
        }
    };
    const GlobalChat = async () => {
        setPrivateChatUser({ name: "Global" });
        setMessages([]);
    }
    const GlobalSend = async () => {
        if (message && socket) {
            socket.emit('Global', message);
            const timestamp = formatTimestamp(new Date());
            setMessages((prevMessages) => [...prevMessages, { text: message, user: name, timestamp: timestamp }])
            setMessage('')
        }
    }
    const handleStartPrivateChat = (user) => {
        const updatedNotifications = { ...countNotifications };
        delete updatedNotifications[user.email];

        // Update the state with the new object
        setCountNotifications(updatedNotifications);
        setPrivateChatUser({ name: user.email });
        setMessages([])
    };
    const checkHeIsInOnline = (dataInOnline) => {
        for (let i of onlineMembers) {
            if (i.name === dataInOnline)
                return true
        }
        return false
    }
    return (
        <div className="container mx-auto">
            <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
                <div className="border-r border-gray-300 lg:col-span-1">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                        {name && <>
                            <img className="object-cover w-10 h-10 rounded-full"
                                src="" alt="username" />
                            <span className="block ml-2 font-bold text-gray-600"
                                ref={curSender}
                            >{name}</span>
                        </>}
                    </div>
                    <div className="mx-3 my-3">
                        <div className="relative text-gray-600">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                placeholder="Search" required />
                        </div>
                    </div>

                    <ChatList
                        users={users}
                        privateChatUser={privateChatUser}
                        handleStartPrivateChat={handleStartPrivateChat}
                        name={name}
                        checkHeIsInOnline={checkHeIsInOnline}
                        GlobalChat={GlobalChat}
                        countNotifications={countNotifications}
                        setCountNotifications={setCountNotifications}
                    />
                </div>
                <div className="hidden lg:col-span-2 lg:block">
                    <div className="w-full">

                        {privateChatUser && <>
                            <div className="relative flex items-center p-3 border-b border-gray-300">
                                <img className="object-cover w-10 h-10 rounded-full"
                                    src="" alt="username" />
                                <div className='block'>
                                    <span className="block ml-2 font-bold text-gray-600" ref={curUser}>
                                        {privateChatUser?.name == name ? "You" : privateChatUser?.name}</span>
                                    <span className='block ml-2'>{checkHeIsInOnline(privateChatUser?.name) ? "Online" : lastSeen ? new Date(lastSeen).toLocaleString() : "Fetching..."}</span>
                                </div>


                            </div>
                        </>}

                        <div className="relative w-full p-6 overflow-y-auto h-[28rem]">
                            <ul className="space-y-2">
                                {messages.map((message, index) => (
                                    (message.user !== "Info007") &&
                                    (message.user === name || message.user === privateChatUser?.name || privateChatUser?.name === "Global") && (
                                        <li key={index} className={`flex justify-${message.user === name ? "end" : "start"}`}>
                                            <div>
                                                <div className={`relative max-w-xl px-4 py-2 rounded shadow ${message.user === name ? "bg-blue-500 text-gray-50" : "bg-gray-100 text-gray-700"}`}>
                                                    <span className="block whitespace-pre-wrap">{message.text}</span>
                                                    {message.fileName && (
                                                        <div className="mt-2 flex items-center">
                                                            {["png", "jpeg", "jpg", "gif"].includes(message.fileName.split(".").at(-1).toLowerCase()) ? (
                                                                <img
                                                                    src={`http://localhost:8000/sendingFiles/${message.fileName}`}
                                                                    alt="preview"
                                                                    className="max-w-[400px] max-h-[400px] object-cover cursor-pointer hover:opacity-70"
                                                                    onClick={() => handleDownload(message.fileName)}
                                                                />
                                                            ) : (
                                                                <a
                                                                    onClick={() => handleDownload(message.fileName)}
                                                                    className="flex items-center text-gray-950 hover:underline"
                                                                >
                                                                    <CloudDownloadRounded className="mr-1 text-gray-950" />
                                                                    {message.fileName && message.fileName.slice(0, message.fileName.length - 28) + "." + message.fileName.split(".").at(-1)}
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='flex justify-end mr-1'>
                                                    <span className="block text-[12px]">{message.timestamp}</span>
                                                    {message.user === name && (
                                                        message?.seen
                                                            ? <span><DoneAllRounded style={{ color: message?.seen === 2 ? 'blue' : 'black' }} /></span>
                                                            : (onlineMembers.some(user => user.name === privateChatUser?.name))
                                                                ? <span><DoneAllRounded /></span>
                                                                : <span><CheckRounded /></span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>


                        <ChatInputBox
                            message={message}
                            setMessage={setMessage}
                            handleSendMessage={handleSendMessage}
                            senderName={name}
                            receiverName={privateChatUser?.name}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Chat;
