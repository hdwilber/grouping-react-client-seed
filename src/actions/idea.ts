import { Action } from 'redux-actions';
import { IAppState } from '../states';
import { IdeaService } from '../services';

import {
  IIdea,
  IDEA_CREATE,
  IDEA_UPDATE,
  IDEA_GET,
  IDEA_GET_ALL,
  IDEA_DELETE,
  IDEA_DELETED,
  IDEA_CHANGED,
  IDEA_ERROR,
  IDEA_UPDATED_KEYWORD,
  IDEA_UNSET

} from '../states';

const ideaService = new IdeaService();

export function ideaUnSet() {
  return (dispatch, getState: () => any) => {
    dispatch( {
      type: IDEA_UNSET,
    })
  }
}
export function ideaSetSingle(idea) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    dispatch({
      type: IDEA_CHANGED,
      idea: idea
    });
  }
}


export function ideaGetAll() {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      ideaService.setSession(session);

      dispatch({
        type: IDEA_GET_ALL
      });

      ideaService.getAll()
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: IDEA_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch( {
          type: IDEA_CHANGED,
          list: data
        })
      })
      .catch(err => {
        dispatch( {
          type: IDEA_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}

export function ideaArchive(idea) {
  return (dispatch, getState: () => any) => {
    dispatch(ideaUpdate({...idea, archived: {status: true, since: Date.now()} } , 'remove'))
  }
}

export function ideaSave(idea) {
  return (dispatch, getState: () => any) => {
    dispatch(ideaUpdate(idea, 'replace_if'))
  }
}


export function ideaAddKeyword(idea, keyword) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      ideaService.setSession(session);
      ideaService.addKeyword(idea.id, keyword)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch({
            type: IDEA_ERROR,
            error: 0,
            message: 'Something went wrong'
          });
        }
      })
      .then ( data => {
        dispatch(ideaGet(idea.id, 'replace'))
      })
    }
  }
}

export function ideaPostComment(comment) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      ideaService.setSession(session);
      ideaService.postComment(comment)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch({
            type: IDEA_ERROR,
            error: 0,
            message: 'Something went wrong'
          });
        }
      })
      .then ( data => {
        if (data.default) {
        } else {
          dispatch(ideaGet(comment.ideaId, 'replace'))
        }
      })
    }
  }
}

export function ideaSetAgree(idea) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      ideaService.setSession(session);
      ideaService.setAgree(idea.id)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch({
            type: IDEA_ERROR,
            error: 0,
            message: 'Something went wrong'
          });
        }
      })
      .then ( data => {
        if (data.default) {
          console.log('You have alread y liked')
        } else {
          dispatch(ideaGet(idea.id, 'replace'))
        }
      })
    }
  }
}

export function ideaGet(id, method) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {
      ideaService.setSession(session);

      dispatch({
        type: IDEA_GET,
        userId: session.userId
      });

      ideaService.get(id)
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: IDEA_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch( {
          type: IDEA_CHANGED,
          idea: data,
          [method ? method : 'none']: true
        })
      })
      .catch(err => {
        dispatch( {
          type: IDEA_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}
export function ideaCreate(data) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session) {

      ideaService.setSession(session);

      dispatch({
        type: IDEA_CREATE,
        userId: session.userId,
      });

      ideaService.create({...data, userId: session.userId})
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: IDEA_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch(ideaGet(data.idea.id, 'replace_if'));
      })
      .catch(err => {
        dispatch( {
          type: IDEA_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}

export function ideaUpdate(data, method) {
  console.log("In update: ")
  console.log(data);
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session && !session.error) {
      ideaService.setSession(session);

      dispatch({
        type: IDEA_UPDATE
      });

      ideaService.update(data)
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: IDEA_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        console.log(data);
        dispatch(ideaGet(data.id, method))
      })
      .catch(err => {
        dispatch( {
          type: IDEA_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}

export function ideaDiscard(idea) {
  return (dispatch, getState: () => any) => {
    dispatch(ideaDelete(idea.id))
  }
}

export function ideaDelete(id) {
  return (dispatch, getState: () => any) => {
    const { session } = getState();
    if (session && !session.error) {
      ideaService.setSession(session);

      dispatch({
        type: IDEA_DELETE,
      });

      ideaService.delete(id)
      .then (res => {
        if (res.ok) {
          return res.json();
        } else {
          dispatch( {
            type: IDEA_ERROR,
            code: 0,
            message: "something went wrong in response"
          })
          return null;
        }
      })
      .then( data => {
        dispatch( {
          type: IDEA_DELETED,
          id: id
        })
      })
      .catch(err => {
        dispatch( {
          type: IDEA_ERROR,
          code: 0,
          message: err.message
        })
      });

    }
  }
}
