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
  handleLevelChanged: (level: number) => void;
  handleStart: () => void;
  handleCancel: () => void;
}

const AbcQuizContainer: React.FC<IProps> = (props) => {
  const {
    inProgress,
    level,
    unitItems,
    helperItems,
    handleLevelChanged,
    handleStart,
    handleCancel,
  } = props;

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
            title="Test"
            isReadOnly={true}
            isHelper={true}
            items={helperItems}
          />
        )}
        {inProgress && (
          <CardContainer title="Test" isReadOnly={true} items={unitItems} />
        )}
      </UnitContainer>
      <ButtonGroup
        saveBtnValue="Start"
        saveDisabled={inProgress}
        hasCancelBtn={true}
        hasSaveBtn={true}
        handleClick={handleStart}
        handleCancel={handleCancel}
      />
    </React.Fragment>
  );
};

export default AbcQuizContainer;
