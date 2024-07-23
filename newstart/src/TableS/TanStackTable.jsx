import React, { useState, useEffect, useMemo } from 'react';

import MaterialTable from './MaterialTable';
import axios from 'axios';
const TanStackTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'userId',
            header: 'ID',
        },
        {
            accessorKey: 'id',
            header: 'Task ID',
        },
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'completed',
            header: 'Completed',
            Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        },
    ];
    return (<MaterialTable users={data} columns={columns} lod={loading} err={error}/>)

};

export default TanStackTable;
