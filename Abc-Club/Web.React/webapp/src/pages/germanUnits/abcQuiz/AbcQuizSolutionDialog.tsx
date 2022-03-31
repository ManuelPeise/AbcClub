import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputProps,
  Typography,
} from "@material-ui/core";
import React from "react";
import TextFieldBox from "../../../components/inputs/TextFieldBox";

interface IProps {
  open: boolean;
  value: string;
  handleOpen: () => void;
  setValue: (value: string) => void;
}

const AbcQuizSolutionDialog: React.FC<IProps> = (props) => {
  const { open, value, handleOpen, setValue } = props;

  const handleSolution = React.useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const inputProps = React.useMemo((): InputProps => {
    return {
      disabled: value !== "",
      value: value,
      type: "text",
      inputProps: { max: 1 },
    };
  }, [value]);

  return (
    <Dialog keepMounted open={open}>
      <DialogTitle>
        <Typography>ABC-Quiz - Lösen</Typography>
      </DialogTitle>
      <DialogContent>
        <TextFieldBox {...inputProps} onValueChanged={setValue} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSolution}>Lösen</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AbcQuizSolutionDialog;
