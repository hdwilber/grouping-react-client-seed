import { Group } from './group'
import { Profile } from './session';
import { Listable, createActions, defaultActions } from './listable';

export class Board implements Listable {
  id: string;
  created: Date;
  name: string;
  description: string;
  group: Group;
  owner: Profile;
  people: Array<Profile>;
}

export const ACTIONS = createActions('Board', '/', defaultActions);
