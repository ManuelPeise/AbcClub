export interface IListItem {
  key: number;
  value: any;
  textAccessor?: () => string;
}
