import React, { CSSProperties } from "react";
import MathunitContainer from "../MathUnitContainer";
import ButtonGroup from "../../../components/inputs/ButtonGroup";
import { IUnitResponseModel } from "../../../interfaces/IUnitResponseModel";
import DropContainer from "../../../components/dragNDrop/DropContainer";
import { Grid } from "@material-ui/core";
import MathunitSettingsBar from "../MathUnitSettingsBar";
import { LevelTypeEnum } from "../../../lib/enums/LevelTypeEnum";
import DraggableCard from "../../../components/dragNDrop/DaggableCard";
import { INumberchaosUnitResult } from "../../../interfaces/IUnitResult";
import NumberchaosResultDialog from "./NumberchaosResultDialog";

const dropItem = "drop-item";
const dragItem = "drag-item";
const btnValue = "Start";

interface IProps {
  unit: IUnitResponseModel;
  inProgress: boolean;
  level: LevelTypeEnum;
  unitResult: INumberchaosUnitResult;
  handleStart: () => void;
  handleCancel: () => void;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  handleAllowDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleLevelChanged: (level: number) => void;
  saveResult: () => Promise<void>;
}

const style: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "4rem",
  height: "auto",
  maxHeight: "4rem",
  margin: "1rem",
  padding: "1rem",
  border: "1px solid lightgray",
};

const NumberchaosContainer: React.FC<IProps> = (props) => {
  const {
    unit,
    inProgress,
    level,
    unitResult,
    handleStart,
    handleCancel,
    handleDragStart,
    handleAllowDrop,
    handleDrop,
    handleLevelChanged,
    saveResult,
  } = props;

  const resultDialopOpen =
    unitResult.result?.length > 0 && unitResult.solution?.length > 0;

  const dragItems = React.useMemo((): JSX.Element[] => {
    const items: number[] = JSON.parse(unit.unitContext.context);

    return items?.map((item, index) => {
      return (
        <DraggableCard
          id={item.toString()}
          className={dragItem}
          key={item}
          style={style}
          handleDragStart={handleDragStart}
        >
          {item}
        </DraggableCard>
      );
    });
  }, [handleDragStart, unit.unitContext]);

  const dropItems = React.useMemo(() => {
    const items: number[] = JSON.parse(unit.unitContext.context);

    return items?.map((item, index) => {
      return (
        <DropContainer
          id={"answer-" + index}
          key={item}
          className={dropItem}
          style={style}
          handleDragStart={handleDragStart}
          handleAllowDrop={handleAllowDrop}
          handleDrop={handleDrop}
        ></DropContainer>
      );
    });
  }, [handleAllowDrop, handleDrop, handleDragStart, unit.unitContext]);

  return (
    <React.Fragment>
      <MathunitContainer title="Zahlenchaos">
        <MathunitSettingsBar
          disabled={inProgress}
          level={level}
          setLevel={handleLevelChanged}
        />
        {inProgress && (
          <React.Fragment>
            <Grid justifyContent="center" container>
              {dragItems}
            </Grid>
            <Grid justifyContent="center" container>
              {dropItems}
            </Grid>
          </React.Fragment>
        )}
        {resultDialopOpen && (
          <NumberchaosResultDialog
            dialogOpen={resultDialopOpen}
            result={unitResult}
            saveResult={saveResult}
          />
        )}
      </MathunitContainer>
      <ButtonGroup
        hasCancelBtn={true}
        hasSaveBtn={true}
        saveBtnValue={btnValue}
        saveDisabled={inProgress}
        handleClick={handleStart}
        handleCancel={handleCancel}
      />
    </React.Fragment>
  );
};

export default NumberchaosContainer;
