import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import AbcQuizSolutionDialog from "./AbcQuizSolutionDialog";

const styles = makeStyles({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid lightgray",
    boxShadow: "2px 3px lightgray",
    margin: ".5rem",
    padding: ".5rem",
    width: "3rem",
    height: "3rem",
    cursor: "pointer",
    "&[aria-disabled=true]": {
      cursor: "not-allowed",
    },
  },
});

interface IProps {
  id: number;
  value: string;
  isReadonly: boolean;
  setValue: (value: string, id: number) => void;
}

const AbcQuizCard: React.FC<IProps> = (props) => {
  const { id, value, isReadonly, setValue } = props;
  const classes = styles();
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleValue = React.useCallback(
    (value: string) => {
      setValue(value, id);
    },
    [setValue, id]
  );

  console.log(isReadonly);

  return (
    <React.Fragment>
      <Paper
        aria-disabled={!isReadonly}
        className={classes.card}
        elevation={3}
        onClick={toggleOpen}
      >
        <React.Fragment>{value.toLocaleUpperCase()}</React.Fragment>
      </Paper>
      <AbcQuizSolutionDialog
        value={value}
        open={open}
        setValue={handleValue}
        handleOpen={toggleOpen}
      />
    </React.Fragment>
  );
};

export default AbcQuizCard;
