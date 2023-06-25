import { useEffect, useRef, useState } from "react";
import InputResult from "../../model/InputResult";
import "./AuthenificationForm.css"
import Input from "./Input";
import { InputAuthDataType } from "../../model/InputAuthDataType";

type Props = {
    submitFn: (inputData: InputAuthDataType) => InputResult;
    placeholderUsername: string;
    placeholderPassword: string;
    buttonTitle?: string;
    typeUsername?: string,
    typePassword?: string
}
const AuthenificationForm: React.FC<Props> = ({ submitFn, placeholderUsername: placeholderUser, placeholderPassword, buttonTitle, typeUsername, typePassword }) => {
    const inputElementRef = useRef<HTMLInputElement>(null);
    const [disableBtn, setBtnDisable] = useState<boolean>(true);
    function submitFormFn(password: string): InputResult {
        const res = submitFn({ username: inputElementRef.current!.value, password: password });
        if (res.status === 'success') {
            inputElementRef.current!.value = '';
        }
        return res;
    }
    
    function onChangeFn() {
        setBtnDisable(!inputElementRef.current?.value);
    }

    return <div>
        <input type={typeUsername || 'text'} placeholder={placeholderUser} ref={inputElementRef} onChange={onChangeFn} />
        <Input placeholder={placeholderPassword} type={typePassword || 'password'} submitFn={submitFormFn} buttonTitle={buttonTitle} btnDisablingCondition={disableBtn} />
    </div>
}
export default AuthenificationForm;