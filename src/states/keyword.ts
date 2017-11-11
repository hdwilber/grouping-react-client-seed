export const KEYWORD_CREATE = 'Keyword/CREATE';
export const KEYWORD_GET = 'Keyword/GET';
export const KEYWORD_GET_ALL = 'Keyword/GET_ALL';
export const KEYWORD_UPDATE = 'Keyword/UPDATE';
export const KEYWORD_REMOVE = 'Keyword/REMOVE';
export const KEYWORD_CHANGED = 'Keyword/CHANGED';
export const KEYWORD_ERROR = 'Keyword/ERROR';
export const KEYWORD_REMOVED = 'Keyword/REMOVED';

export interface Keyword {
  id: string;
  name: string;
  description: string;
}

export interface IKeyword {
  list: Array<any>;
  single: Keyword;
  error: any;
}

export const KEYWORD_DEFAULT: IKeyword = null;

export interface KEYWORD_CHANGED {
  list?: Array<Keyword>;
  single?: Keyword;
};

export interface KEYWORD_ERROR {
  code: number;
  message: string;
};

export interface KEYWORD_CREATE {
};
export interface KEYWORD_UPDATE {
};
export interface KEYWORD_GET{
  single: Keyword;
};
export interface KEYWORD_GET_ALL{
  list: Array<Keyword>;
}

