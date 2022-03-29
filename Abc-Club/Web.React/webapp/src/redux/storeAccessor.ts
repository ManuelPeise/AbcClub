import { IAppState } from "../interfaces/IAppState";
import { IUserData } from "../interfaces/IUserData";
import { Action, SET_USERDATA } from "./actionTypes";

export const setUserData = (userData: IUserData): Action => {
  return {
    type: SET_USERDATA,
    payload: userData,
  };
};

export const mapStateToProps = (state: IAppState) => {
  return {
    userData: state.userData,
  };
};
