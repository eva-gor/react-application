import {Typography} from "@mui/material"
import GenerationForm from "../forms/GenerationForm";
import InputResult from "../../model/InputResult";
import Employee from "../../model/Employee";
import { employeesService } from "../../config/service-config";
import { getRandomEmployee, getRandomInt } from "../../utils/random";
import config from '../../config/employees-config.json';
import { AUTHENTIFICATION } from "../../App";

const {minSalary, maxSalary, minYear, maxYear, departments} = config;
const EmployeesGenerator: React.FC = ()=>
{
    async function addEmpl(empl: Employee): Promise<InputResult> {
        const res: InputResult = {status: 'success', message: ''};
        try {
            const employee: Employee = await employeesService.addEmployee(empl);
            res.message = `employee with id: ${employee.id} has been added`
        } catch (error: any) {
           res.status = 'error' ;
           if((typeof(error) == 'string') && error.includes(AUTHENTIFICATION)) {
            res.message = "";
           }
           res.message = error;
        } 
        return res;
    }
    async function submitFn(num:number): Promise<InputResult>{
        const employees = [...new Array(num)].map(() => generateRandomEmployee());
        let res:InputResult = {status: 'success', message: num > 1 ? num +' employees are added' : num +' employee was added'}
        for (let e of employees){
            const add = await addEmpl(e);
           if (add.status != 'success'){
            res = add;
            break;
           }
        }
        return res;
    }
return  <Typography variant="h4" align="center">
<GenerationForm maxNumberEmployees={10} submitFn={submitFn}/>
</Typography> 
}
export default EmployeesGenerator;

function generateRandomEmployee(): Employee{
    const month = getRandomInt(0, 11);
    const employee= getRandomEmployee(minSalary* 1000, maxSalary* 1000, minYear, maxYear, departments);
    const birthDate = new Date(employee.birthYear, month + 1, getRandomInt(0, new Date(employee.birthYear, month + 1, 0).getDay()));
    return {name: employee.name, gender: employee.gender, salary: employee.salary, birthDate, department: employee.department};
}

