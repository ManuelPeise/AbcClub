import React from "react";
import MathunitContainer from "../MathUnitContainer";
import ButtonGroup from "../../../components/inputs/ButtonGroup";
import { ICalculationUnit } from "../../../interfaces/IUnitResponseModel";
import MathunitSettingsBar from "../MathUnitSettingsBar";
import { LevelTypeEnum } from "../../../lib/enums/LevelTypeEnum";
import CalculationUnit from "./CalculationUnit";
import { CalculationRuleEnum } from "../../../lib/enums/CalculationRuleEnum";

const btnValue = "Start";

interface IProps {
  unit: ICalculationUnit[];
  inProgress: boolean;
  level: LevelTypeEnum;
  calculationRule: CalculationRuleEnum;
  hasAddidionalBtn: boolean;
  handleStart: () => void;
  handleCancel: () => void;
  handleLevelChanged: (level: number) => void;
  handleCalculationRuleChanged: (rule: number) => void;
  saveResult?: () => Promise<void>;
  onResultChanged: (result: number, id: number) => void;
  handleSave: () => Promise<void>;
}

const CalculationContainer: React.FC<IProps> = (props) => {
  const {
    unit,
    inProgress,
    level,
    hasAddidionalBtn,
    calculationRule,
    handleStart,
    handleCancel,
    handleLevelChanged,
    handleCalculationRuleChanged,
    onResultChanged,
    handleSave,
  } = props;

  //   const resultDialopOpen =
  //     unitResult?.result?.length > 0 && unitResult?.solution?.length > 0;

  return (
    <React.Fragment>
      <MathunitContainer title="Rechnen">
        <MathunitSettingsBar
          disabled={inProgress}
          level={level}
          hasCalculationRuleSelection={true}
          calculationRule={calculationRule}
          setLevel={handleLevelChanged}
          setCalculationRule={handleCalculationRuleChanged}
        />
        {inProgress && (
          <React.Fragment>
            {unit.map((unit, index) => {
              return (
                <CalculationUnit
                  id={index}
                  key={index}
                  unit={unit}
                  onResultChanged={onResultChanged}
                />
              );
            })}
          </React.Fragment>
        )}
      </MathunitContainer>
      <ButtonGroup
        hasCancelBtn={true}
        hasSaveBtn={true}
        saveBtnValue={btnValue}
        cancelBtnValue="Abbrechen"
        saveDisabled={inProgress}
        hasAdditionalBtn={hasAddidionalBtn}
        additionalBtnValue="Speichern"
        handleClick={handleStart}
        handleCancel={handleCancel}
        handleAdditionalBtnClick={handleSave}
      />
    </React.Fragment>
  );
};

export default CalculationContainer;
