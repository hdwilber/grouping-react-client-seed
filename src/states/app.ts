export interface IAppState {
  isLoading: boolean;
  page: string;
}

export const PAGE_LOAD = 'App/PAGE_LOAD';
export type PAGE_LOAD = {
  isLoading: boolean;
  page: string;
};

export const APP_DEFAULT_STATE: IAppState = {
  isLoading: true,
  page: 'root'
};

