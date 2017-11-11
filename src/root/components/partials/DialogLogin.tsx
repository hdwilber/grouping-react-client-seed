import * as React from 'react';
import { 
  Form, FormControl, ControlLabel,
  FormGroup,  Col, Grid, Row, Button,
  Modal, Media, ListGroup, ListGroupItem } from 'react-bootstrap';


interface IOwnProps {
  onRequestClose: (string, data) => void;
  providers: any;
  open: boolean;
};

interface IOwnState {
  email: string;
  password: string;
}
class DialogLogin extends React.Component<IOwnProps, IOwnState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleRequestClose = () => {
    this.props.onRequestClose(null, null);
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value, null);
  };

  handleEmailLogin (e) {
    e.preventDefault();
    this.props.onRequestClose('email', { email: this.state.email, password: this.state.password });
  }

  handleChangeField(e) {
    this.setState( {
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { open, providers } = this.props;
    return (
        <Modal 
          onHide={this.handleRequestClose}
          show={open}
          backdrop={false}
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Select a Provider to Start</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {providers.map(provider =>
                <ListGroupItem onClick={() => this.handleListItemClick(provider.name)} key={provider.name}>
                  <Media>
                   <Media.Left>
                      {(provider.name === 'facebook') ? ( <i className="fa fa-facebook" /> ) : (null)}
                      {(provider.name === 'google') ? ( <i className="fa fa-google" /> ) : (null)}
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>
                        {provider.name}
                      </Media.Heading>
                    </Media.Body>
                  </Media>
                </ListGroupItem>,
              )}
            </ListGroup>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl name="email" type="email" value={this.state.email} placeholder="Email" onChange={(e) => this.handleChangeField(e)} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl name="password" type="password" value={this.state.password} onChange={(e) => this.handleChangeField(e)}placeholder="Password" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="button" onClick={(e) => {e.preventDefault(); this.handleEmailLogin(e)}}>
                  Log In
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
      </Modal>
    );
  }
}
export default DialogLogin;
