import { Session } from '../states/session';
import { SERVER, RestService } from './common';

const PATHNAME = 'users';

export class SessionService extends RestService {

  start(data) {
    if (data) {
      return fetch(
        `${SERVER}/${PATHNAME}/login`,
        {
          headers: this.createHeaders(),
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
    }
  }

  check (data) {
    if (data) {
      const headers = new Headers();
      headers.append('content-type', 'application/json')

      return fetch(
        `${SERVER}/auth/check`,
        {
          headers: headers,
          method: 'post', 
          body: JSON.stringify(data) 
        }
      );
    }
  }
}
