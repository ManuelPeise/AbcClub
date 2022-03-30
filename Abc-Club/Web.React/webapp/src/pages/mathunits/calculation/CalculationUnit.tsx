import {
  Button,
  Grid,
  InputAdornment,
  InputProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import TextFieldBox from "../../../components/inputs/TextFieldBox";
import { ICalculationUnit } from "../../../interfaces/IUnitResponseModel";
import { CalculationRuleEnum } from "../../../lib/enums/CalculationRuleEnum";
import {
  SentimentVeryDissatisfiedOutlined,
  SentimentDissatisfiedOutlined,
  HelpOutline,
} from "@material-ui/icons";
import { ICalculationResult } from "../../../interfaces/IUnitResult";

const styles = makeStyles({
  unitContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignContent: "center",
    marginLeft: "2rem",
    marginRight: "2rem",
    backgroundColor: "wheat",
    margin: ".5rem",
    height: "5rem",
  },
  field: {
    height: "4rem",
    display: "flex",
    padding: "2.5rem",
    alignItems: "center",
  },
  icon: {
    height: "2rem",
    width: "2rem",
  },
  iconSuccess: {
    color: "green",
    height: "2rem",
    width: "2rem",
  },
  iconUnSuccess: {
    color: "red",
    height: "2rem",
    width: "2rem",
  },
});

interface IProps {
  id: number;
  unit: ICalculationUnit;
  onResultChanged: (result: number, id: number) => void;
}

const equal = "=";
const CalculationUnit: React.FC<IProps> = (props) => {
  const { id, unit, onResultChanged } = props;
  const classes = styles();
  const [calculationResult, setResult] = React.useState<ICalculationResult>({
    key: id,
  });
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const handleResultChanged = React.useCallback(
    (result: string, id?: number) => {
      setResult({ ...calculationResult, value: parseInt(result) });
    },
    [calculationResult]
  );

  const submitResult = React.useCallback(() => {
    if (calculationResult.value !== undefined) {
      onResultChanged(calculationResult.value, id);
      setDisabled(true);
    }
  }, [calculationResult, id, onResultChanged]);

  const calculationRule = React.useMemo(() => {
    if (unit.CalculationRule === CalculationRuleEnum.Plus) {
      return "+";
    }

    if (unit.CalculationRule === CalculationRuleEnum.Minus) {
      return "-";
    }
  }, [unit.CalculationRule]);

  const resultElement = React.useMemo(() => {
    let inputProps: InputProps = {} as InputProps;
    const endAdornment =
      unit.Result === calculationResult.value ? (
        <InputAdornment position="end">
          <SentimentVeryDissatisfiedOutlined className={classes.iconSuccess} />
        </InputAdornment>
      ) : (
        <InputAdornment position="end">
          <SentimentDissatisfiedOutlined className={classes.iconUnSuccess} />
        </InputAdornment>
      );

    if (disabled) {
      inputProps = {
        value: calculationResult.value,
        type: "number",
        disabled: disabled,
        id: id.toString(),
        inputProps: { min: 0 },
        endAdornment: endAdornment,
      };
    } else {
      inputProps = {
        value: calculationResult.value,
        type: "number",
        disabled: disabled,
        id: id.toString(),
        inputProps: { min: 0 },
        endAdornment: <HelpOutline className={classes.icon} />,
      };
    }

    return (
      <TextFieldBox {...inputProps} onValueChanged={handleResultChanged} />
    );
  }, [
    id,
    calculationResult,
    unit.Result,
    disabled,
    classes.iconSuccess,
    classes.iconUnSuccess,
    classes.icon,
    handleResultChanged,
  ]);

  return (
    <Grid className={classes.unitContainer} container>
      <Grid className={classes.field} item>
        <Typography variant="h5">{unit.NumberOne}</Typography>
      </Grid>
      <Grid className={classes.field} item>
        <Typography variant="h5">{calculationRule}</Typography>
      </Grid>
      <Grid className={classes.field} item>
        <Typography variant="h5">{unit.NumberTwo}</Typography>
      </Grid>
      <Grid className={classes.field} item>
        <Typography variant="h5">{equal}</Typography>
      </Grid>
      <Grid className={classes.field} item>
        {resultElement}
      </Grid>
      <Grid className={classes.field} item>
        <Button disabled={disabled} onClick={submitResult}>
          Lösen
        </Button>
      </Grid>
    </Grid>
  );
};

export default CalculationUnit;
