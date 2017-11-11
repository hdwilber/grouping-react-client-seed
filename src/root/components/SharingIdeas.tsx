import * as React from 'react';
import {connect} from 'react-redux'
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import SideBar from './SideBar';
import TopBar from './TopBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import '../../styles/_index.scss';
import "draft-js/dist/Draft.css";

import {
  PROVIDERS, 
  sessionStart, 
  sessionRestore,
  sessionEnd,
  sessionSet,
  sessionUnSet,
} from '../../actions/session';

import { 
  groupGetAll,
  groupGet, 
} from '../../actions/group';

import { Grid, Row, Col } from 'react-bootstrap';

import DialogViewIdea from './partials/DialogViewIdea';
import DialogEditIdea from './partials/DialogEditIdea';
import DialogLogin from './partials/DialogLogin';
import DialogConfirmation from './partials/DialogConfirmation';

import RestService from '../../services';

import Card from './Card';

import {ACTIONS as EDIT_IDEA_ACTIONS} from './partials/DialogEditIdea';
import {ACTIONS as CARD_ACTIONS } from './Card';

import { 
  ideaCreate, 
  ideaUnSet,
  ideaGetAll,
  ideaArchive,
  ideaSetAgree,
  ideaSetSingle,
  ideaPostComment,
  ideaUpdate,
  ideaSave,
  ideaDelete,
  ideaAddKeyword
} from './../../actions/idea';

import { 
  keywordGetAll,
  keywordCreate
} from './../../actions/keyword';


interface IOwnProps {
  children: any;
  match: any;
  history: any;
};

interface IConnProps {
  session: any;
  idea: any;
  keyword: any;
  group: any;
};

class SharingIdeas extends React.Component< IOwnProps & IConnDispatches & IConnProps, IOwnState> {
  unlisten: any;
  constructor(props) {
    super(props)
    this.state = { 
      viewDialogIdeaEdit: false,
      viewDialogIdeaView: false,
      viewDialogLogin: false ,
      idea: null,
      viewConfirmation: false,
      confirmation: {
        title: 'Are you sure?',
        data: {}
      }
    };
    props.sessionRestore();
  }

  handleDialogIdeaEditClose (action, data, fields) {
    this.setState({ viewDialogIdeaEdit: false});
    switch(data) {
      case EDIT_IDEA_ACTIONS.SAVE:
        this.props.ideaSave({
          id: data.id,
          ...fields
        })
      break;
      case EDIT_IDEA_ACTIONS.PUBLISH:
        this.props.ideaSave({
          id: data.id,
          ...fields,
          published: true
        })
      break;
      case EDIT_IDEA_ACTIONS.DISCARD:
      break;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.idea) {
      console.log(nextProps.idea);
      if (this.state.viewDialogIdeaView) {
        this.setState({idea: nextProps.idea.list.find(e => e.id === this.state.idea.id)})
      }
    }
  }

  handleDialogIdeaViewClose = (value, data) => {
    this.setState({ viewDialogIdeaView: false, idea : null});
  }
  handleDialogLoginClose = (value, data) => {
    this.setState({viewDialogLogin: false});
    this.props.sessionStart(value, data);
  }

  handleLogout() {
    this.openConfirmDialog('logout', { message: 'Are you sure to log out?' });
  }
  handleLogin() {
    this.setState({
      viewDialogLogin: true
    })
  }

  openConfirmDialog(action, opts ) {
    this.setState({
      viewConfirmation: true,
      confirmation: {
        ...opts,
        action: action,
      }
    });
  }

  handleIdeaCreate() {
    const { ideaCreate, ideaUnSet } = this.props;
    ideaUnSet();
    if (this.props.session && !this.props.session.error ) {
      ideaCreate({});
      this.setState({viewDialogIdeaEdit: true})
    }
  }

  handleCommentPost = (comment) => {
    if (this.props.session && !this.props.session.error ) {
      this.props.ideaPostComment(comment)
    }
  }

