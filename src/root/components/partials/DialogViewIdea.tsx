import * as React from 'react';
import moment from 'moment';

import { FormControl, Modal, Panel,Button, Col, Row } from 'react-bootstrap';
import Draft, {RichUtils, Editor, EditorState} from 'draft-js';


interface IOwnProps {
  onRequestClose: (string, any) => void;
  open: boolean;
  idea: any;
  onCommentPost: (any) => void;
};
interface IOwnState {
  replyTo: any;
  editorState: any;
};

class DialogViewIdea extends React.Component<IOwnProps, IOwnState> {
  constructor(props) {
    super(props)
    this.state = {
      replyTo: null,
      editorState: EditorState.createEmpty()
    };

    this.onReply.bind(this)
    this.onChange.bind(this);
    this.handleKeyCommand.bind(this);
    this.handleCommentPost.bind(this);
    this.handleCommentDiscard.bind(this);
  }
  onChange (editorState) {
    this.setState({editorState});
  }
  handleRequestDiscard= (e) => {
    this.props.onRequestClose('discard', null);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onReply(comment) {
    this.setState({replyTo: comment});
  }


  _serializeMessages(comments) {
    return comments.map( (c,i)=>{
      return {
        id: c.id,
        body: c.body,
        author: c.author,
        replyTo: c.replyTo,
        createdAt: c.createdAt,
        replies: []
      }
    });
  }

  _listToTree(data, options) {
    options = options || {};
    var ID_KEY = options.idKey || 'id';
    var PARENT_KEY = options.parentKey || 'replyTo';
    var CHILDREN_KEY = options.childrenKey || 'replies';

    var tree = [],
        childrenOf = {};
    var item, id, parentId;

    for (var i = 0, length = data.length; i < length; i++) {
        item = data[i];
        id = item[ID_KEY];
        parentId = item[PARENT_KEY] || 0;
        // every item may have children
        childrenOf[id] = childrenOf[id] || [];
        // init its children
        item[CHILDREN_KEY] = childrenOf[id];
        if (parentId != 0) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || [];
            // push it into its parent's children object
            childrenOf[parentId].push(item);
        } else {
            tree.push(item);
        }
    };
    return tree;
  }

  _sortMessages(comments) {
      const sm = this._serializeMessages(comments);
      return this._listToTree(comments, {});
  }
  
  renderComments(comments) {
    return (
      <ul className="comments"> 
      {
        comments.map ( (com, i) => {
        return ( 
        <li key={i}> 
          <p className="author">
          {com.author.profile.displayName ?  com.author.profile.displayName : 'Unknown: '}
          </p>
          <p className="message">
          {com.body}
          </p>
          <p>
            <span className="time">
            <i className="fa fa-clock-o" />
              { moment(com.createdAt).format() }
            </span>
            <span className="reply" onClick={(e) => this.onReply(com)}>
              Reply 
              <i className="fa fa-reply" />
            </span >
          </p>

          {(com.replies) &&(
            this.renderComments(com.replies)
          )}
        </li>
         )
        })
      }
      </ul>
    );
  }

  handleCommentPost(e) {
    const { idea, onCommentPost } = this.props;

    const body = Draft.convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;

    onCommentPost ({
      body: body,
      replyTo: this.state.replyTo ? this.state.replyTo.id: null,
      ideaId: idea.id
    });
  }

  handleCommentDiscard () {
    this.props.onRequestClose('discard', null)
  }

  render() {
    const { open, onRequestClose,  idea } = this.props;
    const { replyTo, editorState } = this.state;
    if (idea) {
      return (
        <Modal
          show={open}
          onHide={this.handleRequestDiscard}
          backdrop={false}
          className="idea-view__modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">{idea.title}</Modal.Title>
            <p className="subtitle">By:  {idea.author.profile.displayName}</p>
          </Modal.Header>

          <Modal.Body>
            <div className="idea-body__text">
              {idea.description}
            </div>
            <div className="idea-body__comments">
              {this.renderComments(this._sortMessages(idea.comments))}
            </div>
            
          <div className="message-editor">
            <p className="direction">
            {(replyTo) 
              ? (('Reply to(' + replyTo.author.profile.displayName + ': ' + (replyTo.body) ? (replyTo.body.slice(0,50)): '') + ': ')
              : (" : ")
            }
            </p>
            <Panel>
             <Editor 
               handleKeyCommand={(cm, st) => this.handleKeyCommand(cm, st)}
               editorState={editorState} onChange={(ed) => this.onChange(ed)}
               className="form-control"
             />

             </Panel>



            <Row>
              <Col xs={6} >
                <Button block onClick={(e) => this.handleCommentPost(e)} > Publish </Button>
              </Col>
              <Col xs={6} >
                <Button block onClick={(e) => this.handleCommentDiscard()} > Discard </Button>
              </Col>
            </Row>
            </div>
          </Modal.Body>

          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  }
}
export default DialogViewIdea;
