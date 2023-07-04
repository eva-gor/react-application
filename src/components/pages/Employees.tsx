import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { Subscription } from 'rxjs';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { StatusType } from "../../model/StatusType";
import { codeActions } from "../../redux/slices/codeSlice";
import CodeType from "../../model/CodeType";
import { parseInputResult } from "../../utils/parse-message";
import InputResult from "../../model/InputResult";
import { AUTHENTIFICATION } from "../../App";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5, headerClassName:'data-grid-header', align: 'center', headerAlign:'center', editable: false, type:'number' },
    { field: 'name', headerName: 'Name',  editable: false,  headerClassName:'data-grid-header', align: 'center', headerAlign:'center', flex:0.7 },
    { field: 'birthDate', headerName: 'Birth Date', editable: false, flex:1.5,  headerClassName:'data-grid-header', align: 'center', headerAlign:'center', type:'date'},
    { field: 'gender', headerName: 'Gender',  editable: false,  headerClassName:'data-grid-header', align: 'center', headerAlign:'center', flex:0.6},
    { field: 'department', headerName: 'Department', width: 120,  headerClassName:'data-grid-header', align: 'center', headerAlign:'center', editable: false, flex:0.8},
    { field: 'salary', headerName: 'Salary',  editable: false,  headerClassName:'data-grid-header', align: 'center', headerAlign:'center', type:'number', flex:0.6 }
];

const Employees: React.FC = () => {
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        const subscription = employeesService.getEmployees().subscribe({
            next(emplArray: Employee[] | InputResult) {
                if (!Array.isArray(emplArray)){
                    if (emplArray.message === AUTHENTIFICATION){
                        dispatch(authActions.reset());
                    } else {
                        dispatch(codeActions.set(parseInputResult(emplArray)));
                    }
                } else {
                    setEmployees(emplArray.map(e => ({ ...e, birthDate: new Date(e.birthDate) })));
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <Box sx={{ display:'flex', justifyContent:'center' }}>
            <Box  sx={{ height: '50vh', width: '80vw'}}>
          <DataGrid
            rows={employees}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
          </Box>
        </Box>
      );
}
export default Employees;