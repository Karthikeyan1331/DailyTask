import axios from "axios";

const DataGet = async () => {
    const options = {
        method: 'GET',
        url: 'https://api.openbrewerydb.org/breweries'
    };
    const options1 = {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/deals'
    };
    try {
        const response = await axios.request(options);
        const response1 = await axios.request(options1);
        response1.data = response1.data.map((val) => {
            val.likes = 0;
            return val;
        });
        return response1.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default DataGet;
