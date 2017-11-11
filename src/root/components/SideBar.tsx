import * as React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IOwnProps {
  session: any;
  onSelectSession: (any) => void;
  onIdeaCreate: () => void;
  onLogin: ()=> void;
  onLogout: () => void;
}
interface IOwnState {
}

class SideBar extends React.Component<IOwnProps, IOwnState> {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.onLogout();
  }

  renderUserMenu() {
    const { list,
    } = this.props.session

    return ( list.map ((s, idx) => {
      return (
      <div key={idx} className="userIcon" onClick={(e) => this.props.onSelectSession(s)}>
        <img src={s.profile.photos && s.profile.photos[0] ? s.profile.photos[0].value : ''} alt={s.profile.displayName ? s.profile.displayName : s.profile.emails[0].value}/>
      </div>
      )
    }))
  } 

  renderTopBar() {
    const {onLogout, onIdeaCreate, onLogin, session } =this.props;
    return (
      <nav className="sidebar">
        <Link to="/">
          <div className="logo">
              si
          </div>
        </Link>
        {this.renderUserMenu()}
        <div className="side-bar__options">
          <ul className="list-inline">
            <li className="userIcon" onClick={() => onLogin()}>
              <i className="fa fa-sign-in"/>
            </li >
            <li>
              <i className="fa fa-search" />
            </li>
            {(session && !session.error) ? (
              <li onClick={ () => {onIdeaCreate()} }>
                <i className="fa fa-plus" />
              </li>
            ): null}
            {(session && !session.error) ? (
              <li onClick={ ()=> {onLogout()} }>
                <i className="fa fa-sign-out" />
              </li>
            ) : (<span/>) }
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div >
        {this.renderTopBar()}
      </div>
    );
  }
}

export default SideBar;
