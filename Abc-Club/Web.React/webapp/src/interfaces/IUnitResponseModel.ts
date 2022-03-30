import { CalculationRuleEnum } from "../lib/enums/CalculationRuleEnum";
import { LevelTypeEnum } from "../lib/enums/LevelTypeEnum";
import { UnitTypeEnum } from "../lib/enums/UnitTypeEnum";

export interface IUnitResponseModel {
  userId: number;
  unitType: UnitTypeEnum;
  level: LevelTypeEnum;
  unitContext: IUnitContext;
}

export interface IUnitContext {
  context: string;
  unitSolution: string;
}

export interface ICalculationUnit {
  NumberOne: number;
  NumberTwo: number;
  CalculationRule: CalculationRuleEnum;
  Result: number;
}
