import React, { CSSProperties } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Grid,
} from "@material-ui/core";
import { INumberchaosUnitResult } from "../../../interfaces/IUnitResult";
import CardContainer from "../../../components/dragNDrop/CardContainer";
import {
  SentimentVeryDissatisfiedOutlined,
  SentimentDissatisfiedOutlined,
} from "@material-ui/icons";

const cardStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: ".5rem",
  width: "2rem",
  height: "2rem",
};

const iconStyle: CSSProperties = {
  width: "6rem",
  height: "6rem",
};

interface IProps {
  dialogOpen: boolean;
  result: INumberchaosUnitResult;
  saveResult: () => Promise<void>;
}

const NumberchaosResultDialog: React.FC<IProps> = (props) => {
  const { dialogOpen, result, saveResult } = props;
  const [open, setOpen] = React.useState<boolean>(dialogOpen);

  const successfulResult =
    JSON.stringify(result.result) === JSON.stringify(result.solution);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSaveAndCloseDialog = React.useCallback(async () => {
    await saveResult();
    handleClose();
  }, [saveResult, handleClose]);

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle color="primary">Testergebnis</DialogTitle>
      <DialogContent>
        <Grid container>
          {result.result.map((item, index) => {
            const style =
              item === result.solution[index]
                ? { ...cardStyle, backgroundColor: "green" }
                : { ...cardStyle, backgroundColor: "red" };

            return (
              <CardContainer
                id={index}
                key={index}
                value={item}
                style={style}
              />
            );
          })}
        </Grid>
        <Grid
          container
          style={{ padding: "2rem" }}
          justifyContent="center"
          spacing={2}
          alignContent="center"
        >
          {successfulResult && (
            <SentimentVeryDissatisfiedOutlined
              style={{ ...iconStyle, color: "green" }}
            />
          )}
          {!successfulResult && (
            <SentimentDissatisfiedOutlined
              style={{ ...iconStyle, color: "red" }}
            />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveAndCloseDialog}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NumberchaosResultDialog;
