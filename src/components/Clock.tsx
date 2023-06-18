import { CSSProperties } from "react";
import timeZones from "../sources/time-zones";

const defaultZone = "Asia/Jerusalem";

type Props = {
    time: Date,
    timeZone: string
}
export const Clock: React.FC<Props> = ({ time, timeZone }) => {
    const style: CSSProperties = {
        display: "flex",
        flexDirection: "column", alignItems: 'center', boxShadow: '5px 5px 5px gray', padding: '10px', borderRadius: '5%', border: '1px solid gray'
    };

    timeZone = getTimeZone(timeZone);

    return <div style={style}>
        <header>
            Time in <b>{timeZone}</b>
        </header>
        <p>{time.toLocaleTimeString(undefined, { timeZone: getTimeZone(timeZone) })}</p>
    </div>
}

function getTimeZone(zone: string): string {
    let p = timeZones.map(s => [s.name, s.name.split('/')[1], s.mainCities, s.countryName].flat());
    let rec = p.find(n => n.map(c => c.toLocaleLowerCase()).includes(zone.toLocaleLowerCase()));
    let res = rec ? rec[0] : defaultZone;
    return res;
}