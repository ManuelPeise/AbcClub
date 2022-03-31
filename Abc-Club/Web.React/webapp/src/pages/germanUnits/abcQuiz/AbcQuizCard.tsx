import { Card, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid lightgray",
    boxShadow: "2px 3px lightgray",
    margin: ".5rem",
    padding: ".5rem",
    width: "3rem",
    height: "3rem",
  },
});

interface IProps {
  value: string;
  isReadonly: boolean;
}

const AbcQuizCard: React.FC<IProps> = (props) => {
  const { value, isReadonly } = props;
  const classes = styles();
  const [readonly, setReadOnly] = React.useState<boolean>(isReadonly);

  return <Card className={classes.card}>{value}</Card>;
};

export default AbcQuizCard;
