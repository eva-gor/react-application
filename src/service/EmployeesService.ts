import { Observable } from "rxjs";
import Employee from "../model/Employee";
import InputResult from "../model/InputResult";

export default interface EmployeesService {
    addEmployee(empl: Employee): Promise<Employee>;
    getEmployees(): Observable<Employee[] | InputResult>;
}