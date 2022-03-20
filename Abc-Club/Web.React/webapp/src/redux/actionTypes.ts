import { IUserData } from "../interfaces/IUserData"

export const SET_USERDATA = 'SETUSERDATA'

export interface SetUserData  {
   type: typeof SET_USERDATA,
   payload: IUserData
}

export type Action = SetUserData