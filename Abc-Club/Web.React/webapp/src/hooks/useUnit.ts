import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../interfaces/IAppState";
import { IUnitRequestModel } from "../interfaces/IUnitRequestModel";
import { IUserData } from "../interfaces/IUserData";
import { IApiOptions } from "../lib/ApiJsonInterfaces";
import { CalculationRuleEnum } from "../lib/enums/CalculationRuleEnum";
import { LevelTypeEnum } from "../lib/enums/LevelTypeEnum";
import { UnitTypeEnum } from "../lib/enums/UnitTypeEnum";

export interface UseMathUnitResult {
  userData: IUserData;
  inProgress: boolean;
  level: LevelTypeEnum;
  calculationRule: CalculationRuleEnum;
  getUnitRequestModel: (unitType: UnitTypeEnum) => IUnitRequestModel;
  getUnitApiOptions: (
    serviceUrl: string,
    method: "GET" | "POST"
  ) => IApiOptions;
  handleInProgress: (state: boolean) => void;
  handleLevel: (level: LevelTypeEnum) => void;
  handleCalculationRule: (rule: number) => void;
}

export const useUnit = (): UseMathUnitResult => {
  const userData = useSelector<IAppState, IUserData>((state) => state.userData);
  const [inProgress, setInProgress] = React.useState<boolean>(false);
  const [level, setLevel] = React.useState<LevelTypeEnum>(LevelTypeEnum.Easy);
  const [calculationRule, setCalculationRule] =
    React.useState<CalculationRuleEnum>(CalculationRuleEnum.Plus);

  const getUnitRequestModel = React.useCallback(
    (unitType: UnitTypeEnum): IUnitRequestModel => {
      return {
        levelType: level,
        unitType: unitType,
        calculationRule: calculationRule,
        userId: userData.id,
      };
    },
    [level, calculationRule, userData]
  );

  const getUnitApiOptions = React.useCallback(
    (serviceUrl: string, method: "GET" | "POST"): IApiOptions => {
      return {
        serviceUrl: serviceUrl,
        method: method,
      };
    },
    []
  );

  const handleInProgress = React.useCallback((state: boolean) => {
    setInProgress(state);
  }, []);

  const handleLevel = React.useCallback((level: LevelTypeEnum) => {
    if (level === 0) {
      setLevel(LevelTypeEnum.Easy);
    }

    if (level === 1) {
      setLevel(LevelTypeEnum.Medium);
    }

    if (level === 2) {
      setLevel(LevelTypeEnum.Expert);
    }
  }, []);

  const handleCalculationRule = React.useCallback((rule: number) => {
    if (rule === 0) {
      setCalculationRule(CalculationRuleEnum.Plus);
    }

    if (rule === 1) {
      setCalculationRule(CalculationRuleEnum.Minus);
    }

    if (rule === 2) {
      setCalculationRule(CalculationRuleEnum.Mixed);
    }
  }, []);

  return {
    userData,
    inProgress,
    level,
    calculationRule,
    getUnitRequestModel,
    getUnitApiOptions,
    handleInProgress,
    handleLevel,
    handleCalculationRule,
  };
};
