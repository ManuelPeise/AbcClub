// keep in sync with 'Shared.Models.UserDataModel'
export interface IUserData {
  id: number;
  username: string;
  name: string;
  firstname: string;
  email?: string;
  isTeacher: boolean;
  password?: string;
  salt?: string;
}
