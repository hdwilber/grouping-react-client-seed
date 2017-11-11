import { Session } from '../states/session';
import {connect} from 'react-redux'

import { SERVER, RestService } from './common';

const PATHNAME = 'Keywords';

const filter = {
};
export class KeywordService extends RestService {

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
    return fetch (`${SERVER}/${PATHNAME}/?filter=${JSON.stringify(filter)}`,
                 {headers: this.createHeaders(),
                  method: 'GET', 
                 }
    )
  }

  get(id) {
    return fetch (`${SERVER}/${PATHNAME}/${id}?filter=${JSON.stringify(filter)}`,
                 {headers: this.createHeaders(),
                  method: 'GET', 
                 }
    )
  }
}
