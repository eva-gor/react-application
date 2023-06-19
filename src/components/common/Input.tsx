import { type } from "os";
import InputResult from "../../model/InputResult";
import {useRef, useState } from "react";
import InputResultFC from "../Alert";

type Props ={
    submitFn: (inputText: string) => InputResult;
    placeholder: string;
    buttonTitle?: string;
    type?: string;
}

const Input: React.FC<Props> = ({submitFn, placeholder, buttonTitle, type}) => {
    const inputElementRef = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    let status: 'error'|'success'|'warning' = 'success';
    function onClickFn(){
        const res = submitFn(inputElementRef.current!.value);
        setMessage(res.message || '');
        res.message && setTimeout(() =>setMessage(''), 5000);
        status = res.status;
    }
    function onChangeFn(){
        setDisabled(!inputElementRef.current?.value)
    }
    return <div>
        <input type={type||"text"} placeholder={placeholder} ref={inputElementRef} onChange={onChangeFn}/>
        <button onClick={onClickFn} disabled={disabled}>{buttonTitle ||'GO'}</button>
        {message && <p><InputResultFC status={status} message={message}/></p>}  
    </div>;
}

export default Input;