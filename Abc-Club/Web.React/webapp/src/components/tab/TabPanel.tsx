import { Paper } from "@material-ui/core";
import React from "react";

interface IProps {
  value: number;
  selectedValue: number;
}

const TabPanel: React.FC<IProps> = (props) => {
  const { value, selectedValue, children } = props;

  return (
    <Paper hidden={value !== selectedValue} elevation={3}>
      {children}
    </Paper>
  );
};

export default TabPanel;
