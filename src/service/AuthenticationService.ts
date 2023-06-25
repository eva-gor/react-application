import { UserType } from "../model/UserType";
import config from '../config/authorization-config.json'

const {url, dbName} = config;
export default class AuthenticationService{
    async addUser(user:UserType){
        const response = await fetch(url + dbName, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        return await response.json();
    }
    async getAllUsers(){
        return fetch(url + dbName).then(response => response.json());
        
    }
    async userExists(user:UserType) {
        const res = (await this.getAllUsers()).find((u: { username: string; password: string; }) => u.username == user.username && u.password == user.password);
        return res ? res : false;
    }
}