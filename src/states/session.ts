import { Listable, createActions, defaultActions } from './listable';
export interface Profile {
  id: string;
  email: string;
  displayName: string
  photoUrl: string;
  provider: string;
};

export class Session implements Listable {
  id: string;
  ttl: string;
  userId: string;
  profile: Profile;
  provider: string;
  error: any;
};

export const ACTIONS = createActions('Session', '/', defaultActions.concat(['START', 'RESTORE', 'END', 'END_ALL']));

export type SESSION_START = {
  provider: string;
};
export type SESSION_RESTORE = {
};

export type SESSION_END = {
};

export type SESSION_END_ALL = {
};
