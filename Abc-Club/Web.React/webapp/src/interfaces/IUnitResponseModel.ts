import { LevelTypeEnum } from "../lib/enums/LevelTypeEnum";
import { UnitTypeEnum } from "../lib/enums/UnitTypeEnum";

export interface IUnitResponseModel{
    userId: number
    unitType: UnitTypeEnum
    level: LevelTypeEnum
    unitContext: IUnitContext
}

export interface IUnitContext{
    context: string
    unitSolution: string
}