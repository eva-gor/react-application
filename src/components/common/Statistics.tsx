import { Box, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import StatisticsDataType from "../../model/StatisticsDataType";



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', editable: false, type: 'number', sortable: false  },
    { field: 'min', headerName: 'Min', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', flex: 1, sortable: false },
    { field: 'max', headerName: 'Max', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', flex: 1, sortable: false },
    { field: 'count', headerName: 'Quantity', headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', flex: 1, sortable: false }
];
type Props = {
    data: StatisticsDataType[]
}
const Statistics: React.FC<Props> = ({ data }) => {
    const dataChart = data.map(q => { return { name: `${q.min} - ${q.max}`, field: q.count } });
    const renderBarChart = ( 
        <BarChart width={100*data.length} height={300} data={dataChart} style={{margin: 'auto'}}>
            <XAxis dataKey="name" stroke="#8884d8" fontSize={20} />
            <YAxis fontSize={20} />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="field" fill="#8884d8" barSize={60} />
        </BarChart>        
    );

    return (
            <Grid container spacing={2} >
                <Grid item xs={12} lg={6}>
                    {renderBarChart}

                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box >
                        <DataGrid
                            sx={{ marginInline: '30px' }}
                            rows={data}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Grid>
            </Grid>
    );
}

export default Statistics;