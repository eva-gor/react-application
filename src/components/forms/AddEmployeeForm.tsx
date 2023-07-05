import React, { useRef, useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert } from '@mui/material';
import Employee from "../../model/Employee";
import employeeConfig from "../../config/employees-config.json"
import InputResult from "../../model/InputResult";
import Copyright from "./Copyright";
import Confirm from "../common/Confirm";
import { codeActions } from "../../redux/slices/codeSlice";
import { parseInputResult } from "../../utils/parse-message";
import { useDispatch } from "react-redux";
type Props = {
    submitFn: (empl: Employee) => Promise<InputResult>,
    existedEmployee?: Employee
}
const initialDate: any = 0;
const initialGender: any = '';
const initialEmployee: Employee = {
    id: 0, birthDate: initialDate, name: '', department: '', salary: 0,
    gender: initialGender
};
export const EmployeeForm: React.FC<Props> = ({ submitFn, existedEmployee }) => {
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { maxYear, minYear, departments }
        = employeeConfig;
    let { maxSalary, minSalary } = employeeConfig;
    minSalary *= 1000;
    maxSalary *= 1000;
    const [employee, setEmployee] =
        useState<Employee>(existedEmployee ? existedEmployee : initialEmployee);
    const [errorMessage, setErrorMessage] = useState('');

    const fractions = existedEmployee ? {}: {xs:8, md:5, lg:4, xl: 3}

    function handlerName(event: any) {
        const name = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.name = name;
        setEmployee(emplCopy);
    }
    function handlerBirthdate(event: any) {
        const birthDate = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.birthDate = new Date(birthDate);
        setEmployee(emplCopy);
    }
    function handlerSalary(event: any) {
        const salary: number = +event.target.value;
        const emplCopy = { ...employee };
        emplCopy.salary = salary;
        setEmployee(emplCopy);
    }
    function handlerDepartment(event: any) {
        const department = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.department = department;
        setEmployee(emplCopy);
    }
    function genderHandler(event: any) {
        setErrorMessage('');
        const gender: 'male' | 'female' = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.gender = gender;
        setEmployee(emplCopy);
    }
    async function onSubmitFn(event: any) {
        event.preventDefault();
        if (!employee.gender) {
            setErrorMessage("Please select gender")
        } else {
            setOpenConfirm(true);
        }

    }
    async function agreeFn(agree: boolean) {
        setOpenConfirm(false);
        if (agree) {
            const res = await submitFn(employee);
            if (res.status === 'success') {
                setEmployee(initialEmployee);
            }
            dispatch(codeActions.set(parseInputResult(res)));
        }
    }
    function onResetFn(event: any) {
        event.preventDefault();
        setEmployee(initialEmployee);
    }

    return <Box sx={{ marginTop: 5, marginLeft: '3vw', marginRight:'auto' }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent= {existedEmployee ? "left":"center"} >
                <Grid item {...fractions} >
                    <TextField type="text" required sx={{width: '300px'}} label="Employee name"
                        helperText="enter Employee name" onChange={handlerName}
                        value={employee.name} />
                </Grid>
                <Grid item {...fractions} >
                    <FormControl sx={{width: '300px'}} required>
                        <InputLabel id="select-department-id">Department</InputLabel>
                        <Select labelId="select-department-id" label="Department"
                            value={employee.department} onChange={handlerDepartment}>
                            <MenuItem value=''>None</MenuItem>
                            {departments.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item {...fractions}>
                    <TextField type="date" required sx={{width: '300px'}} label="birthDate"
                        disabled={existedEmployee ? true : false}
                        value={employee.birthDate ? employee.birthDate.toISOString()
                            .substring(0, 10) : ''} inputProps={{
                                min: `${minYear}-01-01`,
                                max: `${maxYear}-12-31`
                            }} InputLabelProps={{
                                shrink: true
                            }} onChange={handlerBirthdate} />
                </Grid>
                <Grid item {...fractions} >
                    <TextField label="salary" sx={{width: '300px'}} required
                        type="number" onChange={handlerSalary}
                        value={employee.salary || ''}
                        helperText={`Enter salary in range [${minSalary}-${maxSalary}]`}
                        inputProps={{
                            min: `${minSalary}`,
                            max: `${maxSalary}`
                        }} />
                </Grid>
                <Grid item {...fractions} >
                    <FormControl required error={!!errorMessage}>
                        <FormLabel id="gender-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="gender-group-label"
                            defaultValue=""
                            value={employee.gender || ''}
                            name="radio-buttons-group"
                            row onChange={genderHandler}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" disabled={existedEmployee ? true : false} />
                            <FormControlLabel value="male" control={<Radio />} label="Male" disabled={existedEmployee ? true : false} />
                            <FormHelperText>{errorMessage}</FormHelperText>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>
            <Confirm callbackFn={agreeFn} textMessage="Are you sure you want to add employee?" clickOpen={openConfirm} />

            <Copyright />

        </form>
    </Box>
}

