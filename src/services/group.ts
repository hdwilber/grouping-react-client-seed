import { Session } from '../states/session';
import {connect} from 'react-redux'

import { SERVER, RestService } from './common';

const PATHNAME = 'groups';

const filter = {
};
export class GroupService extends RestService {

  create(data) {
    return fetch (`${SERVER}/${PATHNAME}`,
      {
        headers: this.createHeaders(),
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
  }

  getAll() {
    if (this.session) {
      return fetch (`${SERVER}/users/${this.session.userId}/${PATHNAME}/?filter=${JSON.stringify(filter)}`,
                   {headers: this.createHeaders(),
                    method: 'GET', 
                   }
      )
    } else {
      return null;
    }
  }

  get(id) {
    const ownFilter = {
      ...filter,
      include: ["owner", "people"]
    };

    if (this.session) {
      return fetch (`${SERVER}/${PATHNAME}/${id}?filter=${JSON.stringify(ownFilter)}`,
                   {headers: this.createHeaders(),
                    method: 'GET', 
                   }
      )
    }
  }
}
