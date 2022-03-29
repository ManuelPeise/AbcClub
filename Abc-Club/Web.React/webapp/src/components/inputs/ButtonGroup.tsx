import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles({
  btnGrpContainer: {
    display: "flex",
    position: "relative",
    padding: "2rem",
    justifyContent: "flex-end",
  },
});

interface IProps {
  hasSaveBtn: boolean;
  saveBtnValue: string;
  hasCancelBtn: boolean;
  saveDisabled: boolean;
  handleClick: () => void;
  handleCancel?: () => void;
}

const ButtonGroup: React.FC<IProps> = (props) => {
  const {
    hasCancelBtn,
    hasSaveBtn,
    saveBtnValue,
    saveDisabled,
    handleClick,
    handleCancel,
  } = props;
  const classes = styles();

  return (
    <Grid container className={classes.btnGrpContainer}>
      {hasCancelBtn && (
        <Button disabled={!saveDisabled} onClick={handleCancel}>
          Abbrechen
        </Button>
      )}
      {hasSaveBtn && (
        <Button disabled={saveDisabled} onClick={handleClick}>
          {saveBtnValue}
        </Button>
      )}
    </Grid>
  );
};

export default ButtonGroup;
