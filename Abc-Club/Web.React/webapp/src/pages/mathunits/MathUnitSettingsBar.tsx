import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import DropDown from "../../components/inputs/Dropdown";
import { IListItem } from "../../interfaces/IListItem";
import { CalculationRuleEnum } from "../../lib/enums/CalculationRuleEnum";
import { LevelTypeEnum } from "../../lib/enums/LevelTypeEnum";

const styles = makeStyles({
  settingsBarContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "flex-end",
    padding: "1rem",
    margin: "2rem",
    backgroundColor: "lightgray",
    boxShadow: "2px 4px lightgray",
    maxHeight: "10vh",
  },
  item: {
    margin: ".5rem",
  },
});

interface IProps {
  level: LevelTypeEnum;
  calculationRule?: CalculationRuleEnum;
  disabled: boolean;
  hasCalculationRuleSelection?: boolean;
  setLevel: (level: number) => void;
  setCalculationRule?: (rule: number) => void;
}

const MathunitSettingsBar: React.FC<IProps> = (props) => {
  const {
    level,
    disabled,
    hasCalculationRuleSelection,
    calculationRule,
    setLevel,
    setCalculationRule,
  } = props;
  const classes = styles();

  const levelItems = React.useMemo((): IListItem[] => {
    const data = [] as IListItem[];

    data.push({
      key: 0,
      value: LevelTypeEnum[LevelTypeEnum.Easy],
    });

    data.push({
      key: 1,
      value: LevelTypeEnum[LevelTypeEnum.Medium],
    });

    data.push({
      key: 2,
      value: LevelTypeEnum[LevelTypeEnum.Expert],
    });
    return data;
  }, []);

  const calculationRuleItems = React.useMemo(() => {
    const items = [] as IListItem[];

    items.push({
      key: 0,
      value: CalculationRuleEnum[CalculationRuleEnum.Plus],
    });

    items.push({
      key: 1,
      value: CalculationRuleEnum[CalculationRuleEnum.Minus],
    });

    // items.push({
    //   key: 2,
    //   value: CalculationRuleEnum[CalculationRuleEnum.Mixed],
    // });

    return items;
  }, []);

  const onCalculationRuleChanged = React.useCallback(
    (rule: number) => {
      if (setCalculationRule !== undefined) {
        setCalculationRule(rule);
      }
    },
    [setCalculationRule]
  );

  return (
    <Grid className={classes.settingsBarContainer} container>
      {hasCalculationRuleSelection && (
        <Grid item className={classes.item}>
          <DropDown
            disabled={disabled}
            title="Rechenart"
            items={calculationRuleItems}
            selectedItem={
              calculationRuleItems.find(
                (x) => x.key === (calculationRule as number)
              ) ?? calculationRuleItems[0]
            }
            onHandleChange={onCalculationRuleChanged}
          />
        </Grid>
      )}
      <Grid item className={classes.item}>
        <DropDown
          disabled={disabled}
          title="Schwierigkeit"
          items={levelItems}
          selectedItem={
            levelItems.find((x) => x.key === (level as number)) ?? levelItems[0]
          }
          onHandleChange={setLevel}
        />
      </Grid>
    </Grid>
  );
};

export default MathunitSettingsBar;
