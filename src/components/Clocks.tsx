import { useState, useEffect } from "react";
import { Clock } from "./Clock";

type Props = {
    timeZones: string[]
}
const Clocks:React.FC <Props> = ({timeZones}) => {
    const [time, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
       setTime(new Date());
      
   }, 1000 );
   return () => clearInterval(intervalId)
   }, []);
   let counter = 0;
   const clocks = timeZones.map(zone => <Clock time={time} timeZone={zone} key="clocks-{counter++}"/>)
    return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>        
       {clocks}
    </div>
}
export default Clocks