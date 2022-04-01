import React from "react";
import NumberchaosContainer from "./NumberchaosContainer";
import apiConfig from "../../../lib/apiConfig.json";
import useApi from "../../../hooks/useApi";
import { IUnitRequestModel } from "../../../interfaces/IUnitRequestModel";
import { UnitTypeEnum } from "../../../lib/enums/UnitTypeEnum";
import { IUnitResponseModel } from "../../../interfaces/IUnitResponseModel";
import { IApiOptions } from "../../../lib/ApiJsonInterfaces";
import {
  INumberchaosUnitResult,
  IUnitResult,
} from "../../../interfaces/IUnitResult";
import { useUnit } from "../../../hooks/useUnit";

const dropClassName = ".drop-item";
const controller = apiConfig.baseUrl + apiConfig.math.unitController;

const NumberchaosDataservice: React.FC = () => {
  const mathUnitService = useUnit();

  const [result, setResult] = React.useState<INumberchaosUnitResult>(
    {} as INumberchaosUnitResult
  );

  const requestModel = React.useMemo((): IUnitRequestModel => {
    return mathUnitService.getUnitRequestModel(UnitTypeEnum.NumberChaos);
  }, [mathUnitService]);

  const getUnitApiOptions = React.useMemo((): IApiOptions => {
    const url =
      controller + apiConfig.math.getunit + JSON.stringify(requestModel);

    return mathUnitService.getUnitApiOptions(url, "GET");
  }, [mathUnitService, requestModel]);

  const numberChaosApi = useApi<IUnitResponseModel>(getUnitApiOptions);

  const handleStart = React.useCallback(async () => {
    numberChaosApi.sendRequest(getUnitApiOptions);
    mathUnitService.handleInProgress(true);
    setResult({ solution: [], result: [] });
  }, [mathUnitService, getUnitApiOptions, numberChaosApi]);

  const handleCancel = React.useCallback(() => {
    mathUnitService.handleInProgress(false);
  }, [mathUnitService]);

  const unitFinished = React.useCallback((): boolean => {
    if (mathUnitService.inProgress) {
      const elements = document.querySelectorAll(dropClassName);

      const emptyElements = [] as Element[];

      elements.forEach((element) => {
        if (element.children.length === 0) {
          emptyElements.push(element);
        }
      });

      if (emptyElements.length > 0) {
        return false;
      }
    }
    return true;
  }, [mathUnitService.inProgress]);

  const getUnitResult = React.useCallback((): number[] => {
    const result = [] as number[];
    const elements = document.querySelectorAll(dropClassName);

    elements.forEach((element) => {
      result.push(parseInt(element.children[0].id));
    });

    return result;
  }, []);

  const handleAllowDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDragStart = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      const id = (event.target as HTMLDivElement).id;
      event.dataTransfer.setData("data", id);
    },
    []
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      var data = event.dataTransfer.getData("data");

      const elementToAdd = document.getElementById(data);

      if (elementToAdd !== null && event.currentTarget.children.length === 0) {
        event.currentTarget.appendChild(elementToAdd);
      }
      const finished = unitFinished();

      if (finished) {
        mathUnitService.handleInProgress(!finished);

        setResult({
          solution: JSON.parse(
            numberChaosApi.items[0].unitContext.unitSolution
          ),
          result: getUnitResult(),
        });
      }
    },
    [mathUnitService, numberChaosApi.items, unitFinished, getUnitResult]
  );

  const handleLevelChanged = React.useCallback(
    (level: number) => {
      mathUnitService.handleLevel(level);
    },
    [mathUnitService]
  );

  const getPoints = React.useCallback(() => {
    let points = 0;
    result.result.forEach((item, index) => {
      if (item === result.solution[index]) {
        points++;
      }
    });

    return points;
  }, [result]);

  const saveResult = React.useCallback(async () => {
    const result: IUnitResult = {
      userId: mathUnitService.userData.id,
      unitType: UnitTypeEnum.NumberChaos,
      level: mathUnitService.level,
      questionCount: 10,
      points: getPoints(),
    };

    await numberChaosApi.post({
      serviceUrl:
        apiConfig.baseUrl +
        apiConfig.math.unitController +
        apiConfig.math.saveUnitResult,
      method: "POST",
      parameters: result,
    });
  }, [
    mathUnitService.userData.id,
    mathUnitService.level,
    numberChaosApi,
    getPoints,
  ]);

  if (
    numberChaosApi.items[0] === undefined ||
    mathUnitService.userData.username === undefined
  ) {
    return null;
  }

  return (
    <NumberchaosContainer
      unit={numberChaosApi.items[0]}
      inProgress={mathUnitService.inProgress}
      level={mathUnitService.level}
      unitResult={result}
      handleStart={handleStart}
      handleCancel={handleCancel}
      handleDragStart={handleDragStart}
      handleAllowDrop={handleAllowDrop}
      handleDrop={handleDrop}
      handleLevelChanged={handleLevelChanged}
      saveResult={saveResult}
    />
  );
};

export default NumberchaosDataservice;
