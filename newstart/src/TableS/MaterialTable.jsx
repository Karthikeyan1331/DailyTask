import React, { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Button, CircularProgress, IconButton, Tooltip, Box, Typography, MenuItem, ListItemIcon } from '@mui/material';

import { Edit, Delete } from '@mui/icons-material';

const MaterialTable = ({ users, columns, lod, err }) => {
    const [data, setData] = useState(users);
    const [loading, setLoading] = useState(lod);
    const [error, setError] = useState(err);
    useMemo(() => {
        setLoading(lod)
        setData(users)
        setError(err)
    }, [lod, users, err])
    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnResizing: false,
        enableColumnDragging: true,
        enableClickToCopy: false,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        sortDescFirst: false,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        enableRowSelection: true,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            columnPinning: {
                left: ['mrt-row-select'],
                right: ['mrt-row-actions'],
            },
        },

        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30, { value: data.length, label: 'All' }],
            shape: 'rounded',
            variant: 'outlined',

            SelectProps: {
                renderValue: (selected) => selected === data.length ? 'All' : selected,
            }
        },
        renderRowActions: ({ row }) => (
            <Box>
                <IconButton onClick={() => console.info('Edit', row.original.id)}>
                    <Edit />
                </IconButton>
                <IconButton onClick={() => console.info('Delete', row.original.id)}>
                    <Delete />
                </IconButton>
            </Box>
        ),
        renderTopToolbar: ({ table }) => {
            const handleDeactivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                    alert('deactivating ' + row.getValue('name'));
                });
            };

            const handleActivate = () => {
                table.getSelectedRowModel().flatRows.map((row) => {
                    alert('activating ' + row.getValue('name'));
                });
            };

            return (
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        gap: '0.5rem',
                        p: '8px',
                        justifyContent: 'space-between',
                    })}
                >
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                color="error"
                                disabled={!table.getIsSomeRowsSelected()}
                                onClick={handleDeactivate}
                                variant="contained"
                            >
                                Delete
                            </Button>
                            <Button
                                color="success"
                                onClick={handleActivate}
                                variant="contained"
                            >
                                Create
                            </Button>

                        </Box>
                    </Box>
                </Box>
            );
        },
    });

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
        </Box>
    );;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-2">
            <MaterialReactTable table={table} />
        </div>
    );
};



export default MaterialTable;
