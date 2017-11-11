import { Profile, Session } from './session';
import { Listable, createActions, defaultActions } from './listable';

export class Group implements Listable {
  id: string;
  created: Date;
  name: string;
  description: string;
  owner: Profile;
  boards: Array<any>;
  people: Array<Profile>;
}

export const ACTIONS = createActions('Group', '/', defaultActions.concat(['invite', 'enter']));

export type GROUP_INVITE = {
  people: Array<string>;
};

export type GROUP_ENTER = {
  session: Session;
};
