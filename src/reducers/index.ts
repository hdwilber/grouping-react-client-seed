import { combineReducers } from 'redux';

import {appReducer} from './app';
import {sessionReducer} from './session';
import {ideaReducer} from './idea';
import { keywordReducer } from './keyword';
import { groupReducer } from './group';
import { boardReducer } from './board';

export default combineReducers<any>({
  app: appReducer,
  session: sessionReducer,
  idea: ideaReducer, 
  keyword: keywordReducer,
  board: boardReducer, 
  group: groupReducer
});

