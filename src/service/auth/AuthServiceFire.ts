import LoginData from "../../model/LoginData";
import UserData from "../../model/UserData";
import AuthService from "./AuthService";
import { getFirestore, collection, getCountFromServer, query, where, getDoc, doc } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import appFirebase from "../../config/firebase-config";
import NetworkType from "../../model/NetworkType";

export default class AuthServiceFire implements AuthService {
    getAvailableProviders(): NetworkType[] {
        return [{providerName:"GOOGLE", providerIconUrl: "https://image.pngaaa.com/153/1350153-middle.png"}]
    }
    private auth = getAuth(appFirebase);
    private administrators = collection(getFirestore(appFirebase), 'administrators');
    private  async isAdmin(uid: any): Promise<boolean> {
        const docRef = doc(this.administrators, uid);
        return (await getDoc(docRef)).exists();
    }
    async login(loginData: LoginData): Promise<UserData> {
        let userData: UserData = null;
        try {
            const userAuth = loginData.password ==='' && loginData.email === 'GOOGLE' ? await signInWithPopup(this.auth, new GoogleAuthProvider()):
            await signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
            userData = { email: userAuth.user.email!.toString(), role: await this.isAdmin(userAuth.user.uid)? 'admin': 'user' }
        } catch (error) {
            console.log(error);
        }
        return userData;
    }
    async logout(): Promise<void> {
        return signOut(this.auth);
    }

}