import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { deleteUser } from './UserReducer';
import Test from './Test';

const Home = () => {
    // Fetch user data from the Redux store
    const users = useSelector((state) => state.users?.userList) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Handler to simulate a network request and navigate to the Create page
    const handleCreateButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/Create');
        }, 1500); // Simulated network delay
    };

    // Handler to delete a user by ID
    const handleOnClickDelete = (id) => {
        dispatch(deleteUser({ id }));
    };

    // Handler to navigate to the Update page with the selected user ID
    const handleOnClickUpdate = (id) => {
        navigate(`/Update?_id=${id}`);
    };

    // Column definitions for BootstrapTable
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cellContent, row) => (
                <div>
                    <button
                        className="btn btn-primary me-1"
                        onClick={() => handleOnClickUpdate(row.id)}>
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleOnClickDelete(row.id)}>
                        Delete
                    </button>
                </div>
            )
        }
    ];

    // Pagination options for BootstrapTable
    const paginationOptions = {
        paginationSize: 3,
        showTotal: true,
        disablePageTitle: true,
        sizePerPageList: [
            { text: '1', value: 1 },
            { text: '25', value: 25 },
            { text: '50', value: 50 },
            { text: 'All', value: users.length }
        ],
        paginationTotalRenderer: (from, to, size) => (
            <span className='ms-3'>
                Showing {from} to {to} of {size} entries
            </span>
        )
    };

    return (
        <div className='container'>
            <button className='float-end btn btn-primary' onClick={()=>navigate("/TanStackTable")}>Table</button>
            <h2>Crud App with JSON Server</h2>
            <Button
                sx={{ marginBottom: "10px" }}
                variant="contained"
                color="success"
                onClick={handleCreateButtonClick}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} /> : null}
            >
                Create
            </Button>
            <Test />
            <BootstrapTable
                keyField='id'
                data={users}
                hover
                striped
                pagination={paginationFactory(paginationOptions)}
                columns={columns}
            />
        </div>
    );
};

export default Home;
