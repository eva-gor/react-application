import Employee from "../../model/Employee";
import { EmployeeForm } from "../forms/AddEmployeeForm";
import InputResult from "../../model/InputResult";
import { employeesService } from "../../config/service-config";
import { AUTHENTIFICATION } from "../../App";

const AddEmployee: React.FC = () => {
    async function submitFn(empl: Employee): Promise<InputResult> {
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
    return  <EmployeeForm submitFn={submitFn}/> 
}
export default AddEmployee;

