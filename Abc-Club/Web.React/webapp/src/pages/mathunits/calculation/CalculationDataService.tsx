import React from "react";
import { useUnit } from "../../../hooks/useUnit";
import { IUnitRequestModel } from "../../../interfaces/IUnitRequestModel";
import { IApiOptions } from "../../../lib/ApiJsonInterfaces";
import { UnitTypeEnum } from "../../../lib/enums/UnitTypeEnum";
import CalculationContainer from "./CalculationContainer";
import apiConfig from "../../../lib/apiConfig.json";
import {
  ICalculationUnit,
  IUnitResponseModel,
} from "../../../interfaces/IUnitResponseModel";
import useApi from "../../../hooks/useApi";
import {
  ICalculationResult,
  IUnitResult,
} from "../../../interfaces/IUnitResult";

const controller = apiConfig.baseUrl + apiConfig.math.unitController;

const CalculationDataService: React.FC = () => {
  const mathUnitService = useUnit();
  const [calculationResult, setCalculationResult] = React.useState<
    ICalculationResult[]
  >([] as ICalculationResult[]);
  const [hasAdditionalBtn, setHasAdditionalBtn] =
    React.useState<boolean>(false);

  const requestModel = React.useMemo((): IUnitRequestModel => {
    return mathUnitService.getUnitRequestModel(UnitTypeEnum.Calculation);
  }, [mathUnitService]);

  const getUnitApiOptions = React.useMemo((): IApiOptions => {
    const url =
      controller + apiConfig.math.getunit + JSON.stringify(requestModel);

    return mathUnitService.getUnitApiOptions(url, "GET");
  }, [mathUnitService, requestModel]);

  const calculationApi = useApi<IUnitResponseModel>(getUnitApiOptions);

  const initializeResult = React.useCallback(() => {
    const results: ICalculationResult[] = [] as ICalculationResult[];

    for (let i = 0; i < 5; i++) {
      results.push({ key: i });
    }

    return results;
  }, []);

  const handleStart = React.useCallback(async () => {
    calculationApi.sendRequest(getUnitApiOptions);
    mathUnitService.handleInProgress(true);
    setCalculationResult(initializeResult());
    setHasAdditionalBtn(false);
  }, [mathUnitService, getUnitApiOptions, calculationApi, initializeResult]);

  const handleCancel = React.useCallback(() => {
    mathUnitService.handleInProgress(false);
  }, [mathUnitService]);

  const handleLevelChanged = React.useCallback(
    (level: number) => {
      mathUnitService.handleLevel(level);
    },
    [mathUnitService]
  );

  const calculationUnits = React.useMemo(() => {
    if (calculationApi.items[0] !== undefined) {
      const calculationUnits: ICalculationUnit[] = JSON.parse(
        calculationApi.items[0].unitContext.context
      );

      return calculationUnits;
    }

    return [] as ICalculationUnit[];
  }, [calculationApi.items]);

  const onResultChanged = React.useCallback(
    (result: number, id: number) => {
      const index = calculationResult.findIndex((x) => x.key === id);

      if (index !== -1) {
        const modified = calculationResult;

        modified[index].value = result;

        setCalculationResult(modified);
      }

      const emptyUnits = calculationResult.filter((x) => x.value === undefined);

      if (emptyUnits?.length === 0) {
        setHasAdditionalBtn(true);
      }
    },
    [calculationResult, setCalculationResult]
  );

  const getPoints = React.useCallback(() => {
    let points = 0;

    calculationUnits.forEach((unit, index) => {
      if (unit.Result === calculationResult[index].value) {
        points++;
      }
    });

    return points;
  }, [calculationResult, calculationUnits]);

  const handleSaveResult = React.useCallback(async () => {
    const result: IUnitResult = {
      userId: mathUnitService.userData.id,
      unitType: UnitTypeEnum.Calculation,
      level: mathUnitService.level,
      questionCount: 5,
      points: getPoints(),
    };

    await calculationApi.post({
      serviceUrl: controller + apiConfig.math.saveUnitResult,
      method: "POST",
      parameters: result,
    });

    mathUnitService.handleInProgress(false);
  }, [mathUnitService, calculationApi, getPoints]);

  if (
    calculationApi.items[0] === undefined ||
    mathUnitService.userData.username === undefined
  ) {
    return null;
  }

  return (
    <CalculationContainer
      unit={calculationUnits}
      inProgress={mathUnitService.inProgress}
      level={mathUnitService.level}
      calculationRule={mathUnitService.calculationRule}
      hasAddidionalBtn={hasAdditionalBtn}
      handleStart={handleStart}
      handleCancel={handleCancel}
      handleLevelChanged={handleLevelChanged}
      onResultChanged={onResultChanged}
      handleSave={handleSaveResult}
      handleCalculationRuleChanged={mathUnitService.handleCalculationRule}
    />
  );
};

export default CalculationDataService;
