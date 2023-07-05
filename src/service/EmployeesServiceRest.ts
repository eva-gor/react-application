import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import InputResult from "../model/InputResult";
import { AUTHENTIFICATION } from "../App";

export default class EmployeesServiceRest implements EmployeesService {

    constructor(private url: string) { }
    async addEmployee(empl: Employee): Promise<Employee> {
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
            },
            body: JSON.stringify({ ...empl, userId: 'admin' })
        };
        return this.request(headers);
    }
    getEmployees(): Observable<Employee[] | InputResult> {
        const res: Observable<Employee[] | InputResult> = new Observable((subscriber) => {
            fetch(this.url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`

                }
            }).then(response => {
                let res: Promise<Employee[] | InputResult>;
                if (response.ok) {
                    res = response.json();
                } else {
                    res = Promise.resolve(response.status == 401 || response.status == 403 ? { status: 'error', message: AUTHENTIFICATION } : { status: 'error', message: response.statusText });
                }
                return res;
            }).then(data => subscriber.next(data)).catch(error => subscriber.next({ status: 'error', message: 'Server is unavailable, repeat later' }));
        });
        return res;
    }
    async deleteEmployee(id: any): Promise<void> {
        const headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
            },
            body: JSON.stringify({userId: 'admin' })
        };
        return this.request(headers, id);
    }
    async updateEmployee(empl: Employee): Promise<Employee>{
        const headers = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
            },
            body: JSON.stringify({ ...empl, userId: 'admin' })
        };
        return this.request(headers, empl.id);
    }
    private async request(headers: RequestInit , endUrl='') : Promise<any> {
        let responseText = '';
        try {
            const response = await fetch(this.url+ '/' + endUrl, headers);
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? AUTHENTIFICATION: statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {
    
            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }
    
    }
}