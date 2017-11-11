import { Session } from '../states/session';
import { SERVER, RestService } from './common';

const PATHNAME = 'Invitations';

export class InvitationService extends RestService {
  check(code) {
    if (code) {
      return fetch(
        `${SERVER}/${PATHNAME}/${code}/check`,
        {
          headers: this.createHeaders(),
          method: 'GET'
        }
      );
    }
  }
}
