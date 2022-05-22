
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
    [key: string] : OneModeStatistic;
};
