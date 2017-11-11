import { Session } from '../states/session';
import {connect} from 'react-redux'

import { SERVER, RestService } from './common';

const PATHNAME = 'Ideas';

const filter = {
  include: [
    {
      relation: 'author',
      scope: {
        fields: {profile: true, userId: true },
      }
    },
    {
      relation: 'comments',
      scope: {
        include: 
          [{
            relation: 'author',
            scope: {
              fields: {profile: true, userId: true },
            }
          }],
      }
    },
    {
      relation: 'agrees',
      scope: {
        include: 
          [{
            relation: 'author',
            scope: {
              fields: {profile: true, userId: true },
            }
          }],
      }
    },
  "keywords"
  ]
};
export class IdeaService extends RestService {

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

    const newFilter = {
      ...filter,
      where: {
        archived: 0,
        published: 1
      }
    };
    console.log(JSON.stringify(newFilter));
    return fetch (`${SERVER}/${PATHNAME}/?filter=${JSON.stringify(newFilter)}`,
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

  update(data) {
    if (data && data.id) {
      return fetch (
        `${SERVER}/${PATHNAME}/${data.id}`,
        {
          headers: this.createHeaders(),
          method: 'PATCH',
          body: JSON.stringify(data)
        }
      );
    }
  }

  delete(id) {
    if (id) {
      return fetch (
        `${SERVER}/${PATHNAME}/${id}`,
        {
          headers: this.createHeaders(),
          method: 'DELETE'
        }
      );
    }
  }
  
  setAgree(id) {
    if (id) {
      return fetch (
        `${SERVER}/${PATHNAME}/${id}/Agrees`,
        {
          headers: this.createHeaders(),
          method: 'POST'
        }
      );
    }
  }

  addKeyword(id, keyword) {
    if (id && keyword.id) {
      return fetch (
        `${SERVER}/${PATHNAME}/${id}/keywords/rel/${keyword.id}`,
        {
          headers: this.createHeaders(),
          method: 'PUT'
        }
      );
    }
  }

  postComment(comment) {
    if (comment.ideaId) {
      return fetch (
        `${SERVER}/${PATHNAME}/${comment.ideaId}/Comments`,
        {
          headers: this.createHeaders(),
          method: 'POST',
          body: JSON.stringify(comment)
        }
      );
    }
  }
}


