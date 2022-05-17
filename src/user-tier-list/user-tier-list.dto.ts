import { Tier, TierListType } from './user-tier-list.interface';

// user.dto.ts
export class CreateUserTierListDTO {
  public readonly name: string;
  public readonly password: string;
  public readonly type: TierListType;
  public readonly tierList: Tier[];
  public readonly ip: string;
}

export class EditUserTierListDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly password: string;
  public readonly type: TierListType;
  public readonly tierList: Tier[];
  public readonly ip: string;
}
