import { useState, useEffect } from "react";
import { Clock } from "./Clock";
import service from '../service/service.json';
const num =  [...new Array(service.clockNumber)];

const Clocks:React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
       setTime(new Date());
      
   }, 1000 );
   return () => clearInterval(intervalId)
   }, []);

    return <div style={{display: 'flex',
     flexDirection: 'row', justifyContent: 'space-around'}}>
        {num.map((__,i) => <Clock time={time}  />)}
    </div>
}
export default Clocks;
