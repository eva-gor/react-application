import { useDispatch } from "react-redux";
import { InputAuthDataType } from "../../model/InputAuthDataType";
import InputResult from "../../model/InputResult";
import AuthenificationForm from "../common/AuthentificationForm";
import { authorizationStatusActions } from "../../redux/slices/stateAuthorizedSlice";
import AuthenticationService from "../../service/AuthenticationService";
import { useState } from "react";
import Home from "./Home";

const admin = 'admin';
const SignIn: React.FC = () => {
    const [page, setPage] = useState(
        <section className="component-section">
        <p className="component-logo">
            Sign In Component
        </p>
        <div className="sign-in-form">
            <AuthenificationForm placeholderUsername="Input username" placeholderPassword="Input password" buttonTitle="Submit" submitFn={submitFn} />
        </div>
        </section>
    );
    const dispatch = useDispatch();
    function setStatusForm(username: string) {
        if (username.toLowerCase().startsWith(admin)) {
            dispatch(authorizationStatusActions.setAuthorizationState("authorized_admin"));
        } else {
            dispatch(authorizationStatusActions.setAuthorizationState("authorized_user"));
        }
        setPage(<Home />);
    }
    function submitFn(data: InputAuthDataType): InputResult {
         const res: InputResult = { status: "success", message: "Your're authorized" };
        //TODO authentification procedure
        window.localStorage.setItem("username", data.username);
        window.localStorage.setItem("password", data.password);
        setStatusForm(data.username);
        return res;
    }

    return page;
}


export default SignIn;

/*  async function checkAuthentificationData(data: InputAuthDataType){
    const service = new AuthenticationService();
    return await service.userExists(data) ;
} */