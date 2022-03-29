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

const NumberchaosDataservice: React.FC = () => {
  const userData = useSelector<IAppState, IUserData>((state) => state.userData);
  const [inProgress, setInProgress] = React.useState<boolean>(false);
  const [solution, setSolution] = React.useState<number[]>([] as number[]);
  const [level, setLevel] = React.useState<LevelTypeEnum>(LevelTypeEnum.easy);

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
    setSolution({} as number[]);
  }, [getUnitApiOptions, numberChaosApi]);

  const handleCancel = React.useCallback(() => {
    setInProgress(false);
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

      if (elementToAdd !== null) {
        event.currentTarget.appendChild(elementToAdd);
        const result = solution;
        result.push(parseInt(elementToAdd.id));

        setSolution(result);
      }
    },
    [solution]
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
      handleStart={handleStart}
      handleCancel={handleCancel}
      handleDragStart={handleDragStart}
      handleAllowDrop={handleAllowDrop}
      handleDrop={handleDrop}
      handleLevelChanged={handleLevelChanged}
    />
  );
};

export default NumberchaosDataservice;
