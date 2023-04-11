import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export const CustomItemList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "name",
                headerName: "Name",
                minWidth: 200,
            },
            {
                field: "message",
                headerName: "Message",
                minWidth: 200,
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id}/>
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [],
    );

    return (
        <Box display="flex" flexDirection={'column'}>
            <Typography variant="h3">This is a custom listing page</Typography>
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
        </Box>
    );
};
