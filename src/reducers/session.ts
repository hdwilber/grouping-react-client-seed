import { combineReducers } from 'redux';
import { handleActions, Action } from 'redux-actions';

import { createListableReducer } from './listable';
import { ACTIONS} from  './../states/session';


const { APP_SESSION_NAME } = process.env;
export const sessionReducer  = createListableReducer('Session', ACTIONS, null, ( action, newState ) => {
  switch (action.type) {
    case ACTIONS.CHANGED: 
      const sessionStr = JSON.stringify(newState.list);
      localStorage.setItem(APP_SESSION_NAME, sessionStr);
      break;
  }
});

