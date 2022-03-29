import { LevelTypeEnum } from "../lib/enums/LevelTypeEnum";
import { UnitTypeEnum } from "../lib/enums/UnitTypeEnum";

export interface INumberchaosUnitResult {
  result: number[];
  solution: number[];
}

export interface IUnitResult {
  userId: number;
  unitType: UnitTypeEnum;
  level: LevelTypeEnum;
  questionCount: number;
  points: number;
}
