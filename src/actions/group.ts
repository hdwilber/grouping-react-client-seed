import { Action } from 'redux-actions';
import { Group, ACTIONS,
  GROUP_INVITE,
  GROUP_ENTER,
} from './../states/group';
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
import  { GroupService } from './../services/group'

const groupService = new GroupService();

export function groupGetAll() {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session.current) {
      groupService.setSession(session.current);

      dispatch({
        type: ACTIONS.GET_ALL
      });

      groupService.getAll()
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: ACTIONS.ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch( {
          type: ACTIONS.CHANGED,
          list: data
        })
      })
      .catch(err => {
        dispatch( {
          type: ACTIONS.ERROR,
          code: 0,
          message: err.message
        })
      });
    }
  }
}

export function groupGet(id) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session.current) {
      groupService.setSession(session.current);

      dispatch({
        type: ACTIONS.GET
      });

      console.log('calling gruop service GET current')
      groupService.get(id)
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: ACTIONS.ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch( {
          type: ACTIONS.CHANGED,
          current: data,
          replace: true
        })
      })
      .catch(err => {
        console.log(err);
        dispatch( {
          type: ACTIONS.ERROR,
          code: 0,
          message: err.message
        })
      });
    }
  }
}
