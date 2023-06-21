import { getRandomMatrix } from "../utils/random";

export default class LifeMatrix{
    constructor(private _numbers: number[][]){

    }
    get numbers(){
        return this._numbers;
    }
    next():number[][]{
        let res: number[][] = this._numbers.map((row, i_row) => row.map((el, i_col) => {
            const neighbours = getNeighbourInMatrix<number>(this._numbers, i_row, i_col);
            const neighbours_alive = neighbours.filter(n => n == 1);
            const neighbours_alive_counter = neighbours_alive ? neighbours_alive.length : 0;
            let res = !el && neighbours_alive_counter == 3 ? 1 : 0;
            if (el && (neighbours_alive_counter == 2 || neighbours_alive_counter == 3) ) {
                res = 1;
            }
            return res;
        }));
        this._numbers = res;
        return this._numbers;
    }
}

function getNeighbourInMatrix<T>(ar:T[][], i_row:number, i_col:number):T[]{
    const res: T[] =[];
    (i_row > 0) &&  res.push(ar[i_row - 1][i_col]) && (i_col > 0) && res.push(ar[i_row - 1][i_col - 1]);
    (i_row > 0) && (i_col  < ar.length - 1) && res.push(ar[i_row - 1][i_col + 1]);

    (i_row < ar.length - 1) && res.push(ar[i_row +1][i_col]) && (i_col > 0) && res.push(ar[i_row +1][i_col - 1]);
    (i_row < ar.length - 1) && (i_col  < ar.length - 1) &&  res.push(ar[i_row + 1][i_col + 1]);

    (i_col > 0) && res.push(ar[i_row][i_col - 1]);
    (i_col < ar[0].length -1) && res.push(ar[i_row][i_col + 1]);
    return res;
}