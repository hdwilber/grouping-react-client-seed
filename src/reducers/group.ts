import { combineReducers } from 'redux';
import { handleActions, Action } from 'redux-actions';

import { createListableReducer } from './listable';
import { ACTIONS  } from './../states/group';

export const groupReducer = createListableReducer('Group', ACTIONS, null, (action, newState ) => {} );
