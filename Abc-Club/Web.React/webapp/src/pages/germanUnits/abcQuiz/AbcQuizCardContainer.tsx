import { Grid } from "@material-ui/core";
import React from "react";
import AbcQuizCard from "./AbcQuizCard";

interface IProps {
  items: string[];
  isHelper?: boolean;
  handleValue: (value: string, id: number) => void;
}

const CardContainer: React.FC<IProps> = (props) => {
  const { items, isHelper, handleValue } = props;

  const context = React.useMemo(() => {
    return (
      <Grid
        style={{
          width: "60vw",
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
                <AbcQuizCard
                  id={index}
                  key={index}
                  isReadonly={item === ""}
                  value={item}
                  setValue={handleValue}
                />
              );
            }
            return null;
          })}
        </Grid>
        <Grid container justifyContent="center" wrap="wrap">
          {items.map((item, index) => {
            if (index > 12) {
              return (
                <AbcQuizCard
                  id={index}
                  key={index}
                  isReadonly={item === ""}
                  value={item}
                  setValue={handleValue}
                />
              );
            }
            return null;
          })}
        </Grid>
      </Grid>
    );
  }, [items, isHelper, handleValue]);

  return <React.Fragment>{context}</React.Fragment>;
};

export default CardContainer;
