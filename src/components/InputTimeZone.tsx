import { CSSProperties, useEffect, useState } from "react";
import Clocks from "./Clocks";

const defaultZone = "Asia/Jerusalem";
const maxClocksNumber = 4;
const INPUT_ID = 'inputTZ';

const InputTimeZone: React.FC = () => {
    const [ar, setArrayTimeZones] = useState<string[]>([]);
    const style: CSSProperties = { display: "flex", flexDirection: "column", alignItems: 'center', width: '100%' };
            function onClickEventFn(){
                const inputElem:HTMLInputElement = document.getElementById("{INPUT_ID}") as HTMLInputElement;
                const value = inputElem.value
                if (value){
                    ar.unshift(value);
                    ar.length = ar.length < maxClocksNumber ? ar.length :maxClocksNumber; 
                    setArrayTimeZones(ar);
                    inputElem.value ='';
                }
            }
    return <div style={style}>
        <p>
            <input id="{INPUT_ID}" placeholder="Input timezone"></input>
            <button onClick={event =>{
                event.preventDefault();
                onClickEventFn();
            }}>+</button>
        </p>
        <Clocks timeZones={ar} />
    </div>
}
export default InputTimeZone;