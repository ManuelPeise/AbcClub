import { Card } from "@material-ui/core";
import React, { CSSProperties } from "react";

interface IProps {
  value: any;
  id: any;
  style: CSSProperties;
}

const CardContainer: React.FC<IProps> = (props) => {
  const { value, id, style } = props;

  return (
    <Card id={id} style={style}>
      {value}
    </Card>
  );
};

export default CardContainer;
