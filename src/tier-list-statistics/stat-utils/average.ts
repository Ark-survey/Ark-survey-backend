import { Logger } from "@nestjs/common";
import { TierListDTO } from "src/tier-list/tier-list.dto";
import { Tier } from "src/tier-list/tier-list.interface";
import { OneModeStatistic } from "../tier-list-statistics.interface";

const MIN_CHAR_CNT = 7; //需至少评价10位干员
const MIN_TIER_CNT = 3; //需至少包含三个等级

function whichInterval(val: number){
    if(val < 1) return 0;
    if(val < 2) return 1;
    if(val < 3) return 2;
    if(val < 4) return 3;
    return 4;
}

export function computeAllModeStatistic(allTierList: TierListDTO[]): Record<string, OneModeStatistic>{
    const logger = new Logger(computeAllModeStatistic.name);
    const allModeStat: Record<string, OneModeStatistic> = {};

    allTierList.forEach((tierList: TierListDTO) =>{
        const mode = tierList.key; //环境，e.g.危机合约，主线。。
        if(mode in allModeStat == false){
            allModeStat[mode] = {
                count: 0, //所有等级表的数量，等于TierList collection的长度
                validCount: 0, //所有有效等级表的数量
                charStatistics: {}, //所有干员的评价
                createdDate: new Date().getTime().toString(), //唯一对createdDate做类型检查的地方
            }
        }
        const oneModeStat = allModeStat[mode];
        oneModeStat.count += 1; //总等级表数

        //tierList 是否 valid
        if(isValidTierList(tierList.tiers) == false) return;
        oneModeStat.validCount += 1; //有效等级表数

        /*分数转换*/
        tiersValueMapping(tierList.tiers);

        tierList.tiers.forEach((tier: Tier) =>{
            tier.characterKeys.forEach((char) => { //char 干员名 e.g.:"char_263_skadi"
                if((char in oneModeStat.charStatistics) == false){
                  oneModeStat.charStatistics[char] = {
                    avgValue: 0,
                    count: 0,
                    /**
                     * 评分分布：
                     * [
                     *  0: [0,1)
                     *  1: [1, 2)
                     *  2: [2, 3)
                     *  3: [3, 4)
                     *  4: [4,5]
                     * ]
                     */
                    distributions: [0,0,0,0,0] 
                  };
                };
                oneModeStat.charStatistics[char].count += 1; 
                // logger.debug(tier.value)
      
                /*计算平均值：AVG = (N-1)/N * PREV_AVG + cur / N */
                const prev_avg : number= oneModeStat.charStatistics[char].avgValue;
                const N : number= oneModeStat.charStatistics[char].count;
                const new_avg = ((N - 1) / N ) * prev_avg + tier.value / N;
                oneModeStat.charStatistics[char].avgValue = new_avg;
                oneModeStat.charStatistics[char].distributions[whichInterval(tier.value)] += 1;
                // logger.debug("oneModeStat.charStatistics[char].count = " + oneModeStat.charStatistics[char].count + "oneModeStat.charStatistics[char].avgValue = " + oneModeStat.charStatistics[char].avgValue)
              });
        });
    });

    return allModeStat;
}

function tiersValueMapping(tierList: Tier[]){
    const logger = new Logger(tiersValueMapping.name);
    let values :Array<number> = []; //一个用户的所有评级 
    tierList.forEach((tier:Tier)=>{
        values.push(tier.value);
    });
    // logger.debug("Before mapping values =" + values);
    values = intervalMapping(values, 0, 5); //[min, max] 映射到[0,5]
    // logger.debug("After mapping values =" + values);
    values = values.map(item => 5-item) //reverse，越接近5评分越高
    tierList.forEach((tier, i) =>{
        tier.value = values[i];
    }); //value写回到tier.value中
}

function intervalMapping(a: Array<number>, left: number, right: number) :Array<number>{
    const logger = new Logger(intervalMapping.name);
    const newLength = right - left;
    const minVal = Math.min(...a); //destructuring assignment
    const maxVal = Math.max(...a);
    const oldLength = maxVal - minVal;

    const multiplyFactor = newLength / oldLength;

    a = a.map(item => item + -minVal);

    a = a.map(item => item * multiplyFactor);
    // logger.debug("2:" + a);

    a = a.map(item => item + left)
    // logger.debug("3:" + a);
    return a

}

function isValidTierList(tierList: Tier[]) :boolean{
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