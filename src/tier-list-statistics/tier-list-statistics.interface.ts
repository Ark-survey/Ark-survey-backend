
export interface CharStatistic{
    avgValue: number;
    count: number;
    distributions: Array<number>;
};

export interface OneModeStatistic{
    count: number;
    validCount: number;
    charStatistics: Record<string, CharStatistic>;
    createdDate: string;
};


//extends Documents会报错
//只能使用 & 
export type AllModeStatistics =  Document & {
    //Record需放在一个子属性内，否则报错
    data: {[key: string] : OneModeStatistic}; //同schema保持一致
};