  handleModal(action, choise, data) {
    if (choise === 1) {
      switch(action) {
        case 'logout': 
          this.props.sessionEnd();
        break;
        case 'deleteIdea': 
          this.props.ideaDelete(data.idea.id)
        break;
        case 'archiveIdea': 
          this.props.ideaArchive(data.idea)
        break;
      }

    }

    this.setState({viewConfirmation: false})
  }

  handleCardClick(action, idea) {
    const { ideaSetAgree, ideaArchive, ideaDelete } = this.props;
    if (this.props.session && !this.props.session.error ) {
      switch (action) {
        case CARD_ACTIONS.OPEN: 
          this.setState({ viewDialogIdeaView: true , idea: idea});
        break;

        case CARD_ACTIONS.AGREE:
          ideaSetAgree(idea);
        break;
        case CARD_ACTIONS.ARCHIVE:
          this.openConfirmDialog('archiveIdea', { message: 'Are you sure to archive this idea?', idea: idea} )
        break;
        case CARD_ACTIONS.DELETE:
          this.openConfirmDialog('deleteIdea', { message: 'Are you sure to delete this idea?', idea: {id: idea.id} })
        break;
        case CARD_ACTIONS.EDIT:
          this.setState({viewDialogIdeaEdit: true});
          this.props.ideaSetCurrent(idea);
        break;
      }
    }
  }

