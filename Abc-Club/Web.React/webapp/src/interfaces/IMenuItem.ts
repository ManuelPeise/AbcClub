import React from "react";

export interface IMenuItem {
  title: string;
  subTitle: string;
  route: string;
  component?: React.FC;
  subMenu?: IMenuItem[];
}
