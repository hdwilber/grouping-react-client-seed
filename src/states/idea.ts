export const IDEA_CREATE = 'Idea/CREATE';
export const IDEA_GET = 'Idea/GET';
export const IDEA_GET_ALL = 'Idea/GET_ALL';
export const IDEA_UPDATE = 'Idea/UPDATE';
export const IDEA_DELETE = 'Idea/DELETE';
export const IDEA_CHANGED = 'Idea/CHANGED';
export const IDEA_ERROR = 'Idea/ERROR';
export const IDEA_DELETED = 'Idea/DELETED';
export const IDEA_UNSET='Idea/UNSET';

export const IDEA_UPDATED_KEYWORD = 'Idea/UPDATED_KEYWORD';

export interface IIdea {
  single: Idea;
  list: Array<any>;
  error: any;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  userId: string;
  author: any;
  keywords: Array<any>;
  messages: Array<any>;
  agrees: Array<any>;
}

export const IDEA_DEFAULT: IIdea = {
  single: null,
  list: [],
  error: null
}

export interface IDEA_CHANGED {
  idea?: Idea;
  list?: Array<string>;
};

export interface IDEA_ERROR {
  code: number;
  message: string;
};

export interface IDEA_CREATE {
};
export interface IDEA_UPDATE {
};
export interface IDEA_UNSET {
};
export interface IDEA_GET{
  idea: Idea;
};
export interface IDEA_GET_ALL{
  list: Array<any>;
}

export interface IComment {
  id: string;
  replyTo: any;
  body: string;
  list: Array<any>;
  error: any;
}

export interface Comment {
  id: string;
  replyTo: any;
  body: string;
  userId: string;
  ideaId: string;
}
