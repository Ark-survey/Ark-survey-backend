export function intervalMapping(a: Array<number>, left: number, right: number) :Array<number>{
    const newLength = right - left;
    const minVal = Math.min(...a); //destructuring assignment
    const maxVal = Math.max(...a);
    const oldLength = maxVal - minVal;

    const multiplyFactor = newLength / oldLength;

    //add -minVal to elements in a; then Math.min(a) = 0
    a = a.map(item => item + -minVal);

    a = a.map(item => item * multiplyFactor);

    a = a.map(item => item + left)

    return a

}