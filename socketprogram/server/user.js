// users.js

const users = [];

const addUser = ({ id, name, room }) => {
    const existingUser = users.find((user) => user.name === name);

    if (existingUser) {
        return { error: 'Username is taken.' };
    }

    const user = { id, name, room };
    users.push(user);
    return { user };
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserByName = (name) => users.find((user) => user.name === name);

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
function formatTimestamp(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
module.exports = {
    users,
    addUser,
    getUser,
    getUserByName,
    removeUser,
    getUsersInRoom,
    formatTimestamp
};
