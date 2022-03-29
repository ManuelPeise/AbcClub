import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const styles = makeStyles({
  pageTitleContainer: {
    display: "flex",
    position: "relative",
  },
  pageTitle: {
    padding: "2rem",
    color: "lightblue",
    textShadow: "1px 2px lightgray",
  },
});

interface IProps {
  title: string;
}

const PageTitleContainer: React.FC<IProps> = (props) => {
  const { title } = props;
  const classes = styles();

  return (
    <Grid container className={classes.pageTitleContainer}>
      <Typography variant="h4" className={classes.pageTitle}>
        {title}
      </Typography>
    </Grid>
  );
};

export default PageTitleContainer;
