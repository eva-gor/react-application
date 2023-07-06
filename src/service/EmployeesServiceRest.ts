import { Observable, map } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import InputResult from "../model/InputResult";
import { AUTHENTIFICATION } from "../App";
import { getDateDiff } from "../utils/date-functions";
import { count } from "../utils/number-functions";
import StatisticsDataType from "../model/StatisticsDataType";

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
            body: JSON.stringify({ userId: 'admin' })
        };
        return this.request(headers, id);
    }
    async updateEmployee(empl: Employee): Promise<Employee> {
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

    private async request(headers: RequestInit, endUrl = ''): Promise<any> {
        let responseText = '';
        try {
            const response = await fetch(this.url + '/' + endUrl, headers);
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? AUTHENTIFICATION : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {

            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }

    }

    getStatistics(field: string, interval: number): Observable<StatisticsDataType[] | InputResult> {
        return this.getEmployees().pipe(map((emplArray) => {
            if (Array.isArray(emplArray)) {
                let array: any;
                if (field == 'age') {
                    array = emplArray!.map(e => ({ 'age': getDateDiff(e.birthDate, new Date()) }));
                    field = 'age';
                }
                const statisticsObj: number[] = count(array ? array : emplArray, field, interval);
                return Object.entries(statisticsObj).map((e, index) => {
                    const min: number = (+e[0]) * interval;
                    const max = min + interval - 1;
                    return { id: index, min, max, count: e[1] };
                })
            } else return emplArray;
        }));

    }
}
