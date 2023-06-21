import { ReactNode } from "react";
import config from '../config/life-game-config.json'

// min/max number of cells
const min_nc = 3;


let { dimension, min_cd, max_cd } = config;
const Row: React.FC<{ row: number[] }> = ({ row }) => {
    function getDivs(): ReactNode {
        return row.map((num, index) =>
            <div key={index} style={{ width: getDim(), height: getDim(), backgroundColor: num ? 'black' : 'white', border: 'solid 1px gray' }}>
            </div>)    
    }
    return <section style={{ display: 'flex' }}>
        {getDivs()}
    </section>
}

export default Row;

function getDim(): number {    
    if (dimension < min_nc) {
        dimension = min_nc;
    } 
    return min_cd + (10 - min_cd)*50/dimension;
}