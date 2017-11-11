import { handleActions, Action } from 'redux-actions';
import { 
  IIdea,
  IDEA_UNSET,
  IDEA_CREATE,
  IDEA_UPDATE,
  IDEA_GET,
  IDEA_GET_ALL,
  IDEA_CHANGED,
  IDEA_DELETED,
  IDEA_UPDATED_KEYWORD,
  IDEA_ERROR, 
  IDEA_DEFAULT,

} from './../states'

export const ideaReducer = handleActions<IIdea, any>({
  [IDEA_CREATE]: (state: IIdea, action: Action<IDEA_CREATE>) : IIdea => {
    return {
      ...state
    }
  },
  [IDEA_UPDATE]: (state: IIdea, action: Action<IDEA_UPDATE>): IIdea => {
    return {
      ...state
    }
  },
  [IDEA_UNSET]: (state: IIdea, action: Action<IDEA_UNSET>): IIdea => {
    return { 
    ...state,
    single: null
    }
  },
  [IDEA_ERROR]: (state: IIdea, action: Action<IDEA_ERROR>): IIdea => {
    return {
      ...state,
      error: {
        code: action.code,
        message: action.message
      }
    }
  },
  [IDEA_CHANGED]: (state: IIdea, action: Action<IDEA_CHANGED>): IIdea => {
    const { idea } = action;
    if (action.list) {
      return {
        ...state,
        list: action.list ? action.list : [],
        error: null
      }
    }

    return {
      ...state,
      single: idea,
      list: ( () => 
        { 
          if (action.replace_if) {
            if (idea.published) {
              const idx = state.list.findIndex( e=> e.id === idea.id );
              if (idx === -1) {
                return state.list.concat([idea])
              } else {
                return state.list.map( e => (e.id === idea.id ? idea : e));
              }
            } else {
              return state.list;
            }
          }
          if (action.replace) {
            return state.list.map( e => (e.id === idea.id ? idea : e));
          } else if (action.concat) {
            return state.list.concat([idea]); 
          }
          else if (action.remove) {
            return state.list.filter( e => e.id !== idea.id )
          } else {
            return state.list;
          }
        })(),
      error: null
    }
  },
  [IDEA_GET_ALL]: (state: IIdea, action: Action<IDEA_GET>): IIdea => {
    return {
      ...state, 
    }
  },
  [IDEA_GET]: (state: IIdea, action: Action<IDEA_GET>): IIdea => {
    return {
      ...state, 
    }
  },
  [IDEA_DELETED]: (state: IIdea, action: Action<IDEA_GET>): IIdea => {

    const { single } = state;
    const id = action.id;

    return {
      ...state, 
      single: (single && single.id === id) ? null : single,
      list: state.list.filter( e => e.id !== id )
    }
  },
  [IDEA_UPDATED_KEYWORD]: (state: IIdea, action: Action<IDEA_GET>): IIdea => {
    const { single, list} = state;
    const { idea, keyword } = action;

    if (single) {
      const newSingle = {
        ...single,
        keywords: single.keywords.filter(k => k.id !== keyword.id )
      };
      return {
        ...state,
        single: newSingle,
        list: (list) ? list.map( e => (e.id === idea.id ? newSingle : e)): list
      }
    }
    return {
      ...state,
    }
  },

}, IDEA_DEFAULT);


