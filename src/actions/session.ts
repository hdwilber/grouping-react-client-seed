import { Action } from 'redux-actions';
import hello from 'hellojs';
import { SessionService } from '../services/session';

import { Session, ACTIONS,
  SESSION_START,
  SESSION_END,
  SESSION_END_ALL,
  SESSION_RESTORE
} from './../states/session';
import { 
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



console.log(process.env);
const { API_ENDPOINT_URL, APP_SESSION_NAME, FACEBOOK_CLIENT_ID, GOOGLE_CLIENT_ID } = process.env;

export const PROVIDERS = [{
    name: 'facebook',
    clientId: FACEBOOK_CLIENT_ID
  },
  {
    name: 'google', 
    clientId: GOOGLE_CLIENT_ID
  }
];

var provs = {};

PROVIDERS.forEach(p => {provs[p.name] = p.clientId});
console.log(ACTIONS);

hello.init(provs);

const sessionService = new SessionService();

export function sessionStart (provider: string, data: any) {
  return (dispatch, getState: () => IListable) => {
    dispatch({
      type: ACTIONS.START,
      provider: provider
    } as Action<SESSION_START>);

    if (provider !== 'email') {
      hello(provider).login({
        scope: 'email'
        }).then(function() {
          const auth = hello(provider).getAuthResponse()
          console.log(auth);
          let body = {
            provider: provider,
            token: auth.access_token
          };
          sessionService.check(body)
          .then(body => body.json())
          .then(data => {

            dispatch({
              type: ACTIONS.CHANGED,
              current: data,
              push: true
            } as Action<LISTABLE_CHANGED>);
          })
          .catch(error => {
            dispatch({
              type: ACTIONS.ERROR,
              code: 1,
              message: error.message,
            } as Action<LISTABLE_ERROR>);
          });
      });
    } else {
      sessionService.start(data)
      .then(body => body.json())
      .then(data => {

        dispatch({
          type: ACTIONS.CHANGED,
          current: data,
          push: true
        } as Action<LISTABLE_CHANGED>);
      }
      , error => {
        dispatch({
          type: ACTIONS.ERROR,
          code: 1,
          message: error.message,
        } as Action<LISTABLE_ERROR>);
      });
    }
  }
}


export function sessionRestore() {
  return (dispatch, getState: () => IListable) => {
    dispatch({
      type: ACTIONS.RESTORE
    } as Action<SESSION_RESTORE>);

    const list = getSession();

    if (list) {
      dispatch( {
        type: ACTIONS.CHANGED,
        list: list,
      } as Action<LISTABLE_CHANGED>);
    } else {
      dispatch( {
        type: ACTIONS.ERROR,
        code: 0,
        message: 'There is not saved session to restore'
      } as Action<LISTABLE_ERROR>);
    }
  }
}

export function sessionEndAll () {
  return (dispatch, getState: () => IListable) => {
    dispatch({
      type: ACTIONS.END_ALL,
      current: null
    } as Action<SESSION_END_ALL>);

    dispatch( {
      type: ACTIONS.ALL_DELETED,
    } as Action<LISTABLE_ALL_DELETED>);
  }
}

export function sessionUnSet () {
  return (dispatch, getState: () => IListable) => {
    return dispatch({
      type: ACTIONS.UNSET,
    } as Action<LISTABLE_UNSET>);
  }
}

export function sessionSet (session) {
  return (dispatch, getState: () => IListable) => {
    dispatch({
      type: ACTIONS.SET,
      current: session
    } as Action<LISTABLE_SET>);
  }
}
export function sessionEnd () {
  return (dispatch, getState: () => IListable) => {
    dispatch({
      type: ACTIONS.END,
      current: null
    } as Action<SESSION_END>);

    dispatch( {
      type: ACTIONS.LISTABLE_CURRENT_DELETED
    } as Action<LISTABLE_CURRENT_DELETED>);
  }
}

function setSession(list: Array<any>) {
  let sessionStr = JSON.stringify(list);
  localStorage.setItem(APP_SESSION_NAME, sessionStr);
}

function getSession() {
  return JSON.parse(localStorage.getItem(APP_SESSION_NAME));
}

function removeSession () {
  localStorage.removeItem(APP_SESSION_NAME);
}
