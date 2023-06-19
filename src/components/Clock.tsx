import { CSSProperties, useEffect, useMemo, useState } from "react";
import timeZones from "../sources/time-zones";
import Input from "./common/Input";
import InputResult from "../model/InputResult";
import service from '../service/service.json';

const defaultZone = "Asia/Jerusalem";
const statusMessages = {
    'success': 'Timezone successfully chosen',
    'warning': 'More than one timezone found. First one is set',
    'error': 'None was found. Default timezone set'
}


function random(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

type Props = {
    time: Date
}
export const Clock: React.FC<Props> = ({ time }) => {
    const initZone = service.init_zones[random(0, service.init_zones.length - 1)];
    const style: CSSProperties = {
        display: "flex",
        flexDirection: "column", alignItems: 'center', boxShadow: '5px 5px 5px gray', padding: '10px', borderRadius: '5%', border: '1px solid gray'
    };
    const [timeZone, setNewTimeZone] = useState<string>(getTimeZone(initZone)[0]);
    let status: 'success' | 'warning' | 'error' = 'success';
    // [timeZone, status] = useMemo(() => getTimeZone(timeZone), [timeZone])

    function submitFn(inputText: string): InputResult {
        const newTimeZone = getTimeZone(inputText);
        status = newTimeZone[1];
        setNewTimeZone(newTimeZone[0]);
        return { status, message: statusMessages[status] }
    }

    return <div style={style}>
        <Input submitFn={submitFn} placeholder={"Input country or city"} />
        <header>
            Time in <b>{timeZone}</b>
        </header>
        <p>{time.toLocaleTimeString(undefined, { timeZone: timeZone })}</p>
    </div>
}

function getTimeZone(zone: string): [string, 'success' | 'warning' | 'error'] {
    let status: 'success' | 'warning' | 'error' = 'error';
    let res = defaultZone;
    let p = timeZones.map(s => [s.name, s.name.split('/')[1], s.mainCities, s.countryName].flat());
    let rec = p.filter(n => n.map(c => c.toLocaleLowerCase()).includes(zone.toLocaleLowerCase()));
    if (rec.length > 1) {
        status = 'warning';
        res = rec[0][0];
    } else if (rec.length == 1) {
        status = 'success';
        res = rec[0][0];
    }
    return [res, status];
}

