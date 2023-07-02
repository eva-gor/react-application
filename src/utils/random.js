const names ={
    "maleNames": ["Vasya", "Josef", "Abraham", "Yakob", "Asaf", "Mosez","Itschak"
    ,"David" ],
    "femaleNames": ["Asya", "Sara", "Rivka", "Olya", "Klara", "Galya"]
};
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
export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
   const gender = getRandomElement(['male', 'female']);
   const name = getRandomElement(gender == 'female' ? names.femaleNames :
    names.maleNames);
    const birthYear = getRandomInt(minYear, maxYear + 1);
    const salary = Math.round(getRandomInt(minSalary, maxSalary) / 1000) * 1000;
    const department = getRandomElement(departments);
    return {
         name, birthYear, gender,
        salary, department};
}
export function getRandomMatrix(rows, columns, min, max) {
    return Array.from({length:rows}).map(() => getRandomArrayIntNumbers(columns, min, max))
}
export function getRandomArrayIntNumbers(nNumbers, min, max) {
    return Array.from({length: nNumbers}).map(() => getRandomInt(min, max))
}