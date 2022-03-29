import { IAppState } from "../interfaces/IAppState";
import { IUserData } from "../interfaces/IUserData";
import { Action, SET_USERDATA } from "./actionTypes";

const initialState: IAppState = {
  userData: {} as IUserData,
};

const appStateReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default appStateReducer;
