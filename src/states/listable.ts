export const defaultActions = [
  'create', 
  'restore',
  'get',
  'get_all',
  'set',
  'unset', 
  'changed',
  'current_deleted',
  'all_deleted',
  'error'
];

export const defaultOperations = [ 'replace', 'push', 'remove' ]

export function createActions ( type, sep = '/', list) {
  if (!list) { list = defaultActions };
  return list.reduce( (acc, cur, i) => {
    acc[cur.toUpperCase()] = type + sep + cur.toUpperCase();
    return acc;
  }, {});
}

export function createOperations (list) {
  if (!list) {
    list = defaultOperations 
  };

  return list.reduce( (acc, cur, i) => {
    acc[cur.toUpperCase()] = cur
    return acc;
  }, {});
};

export interface Listable {
  id: string;
};

export interface IListable {
  current: Listable;
  list: Array<Listable>;
  error: any;
};

export type LISTABLE_GET_ALL = {
  list: Array<Listable>;
}
export type LISTABLE_GET = {
  current: Listable;
}
export type LISTABLE_UNSET = {
};

export type LISTABLE_SET = {
  current: Listable;
};

export type LISTABLE_CHANGED = {
  current?: Listable;
  list?: Listable;
}

export type LISTABLE_ERROR = {
  code: number;
  message: string;
}

export type LISTABLE_CURRENT_DELETED  = {
};

export type LISTABLE_ALL_DELETED  = {
};

export const ILISTABLE_DEFAULT: IListable = {
  current: null,
  list: [],
  error: null
};
