import { handleActions, Action } from 'redux-actions';
import { IAppState} from '../states';

import { PAGE_LOAD , APP_DEFAULT_STATE } from '../states'

export const appReducer = handleActions<IAppState, any>({
  [PAGE_LOAD]: (state: IAppState, action: Action<PAGE_LOAD>): IAppState => {
    console.log(state); 
    return {
    ...state, 
    page: action.payload.page, 
    isLoading: action.payload.isLoading
  }}
}, APP_DEFAULT_STATE);


