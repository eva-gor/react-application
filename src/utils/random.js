export function getRandomInt(min, max) {
    if(min == max) {
        max++;
    } else if (min > max) {
        [min, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))

}
export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}

export function getRandomMatrix(rows, columns, min, max){
    return Array.from({length: rows}).map(() => getRandomArrayIntNumbers(columns, min, max))
}

export function getRandomArrayIntNumbers(nNumbers, min, max){
    return Array.from({length: nNumbers}).map(()=> getRandomInt(min, max))
}
