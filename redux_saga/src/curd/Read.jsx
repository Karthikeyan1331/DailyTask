import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_DOCTOR_FETCH } from "../actions";
import { MaterialReactTable } from 'material-react-table';
import { CircularProgress, Typography, Paper, IconButton, Button, Box, Container } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'
import { DELETE_DOCTOR } from "../actions";
import { useNavigate } from "react-router-dom";
import ModalOverlayCreate from "./ModalOverlayCreate";
const Read = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    let retrievedData = useSelector((state) => state.myReducer);

    useEffect(() => {
        dispatch(GET_DOCTOR_FETCH());
    }, [dispatch]);

    useEffect(() => {
        if (retrievedData && retrievedData.doctors) {
            setData(retrievedData.doctors);
        }
    }, [retrievedData]);

    const handleEdit = (row) => {
        console.log('Edit:', row);
        navigate(`/Update/${row._id}`)
    };

    const handleDelete = (row) => {
        console.log('Delete ID:', row._id);
        dispatch(DELETE_DOCTOR(row._id));
        dispatch(GET_DOCTOR_FETCH())
    };
    const handleCreateBtn = () => {
        navigate("/Create")
    }

    const columns = [
        { accessorKey: 'firstname', header: 'First Name' },
        { accessorKey: 'lastname', header: 'Last Name' },
        { accessorKey: 'speciality', header: 'Speciality' },
        {
            id: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <div>
                    <IconButton onClick={() => handleEdit(row.original)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.original)} color="secondary">
                        <Delete />
                    </IconButton>
                </div>
            )
        }
    ];

    if (retrievedData.loading) {
        return <CircularProgress />;
    }

    if (retrievedData.error) {
        return (
            <Typography color="error">
                Error: {retrievedData.error.message} (Code: {retrievedData.error.code})
            </Typography>
        );
    }

    return (
        <Container>
            <ModalOverlayCreate show={show} handleClose={handleClose} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleCreateBtn}
                >
                    Create
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleShow}
                >
                    Show Modal Overlay
                </Button>
            </Box>
            <MaterialReactTable
                columns={columns}
                data={data}
                enablePagination={false}
            />
        </Container>
    );
};

export default Read;
