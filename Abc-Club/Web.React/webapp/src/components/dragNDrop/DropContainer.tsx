import { Paper } from "@material-ui/core";
import React, { CSSProperties } from "react";

interface IProps {
  id: string;
  style: CSSProperties;
  className: string;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleAllowDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

const DropContainer: React.FC<IProps> = (props) => {
  const {
    id,
    children,
    style,
    className,
    handleDrop,
    handleAllowDrop,
    handleDragStart,
  } = props;

  return (
    <Paper
      elevation={2}
      className={className}
      id={id}
      style={style}
      draggable
      onDragOver={handleAllowDrop}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
    >
      {children}
    </Paper>
  );
};

export default DropContainer;
