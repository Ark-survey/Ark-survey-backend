import { MetaData, MetaDataType } from 'src/meta-data/meta-data.interface';
import { UserTierList, UserTierListSimple } from 'src/user-tier-list/user-tier-list.interface';

export function formatUserTierList(obj: UserTierList) {
  const userTierListSimple: UserTierListSimple = {
    id: obj?.id,
    name: obj?.name,
    tierList: obj?.tierList,
    type: obj?.type,
    updatedDate: obj?.updatedDate,
  };
  return userTierListSimple;
}

export function formatMetaData(obj: MetaData) {
  console.log(obj);

  const userTierListSimple: MetaDataType = {
    version: obj?.version,
    imgUrlOrigin: obj?.imgUrlOrigin,
    needUpdate: false,
  };
  return userTierListSimple;
}
