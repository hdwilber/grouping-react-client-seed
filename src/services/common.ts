import { Session } from '../states/session';
export const SERVER = process.env.API_ENDPOINT_URL + '/api'

export class RestService {
  public session: Session;
  
  setSession(session: Session) {
    this.session = session;
  }

  createHeaders() {
    var headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.session) {
      headers.append('Authorization', this.session.id )
    }
    return headers;
  }
  createUploadHeaders() {
    var headers = new Headers();
    headers.append("enctype", "multipart/form-data");
    if (this.session) {
      headers.append('Authorization', this.session.id )
    }
    return headers;
  }
}


