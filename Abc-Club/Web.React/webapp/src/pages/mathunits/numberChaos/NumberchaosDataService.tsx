import React from "react";
import NumberchaosContainer from "./NumberchaosContainer";
import apiConfig from "../../../lib/apiConfig.json";
import useApi from "../../../hooks/useApi";
import { useSelector } from "react-redux";
import { IAppState } from "../../../interfaces/IAppState";
import { IUserData } from "../../../interfaces/IUserData";
import { IUnitRequestModel } from "../../../interfaces/IUnitRequestModel";
import { LevelTypeEnum } from "../../../lib/enums/LevelTypeEnum";
import { UnitTypeEnum } from "../../../lib/enums/UnitTypeEnum";
import { IUnitResponseModel } from "../../../interfaces/IUnitResponseModel";
import { IApiOptions } from "../../../lib/ApiJsonInterfaces";
import {
  INumberchaosUnitResult,
  IUnitResult,
} from "../../../interfaces/IUnitResult";

const dropClassName = ".drop-item";

const NumberchaosDataservice: React.FC = () => {
  const userData = useSelector<IAppState, IUserData>((state) => state.userData);
  const [inProgress, setInProgress] = React.useState<boolean>(false);
  const [level, setLevel] = React.useState<LevelTypeEnum>(LevelTypeEnum.easy);
  const [result, setResult] = React.useState<INumberchaosUnitResult>(
    {} as INumberchaosUnitResult
  );

  const requestModel = React.useMemo((): IUnitRequestModel => {
    return {
      levelType: level,
      unitType: UnitTypeEnum.NumberChaos,
      userId: userData.id,
    };
  }, [level, userData]);

  const getUnitApiOptions = React.useMemo((): IApiOptions => {
    return {
      serviceUrl:
        apiConfig.baseUrl +
        apiConfig.math.unitController +
        apiConfig.math.getunit +
        "/" +
        JSON.stringify(requestModel),
      method: "GET",
    };
  }, [requestModel]);

  const numberChaosApi = useApi<IUnitResponseModel>(getUnitApiOptions);

  const handleStart = React.useCallback(async () => {
    numberChaosApi.sendRequest(getUnitApiOptions);
    setInProgress(true);
    setResult({ solution: [], result: [] });
  }, [getUnitApiOptions, numberChaosApi]);

  const handleCancel = React.useCallback(() => {
    setInProgress(false);
  }, []);

  const unitFinished = React.useCallback((): boolean => {
    if (inProgress) {
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
  }, [inProgress]);

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
        setInProgress(!finished);

        setResult({
          solution: JSON.parse(
            numberChaosApi.items[0].unitContext.unitSolution
          ),
          result: getUnitResult(),
        });
      }
    },
    [numberChaosApi.items, unitFinished, getUnitResult]
  );

  const handleLevelChanged = React.useCallback((level: number) => {
    if (level === 0) {
      setLevel(LevelTypeEnum.easy);
    }

    if (level === 1) {
      setLevel(LevelTypeEnum.medium);
    }

    if (level === 2) {
      setLevel(LevelTypeEnum.expert);
    }
  }, []);

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
      userId: userData.id,
      unitType: UnitTypeEnum.NumberChaos,
      level: level,
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
  }, [userData.id, level, numberChaosApi, getPoints]);

  if (
    numberChaosApi.items[0] === undefined ||
    userData.username === undefined
  ) {
    return null;
  }

  return (
    <NumberchaosContainer
      unit={numberChaosApi.items[0]}
      inProgress={inProgress}
      level={level}
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
