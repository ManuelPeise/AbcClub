import React from "react";
import { useUnit } from "../../../hooks/useUnit";
import AbcQuizContainer from "./AbcQuizContainer";
import apiConfig from "../../../lib/apiConfig.json";
import { UnitTypeEnum } from "../../../lib/enums/UnitTypeEnum";
import { IApiOptions } from "../../../lib/ApiJsonInterfaces";
import useApi from "../../../hooks/useApi";
import { IUnitResponseModel } from "../../../interfaces/IUnitResponseModel";
import { IUnitResult } from "../../../interfaces/IUnitResult";

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
    const items: string[] = JSON.parse(abcQuizApi.items[0].unitContext.context);

    setUnitItems(items);
    setSolution(JSON.parse(abcQuizApi.items[0].unitContext.unitSolution));
  }, [abcQuizService, unitApiOptions, abcQuizApi]);

  const handleCancel = React.useCallback(() => {
    abcQuizService.handleInProgress(false);
  }, [abcQuizService]);

  const handleValue = React.useCallback(
    (value: string, id: number) => {
      const copy = [...unitItems];
      copy[id] = value;

      setUnitItems(copy);
    },
    [unitItems]
  );

  const unitResolved = React.useMemo(() => {
    return unitItems.filter((x) => x === "").length === 0;
  }, [unitItems]);

  const getPoints = React.useCallback(
    (context: string[]) => {
      let points = 0;

      unitItems.forEach((item, index) => {
        if (context[index] === "") {
          if (
            item.toLocaleUpperCase() === solution[index].toLocaleUpperCase()
          ) {
            points++;
          }
        }
      });

      return points;
    },
    [abcQuizApi, solution, unitItems]
  );

  const getQuestionCount = React.useCallback((context: string[]) => {
    return context.filter((x) => x === "").length;
  }, []);

  const handleSaveResult = React.useCallback(async () => {
    const context: string[] = JSON.parse(
      abcQuizApi.items[0].unitContext.context
    );

    const result: IUnitResult = {
      userId: abcQuizService.userData.id,
      unitType: UnitTypeEnum.AbcQuiz,
      level: abcQuizService.level,
      questionCount: getQuestionCount(context),
      points: getPoints(context),
    };

    await abcQuizApi.post({
      serviceUrl: controller + apiConfig.math.saveUnitResult,
      method: "POST",
      parameters: result,
    });

    abcQuizService.handleInProgress(false);
  }, [abcQuizService, abcQuizApi, getPoints, getQuestionCount]);

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
      unitResolved={unitResolved}
      handleLevelChanged={abcQuizService.handleLevel}
      handleStart={handleStart}
      handleCancel={handleCancel}
      handleValue={handleValue}
      handleSaveResult={handleSaveResult}
    />
  );
};

export default AbcQuizDataService;
