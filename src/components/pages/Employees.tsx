import { Box,  Modal } from "@mui/material"
import { useState, useEffect, useRef, useMemo } from "react";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";
import { Subscription } from 'rxjs';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Delete, Edit, Man, Woman } from "@mui/icons-material";
import { useSelectorAuth } from "../../redux/store";
import { Confirmation } from "../common/Confirmation";
import { EmployeeForm } from "../forms/EmployeeForm";
import InputResult from "../../model/InputResult";
import { useDispatchCode, useSelectorEmployees } from "../../hooks/hooks";
const columnsCommon: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'birthDate', headerName: "Date", flex: 0.8, type: 'date', headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'department', headerName: 'Department', flex: 0.8, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'salary', headerName: 'Salary', type: 'number', flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'gender', headerName: 'Gender', flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center', renderCell: params => {
            return params.value == "male" ? <Man/> : <Woman/>
        }
    },
   ];
   
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Employees: React.FC = () => {
    const columnsAdmin: GridColDef[] = [
        {
            field: 'actions', type: "actions", getActions: (params) => {
                return [
                    <GridActionsCellItem label="remove" icon={<Delete />}
                        onClick={() => removeEmployee(params.id)
                        } />,
                    <GridActionsCellItem label="update" icon={<Edit />}
                        onClick={() => {
                            employeeId.current = params.id as any;
                            if (params.row) {
                                const empl = params.row;
                                empl && (employee.current = empl);
                                setFlEdit(true)
                            }
    
                        }
                        } />
                ] ;
            }
        }
       ]
    const dispatch = useDispatchCode();
    const userData = useSelectorAuth();
    const employees = useSelectorEmployees();
    const columns = useMemo(() => getColumns(), [userData, employees]);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setFlEdit] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const employeeId = useRef('');
    const confirmFn = useRef<any>(null);
    const employee = useRef<Employee | undefined>();
    function getColumns(): GridColDef[] {
        let res: GridColDef[] = columnsCommon;
        if (userData && userData.role == 'admin') {
            res = res.concat(columnsAdmin);
        }
        return res;
    }
    function removeEmployee(id: any) {
        title.current = "Remove Employee object?";
        const employee = employees.find(empl => empl.id == id);
        content.current = `You are going remove employee with id ${employee?.id}`;
        employeeId.current = id;
        confirmFn.current = actualRemove;
        setOpenConfirm(true);
    }
    async function actualRemove(isOk: boolean) {
        let errorMessage: string = '';
        if (isOk) {
            try {
                await employeesService.deleteEmployee(employeeId.current);
            } catch (error: any) {
                errorMessage = error;
            }
        }
        dispatch(errorMessage, '');
        setOpenConfirm(false);
    }
    function updateEmployee(empl: Employee): Promise<InputResult> {
        setFlEdit(false)
        const res: InputResult = { status: 'error', message: '' };
        if (JSON.stringify(employee.current) != JSON.stringify(empl)) {
            title.current = "Update Employee object?";
            employee.current = empl;
            content.current = `You are going update employee with id ${empl.id}`;
            confirmFn.current = actualUpdate;
            setOpenConfirm(true);
        }
        return Promise.resolve(res);
    }
    async function actualUpdate(isOk: boolean) {
       
        let errorMessage: string = '';

        if (isOk) {
            try {
                await employeesService.updateEmployee(employee.current!);
            } catch (error: any) {
                errorMessage = error
            }
        }
        dispatch(errorMessage, '');
        setOpenConfirm(false);

    }

    return <Box sx={{
        display: 'flex', justifyContent: 'center',
        alignContent: 'center'
    }}>
        <Box sx={{ height: '80vh', width: '95vw' }}>
            <DataGrid columns={columns} rows={employees} />
        </Box>
        <Confirmation confirmFn={confirmFn.current} open={openConfirm}
            title={title.current} content={content.current}></Confirmation>
        <Modal
            open={openEdit}
            onClose={() => setFlEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <EmployeeForm submitFn={updateEmployee} employeeUpdated={employee.current} />
            </Box>
        </Modal>


    </Box>
}
export default Employees;