  componentDidMount() {
    //console.log(this.props);

    this.unlisten = this.props.history.listen((location, action) => {
          //console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
          //console.log(`The last navigation action was ${action}`)
      const { groupGet, match} = this.props;
      
      if (match.params.groupId) {
        console.log(match);
        console.log('Match GroupI d: ' + match.params.groupId);
        groupGet(match.params.groupId)
      }

      //const { groupGet, match} = this.props;
        //console.log('Loading group');
      //if (match.params.groupId) {
        //console.log('Loading group');
        //groupGet(match.params.groupId)
      //} 


    });

  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleKeywordCreate = (val) =>  {
    const { keywordCreate } = this.props;
    keywordCreate( val );
  }
  handleKeywordAdd = (idea, keyword) =>  {
    this.props.ideaAddKeyword(idea,keyword )
  }

  handleSelectSession(session) {
    this.props.sessionSet(session);
    this.props.groupGetAll();
  }

  handleSelectGroup (group) {
    this.props.history.push('/group/'+group.id);
  }

  renderCard (idea, i) {
    return (<Card key={i} idea={idea}
      onClickOpen={(e) => this.handleCardClick(CARD_ACTIONS.OPEN, e) }
      onClickArchive={ (e) => {this.handleCardClick(CARD_ACTIONS.ARCHIVE, e) }}
      onClickDelete={ (e) => {this.handleCardClick(CARD_ACTIONS.DELETE, e)} }
      onClickKeyword={ (k) => {} }
      onClickAgree={ (e) => this.handleCardClick(CARD_ACTIONS.AGREE, e) }
      onClickEdit={ (e) => this.handleCardClick(CARD_ACTIONS.EDIT, e) }
      allowRemove={(this.props.session ? (this.props.session.userId === idea.author.userId) : false)}
    />)

  }
  render() {
    const {session, idea, ideaArchive, keyword , group} = this.props;
    const { viewDialogIdeaView } = this.state;
    const selectedIdea = this.state.idea;
    return (
      <div>
          <SideBar
            onIdeaCreate={() => this.handleIdeaCreate()}
            onLogout={() => this.handleLogout()}
            onLogin={() => this.handleLogin()}
            session={this.props.session}
            onSelectSession={(session) => this.handleSelectSession(session)}

          />

        <TopBar 
          group={group}
          onGroupSelected={(e) => {this.handleSelectGroup (e)} }
        />
        <Grid fluid className="default-content">
          <Row>
          <Col md={12}>
            {(idea.list) ? (
              idea.list.map( (ideita, i) => {
              return (
                this.renderCard(ideita, i)
               )
              })
            ) : ( 'Loading...' )
            }

            </Col>
            </Row>

          <DialogEditIdea
            open={this.state.viewDialogIdeaEdit}
            onClose={(a, b, c) => this.handleDialogIdeaEditClose(a, b, c)}
            keywords={keyword ? keyword.list : []}
            onKeywordValueChanged={(e) => {}}
            onKeywordCreate={this.handleKeywordCreate}
            onKeywordAdd={this.handleKeywordAdd}
            idea={idea.current}

          />

          <DialogViewIdea
            open={this.state.viewDialogIdeaView}
            onRequestClose={this.handleDialogIdeaViewClose}
            onCommentPost={this.handleCommentPost}
            idea={this.state.idea}
          />

          <DialogLogin
            open={this.state.viewDialogLogin}
            onRequestClose={this.handleDialogLoginClose}
            providers={PROVIDERS}
            />

          <DialogConfirmation
            open={this.state.viewConfirmation}
            onRequestClose={(e, choice, data) => this.handleModal(e, choice, data)}
            message={this.state.confirmation.message}
            data={this.state.confirmation}
            />

        </Grid>
      </div>
    );
  }
}

interface IConnDispatches {
  groupGetAll: () =>  void;
  groupGet: (string) =>  void;
  sessionStart : (string, any) => void;
  sessionRestore : () => void;
  sessionSet: (any) => void;
  sessionUnSet: () => void;
  sessionEnd: () => void;
  ideaGetAll: () => void;
  ideaSave: (any) => void;
  ideaCreate: (any) => void;
  ideaUnSet: () => void;
  ideaSetCurrent: (any) => void;
  ideaDelete: (number) => void;
  ideaUpdate: (any, string) => void;
  ideaAddKeyword: (any, k ) => void;
  ideaArchive: (any) => void;
  ideaSetAgree: (any) => void;
  ideaPostComment: (any) => void;
  keywordGetAll: () => void;
  keywordCreate: (any) => void;
};

interface IOwnState {
  viewDialogIdeaEdit: boolean;
  viewDialogIdeaView: boolean;
  viewDialogLogin: boolean;
  viewConfirmation: boolean;
  confirmation: any;
  idea: any;
};

function mapStateToProps(state) {
  return {
    session: state.session,
    idea: state.idea,
    keyword: state.keyword,
    group: state.group
  };
};

function mapDispatchesToProps(dispatch) {
  return {
    sessionStart: (p, data) => dispatch(
      sessionStart(p, data)),
    sessionRestore: () => dispatch( sessionRestore() ),
    sessionEnd: () => dispatch (sessionEnd()),
    sessionSet: (session) => dispatch (sessionSet(session)),
    sessionUnSet: () => dispatch(sessionUnSet()),
    groupGetAll: () =>  dispatch(groupGetAll()),
    groupGet: (id) =>  dispatch(groupGet(id)),
    ideaUnSet: () => dispatch(ideaUnSet()),
    ideaGetAll: () => dispatch(ideaGetAll()) ,
    ideaSetSingle: (data) => dispatch(ideaSetSingle(data)),
    ideaCreate: (data) => dispatch(ideaCreate(data)),
    ideaSave: (data) => dispatch(ideaSave(data)),
    ideaDelete: (data) => dispatch(ideaDelete(data)),
    ideaUpdate: (data, method) => dispatch(ideaUpdate(data, method)),
    ideaArchive: (data) => dispatch(ideaArchive(data)),
    ideaSetAgree: (data) => dispatch(ideaSetAgree(data)),
    ideaPostComment: (data) => dispatch(ideaPostComment(data)),
    keywordGetAll: () => dispatch(keywordGetAll()),
    keywordCreate: (data) => dispatch(keywordCreate(data)),
    ideaAddKeyword: (idea, k) => dispatch(ideaAddKeyword(idea, k))
  }
};

export default connect(mapStateToProps, mapDispatchesToProps) (withRouter(SharingIdeas));
