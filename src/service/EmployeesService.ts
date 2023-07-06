import { Observable } from "rxjs";
import Employee from "../model/Employee";
import InputResult from "../model/InputResult";
import StatisticsDataType from "../model/StatisticsDataType";

export default interface EmployeesService {
    addEmployee(empl: Employee): Promise<Employee>;
    getStatistics(field:string, interval: number): Observable<StatisticsDataType[] | InputResult>;
    getEmployees(): Observable<Employee[] | InputResult>;
    deleteEmployee(id: any): Promise<void>;
    updateEmployee(empl: Employee): Promise<Employee>;
}