import * as React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

interface IOwnProps {
  onGroupSelected: (any) => void;
  group: any;
}

interface IOwnState {
}

class TopBar extends React.Component<IOwnProps, IOwnState> {
  constructor(props) {
    super(props);
  }

  renderGroupMenu (list) {
    return ( 
        <Nav className="list-inline">
        {list.map ((g, idx) => {
          return (
            <NavItem onClick={(e) => this.props.onGroupSelected(g) }key={idx} id="basic-nav-dropdown">
            {g.name}
            </NavItem>
            )
          })
        }
        </Nav>
                  
     );
  } 

  render() {
    const { group } =this.props;
    if (group.list) {
      return (
        <Navbar className="topbar">
        <Navbar.Header>
        </Navbar.Header>
          {this.renderGroupMenu(group.list)}
        </Navbar>
      );
    } else {
      return null;
    }
  }
}

export default TopBar;
