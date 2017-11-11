import { combineReducers } from 'redux';
import { handleActions, Action } from 'redux-actions';

import {
  createActions, 
  createOperations,
  ILISTABLE_DEFAULT,

  LISTABLE_GET_ALL,
  LISTABLE_GET,
  LISTABLE_UNSET,
  LISTABLE_SET,
  LISTABLE_CHANGED,
  LISTABLE_ERROR,
  LISTABLE_CURRENT_DELETED,
  LISTABLE_ALL_DELETED,
  IListable,

} from '../states/listable';

export function createListableReducer(type, actions, extraReducers, extraFunc) {
  const CHANGE_OPTIONS = createOperations(null);

  const listableReducer = handleActions<IListable, any>( {
    [actions.SET]: (state: IListable, action: Action<LISTABLE_SET>): IListable => {
      return {
        ...state,
        current: action.current
      }
    },
    [actions.UNSET]: (state: IListable, action: Action<LISTABLE_UNSET>): IListable => {
      return {
        ...state,
        current: null
      }
    },
    [actions.CHANGED]: (state: IListable, action: Action<LISTABLE_CHANGED>): IListable => {
      const { current , list } = action;
      const { func } = action;

      if ( list ) {
        const newState = {
          ...state, 
          list: list || [],
          error: null
        }

        if (extraFunc) 
          extraFunc(action, newState)

        return newState;
      }

      const newState = {
        ...state,
        current: current,
        list: ( () => {
          if (action[CHANGE_OPTIONS.REPLACE]) {
            return state.list.map( e => (e.id === current.id ? current: e));
          } else if (action[CHANGE_OPTIONS.PUSH]) {
            console.log('Aqui: PUSH')
            return state.list.concat([current]); 
          }
          else if (action[CHANGE_OPTIONS.REMOVE]) {
            console.log('Aqui: REMOVE')
            return state.list.filter( e => e.id !== current.id )
          } else {
            return state.list;
          }
        }
        )(),
        error: null
      }

      if (extraFunc) 
        extraFunc (action, newState);
      return newState; 
    },

    [actions.CURRENT_DELETED]: (state: IListable, action: Action<LISTABLE_CURRENT_DELETED>): IListable => {
      const { current } = state;
      const newState = {
        ...state, 
        current: null,
        list: state.list.filter( e => e.id !== current.id )
      };

      if (extraFunc) 
        extraFunc (action, newState);

      return newState;
    },

    [actions.ERROR]: (state: IListable, action: Action<LISTABLE_ERROR>): IListable => {
      return {
        ...state,
        error: {
          code: action.code,
          message: action.message
        }
      }
    },
  }, ILISTABLE_DEFAULT);

  return listableReducer;
}
