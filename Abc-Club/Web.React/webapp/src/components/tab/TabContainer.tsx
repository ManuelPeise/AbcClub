import React from "react";
import { Box, Tabs } from "@material-ui/core";

interface IProps {
  tabPages: JSX.Element[];
  tabs: JSX.Element[];
  selectedValue: number;
  width?: string;
  onChange: (e: React.ChangeEvent<{}>, value: number) => void;
}

const TabContainer: React.FC<IProps> = (props) => {
  const { tabs, tabPages, selectedValue, width, onChange } = props;

  return (
    <Box sx={{ width: width ?? "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedValue} onChange={onChange}>
          {tabs.map((tab) => {
            return tab;
          })}
        </Tabs>
      </Box>
      {tabPages.map((page) => {
        return page;
      })}
    </Box>
  );
};

export default TabContainer;
