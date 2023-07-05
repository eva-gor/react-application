import { Box } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { codeActions } from "../../redux/slices/codeSlice";
import { parseInputResult } from "../../utils/parse-message";
import InputResult from "../../model/InputResult";
import { AUTHENTIFICATION } from "../../App";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelectorAuth } from "../../redux/store";
import Confirm from "../common/Confirm";
import UpdateEmployeeForm from "../forms/UpdateEmployeeForm";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', editable: false, type: 'number' },
  { field: 'name', headerName: 'Name', editable: false, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', flex: 0.7 },
  { field: 'birthDate', headerName: 'Birth Date', editable: false, flex: 1.5, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', type: 'date' },
  { field: 'gender', headerName: 'Gender', editable: false, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', flex: 0.6 },
  { field: 'department', headerName: 'Department', width: 120, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', editable: false, flex: 0.8 },
  { field: 'salary', headerName: 'Salary', editable: false, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', type: 'number'}
];
const defaultEmployee: Employee = { name: '', birthDate: new Date(), department: '', gender: 'female', salary: 0 }
const columnsLength = columns.length;

const Employees: React.FC = () => {
  const userData = useSelectorAuth();
  const dispatch = useDispatch();
  const [id, setId] = useState<GridRowId>(0);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [chosenEmployee, setChosenEmployees] = useState<Employee>(defaultEmployee);
  useEffect(() => {
    const subscription = employeesService.getEmployees().subscribe({
      next(emplArray: Employee[] | InputResult) {
        if (!Array.isArray(emplArray)) {
          if (emplArray.message === AUTHENTIFICATION) {
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

  const columnsWithActions = useMemo(() => getColumns(userData ? userData.role : ''), [userData]);
  function getColumns(role: string): GridColDef[] {
    const rowActions = {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<DeleteIcon />} onClick={deleteUser(params.id)} label="Delete" />,
        <GridActionsCellItem icon={<EditIcon />} onClick={updateUser(params)} label="Update" />
      ]
    };
    if (role === 'admin') {
      columns.push(rowActions);
      columns.length = columnsLength + 1;
    } else {
      columns.length = columnsLength;
    }
    return columns
  }
  const deleteUser = useCallback(
    (id: GridRowId) => async () => {
      setId(id);
      setOpenConfirm(true);
    },
    [],
  );

  const updateUser = useCallback(
    (params: GridRowParams) => async () => {
      setOpenUpdate(true);
      setChosenEmployees(params.row);
    },
    [],
  );

  function onCloseFn(): void {
    setOpenUpdate(false);
  }
  async function agreeFn(agree: boolean) {
    setOpenConfirm(false);
    if (agree) {
      const res: InputResult = { status: 'success', message: '' };
      try {
        await employeesService.deleteEmployee(id);
        res.message = `Employee with id: ${id} has been removed`
      } catch (error: any) {
        res.status = 'error';
        if ((typeof (error) == 'string') && error.includes(AUTHENTIFICATION)) {
          res.message = ""
        }
        res.message = error;
      } finally {
        dispatch(codeActions.set(parseInputResult(res)));
      }
      return res;
    }
  }

  async function submitUpdateFn(empl: Employee): Promise<InputResult> {
    let res: InputResult = { status: 'warning', message: 'Not updated because of no changes found' };
    if (JSON.stringify(chosenEmployee) != JSON.stringify(empl)) {
      try {
        const employee = await employeesService.updateEmployee(empl);
        res.message = `Employee was updated: ${employee.name}, ${employee.id}`;
        res.status = "success";
      } catch (error: any) {
        res.status = 'error';
        if ((typeof (error) == 'string') && error.includes(AUTHENTIFICATION)) {
          res.message = ""
        }
        res.message = error;
      } finally {
        dispatch(codeActions.set(parseInputResult(res)));
        onCloseFn();
      }
    }
    return res;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80vw' }}>
        <DataGrid
          rows={employees}
          columns={columnsWithActions}
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
      <Confirm callbackFn={agreeFn} textMessage="Are you sure you want to add employee?" clickOpen={openConfirm} />
      <UpdateEmployeeForm clickOpen={openUpdate} title="Update Employee" employee={chosenEmployee} onClose={onCloseFn} submitFn={submitUpdateFn} />
    </Box>
  );
}
export default Employees;