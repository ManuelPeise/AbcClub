import { Grid } from "@material-ui/core";
import React from "react";
import AbcQuizCard from "./AbcQuizCard";

interface IProps {
  title: string;
  isReadOnly: boolean;
  items: string[];
  isHelper?: boolean;
}

const CardContainer: React.FC<IProps> = (props) => {
  const { title, isReadOnly, items, isHelper } = props;

  return (
    <React.Fragment>
      <Grid
        style={{
          width: "60vw",
          //   margin: "2rem",
          backgroundColor: isHelper ? "lightgray" : "",
        }}
        container
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
      >
        <Grid container justifyContent="center" alignItems="center" wrap="wrap">
          {items.map((item, index) => {
            if (index < 13) {
              return (
                <AbcQuizCard key={index} isReadonly={isReadOnly} value={item} />
              );
            }
          })}
        </Grid>
        <Grid container justifyContent="center" wrap="wrap">
          {items.map((item, index) => {
            if (index > 12) {
              return (
                <AbcQuizCard key={index} isReadonly={isReadOnly} value={item} />
              );
            }
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CardContainer;
