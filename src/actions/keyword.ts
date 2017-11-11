import { Action } from 'redux-actions';
import {
  IKeyword, 
  KEYWORD_CREATE,
  KEYWORD_UPDATE,
  KEYWORD_GET,
  KEYWORD_GET_ALL,
  KEYWORD_REMOVE, 
  KEYWORD_REMOVED,
  KEYWORD_CHANGED,
  KEYWORD_ERROR

} from '../states';
import { KeywordService } from '../services';

const keywordService = new KeywordService();

export function keywordGetAll() {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      keywordService.setSession(session);

      dispatch({
        type: KEYWORD_GET_ALL
      });

      keywordService.getAll()
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: KEYWORD_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch( {
          type: KEYWORD_CHANGED,
          list: data
        })
      })
      .catch(err => {
        dispatch( {
          type: KEYWORD_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}

export function keywordGet(id, method) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      keywordService.setSession(session);

      dispatch({
        type: KEYWORD_GET,
        userId: session.userId
      });

      keywordService.get(id)
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: KEYWORD_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        console.log(data);
        dispatch( {
          type: KEYWORD_CHANGED,
          keyword: data,
          [method ? method : 'none']: true
        })
      })
      .catch(err => {
        dispatch( {
          type: KEYWORD_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}

export function keywordCreate(data) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {

      keywordService.setSession(session);

      dispatch({
        type: KEYWORD_CREATE,
      });

      keywordService.create({...data, userId: session.userId})
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: KEYWORD_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch ({
          type: KEYWORD_CHANGED,
          keyword: data,
          concat: true
        })
      })
      .catch(err => {
        dispatch( {
          type: KEYWORD_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}

