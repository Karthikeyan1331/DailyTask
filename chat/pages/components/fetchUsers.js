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
export const fetchLastSeen = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/getLastSeen`, { email })
        console.log(response)
        if (response.status == 200)
            return response?.data?.lastSeen
        console.log("user not found")
    } catch (error) {
        console.log(error)
    }
}
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
                fileName: msg.doc,
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
export const userSeenMessage = async (sender, receiver) => {
    try {
        const response = await axios.post(`${API_URL}/userSeenMessage`, { sender, receiver });
        if (response.status == 200) {
            return true
        }
    }
    catch (error) {
        console.log(error)
    }
}
export function formatTimestamp(date) {
    console.log(date)
    date = !(date instanceof Date) ? new Date(date) : date
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const handleSendMessageToBackend = async (formData) => {
    try {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        const response = await axios.post(`${API_URL}/uploadwithfile`, formData, config);
        if (response.status === 201) {
            return response?.data
        }
        else {
            console.log(response);
        }

    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export const powerNotified = (catagory, message) => {
    Notification.requestPermission().then(per => {
        if (per === 'granted') {
            new Notification(catagory, {
                body: message,
                icon: "Chat logo.png"
            })
        }
    })
}
export const handleDownload = async (filePath) => {
    const url = `${API_URL}/sendingFiles/${filePath}`;
    const fileName = filePath.split('/').pop().split('.').slice(0, -1).join('.') + '.' + filePath.split('.').pop();

    try {
        const response = await axios.get(url, {
            responseType: 'blob', // Important
        });

        const blob = new Blob([response.data], { type: response.data.type });
        const link = document.createElement('a');
        const downloadUrl = window.URL.createObjectURL(blob);

        link.href = downloadUrl;
        link.download = fileName;

        document.body.appendChild(link); // Append the link to the body
        link.click(); // Trigger click to download
        document.body.removeChild(link); // Remove the link from the document

        window.URL.revokeObjectURL(downloadUrl); // Clean up the URL.createObjectURL object
    } catch (error) {
        console.error('Error downloading the file', error);
    }
};
export const countMessageNotSeen = async (UserName) => {
    const url = `${API_URL}/countMessageNotSeen/${UserName}`;
    try {
        const response = await axios.get(url)
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}