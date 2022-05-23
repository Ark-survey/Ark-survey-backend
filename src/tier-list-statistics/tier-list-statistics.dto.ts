import { OneModeStatistic } from "./tier-list-statistics.interface";

/**后端返回给前端的统计数据的格式 */
export interface AllModeStatisticsDTO{
    [key: string] : OneModeStatistic
}
