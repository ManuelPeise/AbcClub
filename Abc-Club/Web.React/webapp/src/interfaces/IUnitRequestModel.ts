import { CalculationRuleEnum } from "../lib/enums/CalculationRuleEnum";
import { LevelTypeEnum } from "../lib/enums/LevelTypeEnum";
import { UnitTypeEnum } from "../lib/enums/UnitTypeEnum";

export interface IUnitRequestModel {
  userId: number;
  unitType: UnitTypeEnum;
  levelType: LevelTypeEnum;
  calculationRule?: CalculationRuleEnum;
}
