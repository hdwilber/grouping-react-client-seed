import * as React from 'react';
import {connect} from 'react-redux'
import {
  BrowserRouter,
  Route, 
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom';
import SharingIdeas from './components/SharingIdeas';
import InvitationCheck from './components/InvitationCheck';

interface IOwnProps {
};

interface IConnProps {
};

interface IConnDispatches {
};
interface IOwnState {
};

function mapStateToProps(state) {
  return {
    session: state.session
  };
};
function mapDispatchesToProps(dispatch) {
  return {
  }
};

class App extends React.Component<IOwnProps & IConnProps & IConnDispatches, IOwnState> { 
  constructor(props){
    super(props);
  }
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SharingIdeas} />
            <Route path="/invitations/:id" component={InvitationCheck} />
            <Route path="/group/:groupId" component={SharingIdeas} />
            <Route path="/group/:groupId/board/:boardId" component={SharingIdeas} />
          </Switch>
        </BrowserRouter>
    );
  }
}
export default connect(mapStateToProps, mapDispatchesToProps) (App);

