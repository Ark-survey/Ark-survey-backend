import { Tier } from "../user-tier-list.interface";

const MIN_CHAR_CNT = 10; //需至少评价10位干员
const MIN_TIER_CNT = 3; //需至少包含三个等级


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

export function isValidTierList(tierList: Tier[]) :boolean{
    for(let i = 0; i < filters.length; i++){
        if(filters[i](tierList) == false){
            return false;
        }
    }
    return true;
}

interface TieListFilterFunc{
    (tierList: Tier[]): boolean; //return true:keep item; return false, exclude item.
}

const filters: Array<TieListFilterFunc> = [
    (tierList: Tier[]) =>{ //等级表需至少包含三个等级
        return tierList.length >= MIN_TIER_CNT;
    },
    (tierList: Tier[]) =>{ //需至少评价10个干员
        let characterCnt = 0; //该用户一共评价了多少干员
        tierList.forEach((item) =>{
            characterCnt += item.characterKeys.length;
        })
        return characterCnt >= MIN_CHAR_CNT;
    }
];