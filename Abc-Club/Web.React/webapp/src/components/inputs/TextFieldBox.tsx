import React from "react";
import { TextField, InputProps } from "@material-ui/core";

interface IProps extends InputProps {
  onValueChanged: (value: string, id?: number) => void;
}

const TextFieldBox: React.FC<IProps> = (props) => {
  const { onValueChanged } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = props.id !== undefined ? parseInt(props.id) : undefined;
      onValueChanged(e.currentTarget.value, id);
    },
    [props.id, onValueChanged]
  );

  return (
    <TextField
      type={props.type}
      disabled={props.disabled}
      inputProps={props.inputProps}
      InputProps={{ endAdornment: props.endAdornment }}
      onChange={handleChange}
    />
  );
};

export default TextFieldBox;
