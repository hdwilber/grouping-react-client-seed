import * as React from 'react';

import { FormControl, Modal, Panel,Button, Col, Row } from 'react-bootstrap';
import Draft, {RichUtils, Editor, EditorState} from 'draft-js';


interface IOwnProps {
  data: any;
  onRequestClose: (string, number, any) => void;
  message: string;
  labelAccept?: string;
  labelCancel?: string;
  open: boolean;
};

interface IOwnState {
};

class DialogConfirmation extends React.Component<IOwnProps, IOwnState> {
  constructor(props) {
    super(props)

    this.handleClickCancel.bind(this);
    this.handleClickAccept.bind(this);
  }

  handleClickCancel(e) {
    this.props.onRequestClose(this.props.data.action, 2, this.props.data);
  }
  handleClickAccept(e) {
    this.props.onRequestClose(this.props.data.action, 1, this.props.data);
  }

  handleRequestDiscard = (e) => {
    this.props.onRequestClose(null, 1, this.props.data);
  }

  render() {
    const { open, message,  onRequestClose, labelAccept, labelCancel} = this.props;
    return (
      <Modal
        show={open}
        onHide={this.handleRequestDiscard}
        backdrop={false}
      >
        <Modal.Body>
          <p>
            { message }
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Row>
            <Col xs={6} >
              <Button block onClick={(e) => this.handleClickAccept(e)} > {labelAccept?labelAccept: 'Accept'}</Button>
            </Col>
            <Col xs={6} >
              <Button block onClick={(e) => this.handleClickCancel(e)} > {labelCancel ? labelCancel: 'Cancel'}</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DialogConfirmation;
