import { useDispatch } from "react-redux";
import { authorizationStatusActions } from "../../redux/slices/stateAuthorizedSlice";
import { useState } from "react";
import Home from "./Home";

const SignOut: React.FC = () => {
    const [page, setPage] = useState(
        <section className="component-section">
            <p className="component-logo">
                SignOut Component
            </p>
            <button className="component-logo" onClick={onClickFn}>Sign Out</button>
        </section>
    );
    const dispatch = useDispatch();
    function onClickFn() {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("password");
        dispatch(authorizationStatusActions.setAuthorizationState("not_authorized"));
        setPage(<Home />);
    }
    return page;
}

export default SignOut;