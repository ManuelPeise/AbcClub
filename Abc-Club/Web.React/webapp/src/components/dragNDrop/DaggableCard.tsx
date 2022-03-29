import { Paper } from "@material-ui/core";
import React, { CSSProperties } from "react";

interface IProps {
  id: string;
  style: CSSProperties;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

const DraggableCard: React.FC<IProps> = (props) => {
  const { id, children, style, handleDragStart } = props;

  return (
    <Paper
      elevation={3}
      id={id}
      style={style}
      draggable
      onDragStart={handleDragStart}
    >
      {children}
    </Paper>
  );
};

export default DraggableCard;
