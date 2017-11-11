import * as React from 'react';
import {InvitationService} from './../../services/invitation';
import { withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

interface IOwnProps {
  match: any;
};

interface IOwnState {
  codeValid: boolean;
  session: any;
}

const invitationService = new InvitationService();

class InvitationCheck extends React.Component <IOwnProps, IOwnState> {
  constructor(props) {
    super(props);
    this.state = {
      codeValid: false,
      session: null
    }
  }

  componentDidMount () {
    const { match } = this.props;
    if (match.params.id) {
      invitationService.check(match.params.id).then (res => {
        if (res.ok) {
          return res.json();
        } 
        return null;
      })
      .then (data => {
        if (!data.error) {
          this.setState( { codeValid: true, session: data });
        }
      })
    }
  }

  render() {
    if (!this.state.codeValid) {
      return (
        <h1>
        Checking the validity of the code.
        </h1>
      );
    } else {
      return (
        <Grid>
          <Row>
            <Col md={12} >
              Validated code.
              <div className="form-group">
              <label className="control-label">
                Enter your password:
              </label>
                <input className="form-control" type="password" />
              </div>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default withRouter(InvitationCheck); 
