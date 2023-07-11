import LoginData from "../../model/LoginData";
import NetworkType from "../../model/NetworkType";
import UserData from "../../model/UserData";
import AuthService from "./AuthService";

export default class AuthServiceFake implements AuthService{
    getAvailableProviders(): NetworkType[] {
        return [];
    }
    async login(loginData: LoginData): Promise<UserData> {
        const userData: UserData = {email: loginData.email, role: loginData.email.includes('admin') ? 'admin' : 'user'};
        return userData;
    }
    async logout(): Promise<void> {
    }

}