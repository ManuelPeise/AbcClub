import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import AbcClubAppBar from "../components/appbar/Appbar";
import SideMenu from "../components/sideMenu/SideMenu";
import useApi from "../hooks/useApi";
import { IAppState } from "../interfaces/IAppState";
import { IUserData } from "../interfaces/IUserData";
import apiConfig from "../lib/apiConfig.json";

interface IProps {}

const PageLayout: React.FC<IProps> = (props) => {
  const { children } = props;
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const userData =
    useSelector<IAppState, IUserData>((state) => state.userData) ??
    ({} as IUserData);

  const toggleMenuOpen = React.useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const userService = useApi<IUserData>({
    serviceUrl: `${apiConfig.baseUrl}${apiConfig.userService.getUsers}`,
    method: "GET",
  });

  if (!userService.dataIsBound) {
    return null;
  }

  return (
    <Grid
      container
      style={{ overflow: "hidden" }}
      direction="row"
      justifyContent="center"
    >
      <Grid container>
        <AbcClubAppBar
          userDataCollection={userService.items}
          userData={userData}
          toggleMenuOpen={toggleMenuOpen}
        />
      </Grid>
      <Grid container>
        <Grid item>
          {userData?.id !== undefined && (
            <SideMenu open={menuOpen} toggleOpen={toggleMenuOpen} />
          )}
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default PageLayout;
