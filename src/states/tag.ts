export const KEYWORD_CREATE = 'Tag/CREATE';
export const KEYWORD_GET = 'Tag/GET';
export const KEYWORD_GET_ALL = 'Tag/GET_ALL';
export const KEYWORD_CHANGED = 'Tag/CHANGED';
export const KEYWORD_ERROR = 'Tag/ERROR';
export const KEYWORD_REMOVED = 'Tag/REMOVED';

export interface IKeyword{
  id: string;
  label: string;
  description: string;
  error: any;
  list: Array<any>;
};


export const KEYWORD_DEFAULT: IKeyword = null;

export interface KEYWORD_CHANGED {
  id: string;
  label: string;
  description: string;
  list?: Array<string>;
}

export interface KEYWORD_ERROR {
  code: number;
  message: string;
};

export interface KEYWORD_CREATE {
};
export interface KEYWORD_UPDATE {
};
export interface KEYWORD_GET{
};
export interface KEYWORD_GET_ALL{
  list: Array<any>;
}

