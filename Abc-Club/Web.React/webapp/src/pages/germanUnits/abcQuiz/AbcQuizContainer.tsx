import React from "react";
import UnitContainer from "../../../components/containers/UnitContainer";
import ButtonGroup from "../../../components/inputs/ButtonGroup";
import UnitSettingsBar from "../../../components/settingBars/UnitSettingsBar";
import { LevelTypeEnum } from "../../../lib/enums/LevelTypeEnum";
import CardContainer from "./AbcQuizCardContainer";

interface IProps {
  inProgress: boolean;
  level: LevelTypeEnum;
  unitItems: string[];
  helperItems: string[];
  unitResolved: boolean;
  handleLevelChanged: (level: number) => void;
  handleStart: () => void;
  handleCancel: () => void;
  handleValue: (value: string, id: number) => void;
  handleSaveResult: () => Promise<void>;
}

const AbcQuizContainer: React.FC<IProps> = (props) => {
  const {
    inProgress,
    level,
    unitItems,
    helperItems,
    unitResolved,
    handleLevelChanged,
    handleStart,
    handleCancel,
    handleValue,
    handleSaveResult,
  } = props;

  const container = React.useMemo(() => {
    return (
      <React.Fragment>
        <UnitContainer title="ABC-Quiz">
          <UnitSettingsBar
            disabled={inProgress}
            level={level}
            setLevel={handleLevelChanged}
          />
          {inProgress && level === LevelTypeEnum.Easy && (
            <CardContainer
              isHelper={true}
              items={helperItems}
              handleValue={handleValue}
            />
          )}
          {inProgress && (
            <CardContainer
              isHelper={false}
              items={unitItems}
              handleValue={handleValue}
            />
          )}
        </UnitContainer>
        <ButtonGroup
          saveBtnValue="Start"
          saveDisabled={inProgress}
          hasCancelBtn={!unitResolved}
          hasSaveBtn={true}
          hasAdditionalBtn={unitResolved} // set value to true if unit resolved
          additionalBtnValue="Speichern"
          handleClick={handleStart}
          handleCancel={handleCancel}
          handleAdditionalBtnClick={handleSaveResult}
        />
      </React.Fragment>
    );
  }, [
    level,
    inProgress,
    unitItems,
    helperItems,
    unitResolved,
    handleValue,
    handleStart,
    handleLevelChanged,
    handleCancel,
    handleSaveResult,
  ]);

  return container;
};

export default AbcQuizContainer;
