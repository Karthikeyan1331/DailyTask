import axios from "axios";
const API_URL = "http://localhost:8000"
export const fetchUsers = async () => {
    try {
        const response = await axios.post(`${API_URL}/getUsers`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
    }
};
export const fetchMessages = async (user1, user2) => {
    try {
        const response = await axios.post(`${API_URL}/getMessage`, { user1, user2 });

        if (response.status == 200) {
            const messages = response.data;

            // Convert the data to the desired format
            const formattedMessages = messages.map(msg => ({
                text: msg.text,
                user: msg.sender,
                timestamp: formatTimestamp(new Date(msg.timestamp)),
                seen: msg.seen
            }));

            console.log(formattedMessages);
            return formattedMessages;
        }
        else if (response.status === 201) {
            console.log(response.data)
            return false
        }
        else {
            console.log(response)
            return false
        }
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching messages");
    }
}
export function formatTimestamp(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}