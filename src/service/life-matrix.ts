import { matrixSum, range } from "../utils/number-functions";
import { getRandomMatrix } from "../utils/random";

export default class LifeMatrix {
    constructor(private _numbers: number[][]) {

    }
    get numbers() {
        return this._numbers;
    }
    next(): number[][] {
       this._numbers = this._numbers.map((__, index) => this.getRow(index));
       return this._numbers;
    }
    private getRow(index: number): number[] {
        return this._numbers[index]. map((__, j) => this.getNewCell(index, j));
    }

    private getNewCell(row: number, column: number): number {
        const cell = this._numbers[row][column];
        const partialMatrix = this.partialMatrix(row, column);
        const sum = matrixSum(partialMatrix) - cell;
        return cell? getCellFromLive(sum) : getCellFromDead(sum);
    }

    private partialMatrix(row: number, column: number): number[][] {
        const indexStart = !column ? 0 : column - 1;
        const indexEnd = column === this._numbers[row].length - 1 ? column + 1 : column + 2;
        return [row - 1, row, row + 1].map(i => this._numbers[i] ? this._numbers[i].slice(indexStart, indexEnd) : []);
    }
}

function getCellFromLive(sum: number): number {
    return +(sum  >= 2 && sum <= 3);
}
function getCellFromDead(sum: number): number {
    return +(sum === 3);
}