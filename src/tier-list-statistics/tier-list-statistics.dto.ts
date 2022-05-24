import { OneModeStatistic } from "./tier-list-statistics.interface";

export interface GetStatisticsByKeysDTO{
    keys: string[];
}

/**后端返回给前端的统计数据的格式 */
export interface AllModeStatisticsDTO{
    [key: string] : OneModeStatistic
}


/***testing */
export interface TestAllModeStatisticsDTO{
    data:{
        [key: string] : OneModeStatistic
    }
}
