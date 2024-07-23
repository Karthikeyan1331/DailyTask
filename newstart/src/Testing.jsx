// ExampleComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './UserReducer'; // Update import path as needed
import MaterialTable from './TableS/MaterialTable';

const ExampleComponent = () => {
    const dispatch = useDispatch();
    const { userList, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'address.street',
            header: 'Street',
        },
        {
            accessorKey: 'address.suite',
            header: 'Suite',
        },
        {
            accessorKey: 'address.city',
            header: 'City',
        },
        {
            accessorKey: 'address.zipcode',
            header: 'Zipcode',
        },
        {
            accessorKey: 'address.geo.lat',
            header: 'Latitude',
        },
        {
            accessorKey: 'address.geo.lng',
            header: 'Longitude',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
        },
        {
            accessorKey: 'website',
            header: 'Website',
        },
        {
            accessorKey: 'company.name',
            header: 'Company Name',
        },
        {
            accessorKey: 'company.catchPhrase',
            header: 'Catch Phrase',
        },
        {
            accessorKey: 'company.bs',
            header: 'BS',
        },
    ];

    return (
        <MaterialTable users={userList} columns={columns} lod={loading} err={error} />
    );
};

export default ExampleComponent;
