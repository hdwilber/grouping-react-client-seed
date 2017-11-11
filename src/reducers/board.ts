import { combineReducers } from 'redux';
import { handleActions, Action } from 'redux-actions';

import { createListableReducer } from './listable';
import { ACTIONS } from  './../states/board';

export const boardReducer = createListableReducer('Board', ACTIONS, null, (action, newState) => {});
