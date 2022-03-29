import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { IListItem } from "../../interfaces/IListItem";
import { IUserData } from "../../interfaces/IUserData";
import { setUserData } from "../../redux/storeAccessor";
import DropDown from "../inputs/Dropdown";
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = makeStyles({
  root: {
    display: "flex",
    position: "relative",
    height: "auto",
    maxHeight: "6rem",
  },
  container: {
    display: "inerhit",
    alignContent: "baseline",
    padding: "1rem",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  title: {
    padding: "1rem",
  },
  dropDownContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  icon: {
    width: "2rem",
    height: "2rem",
    color: "white",
    "&:hover": {
      color: "lightgray",
    },
  },
});

interface IProps {
  userDataCollection: IUserData[];
  userData: IUserData;
  toggleMenuOpen: () => void;
}

const AbcClubAppBar: React.FC<IProps> = (props) => {
  const { userDataCollection, userData, toggleMenuOpen } = props;
  const dispatch = useDispatch();

  const classes = styles();

  const userItems = React.useMemo(() => {
    const items: IListItem[] = [{ key: -1, value: "Bitte wählen" }];

    userDataCollection?.forEach((data) => {
      items.push({ key: data.id, value: data.username });
    });

    return items;
  }, [userDataCollection]);

  const setUser = React.useCallback(
    (id: number) => {
      const data =
        userDataCollection.find((x) => x.id === id) ?? ({} as IUserData);
      dispatch(setUserData(data));
    },
    [userDataCollection, dispatch]
  );

  const selectedItem = React.useMemo((): IListItem => {
    return {
      key: userData.id,
      value: userData.username,
    };
  }, [userData.id, userData.username]);

  return (
    <AppBar className={classes.root} color="primary">
      <Toolbar>
        <Grid className={classes.container} container>
          <Grid className={classes.titleContainer} item xs={6}>
            <Grid container>
              <IconButton onClick={toggleMenuOpen}>
                <Menu className={classes.icon} />
              </IconButton>
              <Link to="/" className={classes.link}>
                <Typography variant="h5" className={classes.title}>
                  Abc - Club
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid className={classes.dropDownContainer} item xs={6}>
            <DropDown
              items={userItems}
              selectedItem={selectedItem}
              onHandleChange={setUser}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AbcClubAppBar;
