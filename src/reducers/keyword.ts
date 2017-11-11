import { handleActions, Action } from 'redux-actions';
import {
  IKeyword, 
  KEYWORD_CREATE,
  KEYWORD_UPDATE,
  KEYWORD_GET,
  KEYWORD_GET_ALL,
  KEYWORD_REMOVE, 
  KEYWORD_REMOVED,
  KEYWORD_CHANGED,
  KEYWORD_ERROR,
  KEYWORD_DEFAULT

} from '../states';

export const keywordReducer = handleActions<IKeyword, any>({
  [KEYWORD_CREATE]: (state: IKeyword, action: Action<KEYWORD_CREATE>) : IKeyword => {
    return {
      ...state, 
    }
  },
  [KEYWORD_ERROR]: (state: IKeyword, action: Action<KEYWORD_ERROR>): IKeyword => {
    return {
      ...state,
      error: {
        code: action.code,
        message: action.message
      }
    }
  },
  [KEYWORD_CHANGED]: (state: IKeyword , action: Action<KEYWORD_CHANGED>): IKeyword=> {
    const { keyword } = action;
    if (action.list) {
      return {
        ...state,
        list: action.list ? action.list : [],
        error: null
      }
    }

    return {
      ...state,
      single: keyword,
      list: ( () => 
        { 
          if (action.replace) {
            return state.list.map( e => (e.id === keyword.id ? keyword: e));
          } else if (action.concat) {
            return state.list.concat([keyword]); 
          }
          else if (action.remove) {
            return state.list.filter( e => e.id !== keyword.id )
          } else {
            return state.list;
          }
        })(),
      error: null
    }
  },
  [KEYWORD_GET_ALL]: (state: IKeyword, action: Action<KEYWORD_GET>): IKeyword => {
    return {
      ...state, 
    }
  },
  [KEYWORD_GET]: (state: IKeyword, action: Action<KEYWORD_GET>): IKeyword=> {
    return {
      ...state, 
    }
  }
}, KEYWORD_DEFAULT);


