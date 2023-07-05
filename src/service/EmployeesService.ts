import { Observable } from "rxjs";
import Employee from "../model/Employee";
import InputResult from "../model/InputResult";

export default interface EmployeesService {
    addEmployee(empl: Employee): Promise<Employee>;
    getEmployees(): Observable<Employee[] | InputResult>;
    deleteEmployee(id: any): Promise<void>;
    updateEmployee(empl: Employee): Promise<Employee>;
}