import React from "react";
import { useUnit } from "../../../hooks/useUnit";
import AbcQuizContainer from "./AbcQuizContainer";
import apiConfig from "../../../lib/apiConfig.json";
import { UnitTypeEnum } from "../../../lib/enums/UnitTypeEnum";
import { IApiOptions } from "../../../lib/ApiJsonInterfaces";
import useApi from "../../../hooks/useApi";
import { IUnitResponseModel } from "../../../interfaces/IUnitResponseModel";

const controller = apiConfig.baseUrl + apiConfig.math.unitController;

const AbcQuizDataService: React.FC = () => {
  const abcQuizService = useUnit();

  const [unitItems, setUnitItems] = React.useState<string[]>([] as string[]);
  const [solution, setSolution] = React.useState<string[]>([] as string[]);

  const requestModel = React.useMemo(() => {
    return abcQuizService.getUnitRequestModel(UnitTypeEnum.AbcQuiz);
  }, [abcQuizService]);

  const unitApiOptions = React.useMemo((): IApiOptions => {
    const url =
      controller + apiConfig.math.getunit + JSON.stringify(requestModel);

    return abcQuizService.getUnitApiOptions(url, "GET");
  }, [abcQuizService, requestModel]);

  const abcQuizApi = useApi<IUnitResponseModel>(unitApiOptions);

  const handleStart = React.useCallback(async () => {
    await abcQuizApi.sendRequest(unitApiOptions);
    abcQuizService.handleInProgress(true);
    setUnitItems(JSON.parse(abcQuizApi.items[0].unitContext.context));
    setSolution(JSON.parse(abcQuizApi.items[0].unitContext.unitSolution));
  }, [abcQuizService, unitApiOptions, abcQuizApi]);

  const handleCancel = React.useCallback(() => {
    abcQuizService.handleInProgress(false);
  }, [abcQuizService]);

  const handleLevelChanged = React.useCallback(
    (level: number) => {
      abcQuizService.handleLevel(level);
    },
    [abcQuizService]
  );

  if (
    abcQuizApi.items[0] === undefined ||
    abcQuizService.userData.username === undefined
  ) {
    return null;
  }

  return (
    <AbcQuizContainer
      inProgress={abcQuizService.inProgress}
      level={abcQuizService.level}
      unitItems={unitItems}
      helperItems={solution}
      handleLevelChanged={abcQuizService.handleLevel}
      handleStart={handleStart}
      handleCancel={handleCancel}
    />
  );
};

export default AbcQuizDataService;
