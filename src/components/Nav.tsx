import React from 'react';
import { Link } from 'react-static';
import Collapse from 'reactstrap/lib/Collapse';
import Container from 'reactstrap/lib/Container';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import NavBs from 'reactstrap/lib/Nav';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { UncontrolledDropdown } from 'reactstrap/lib/Uncontrolled';
import { PageProps } from 'src/containers/Page';
import '../css/Nav.scss';
import { cn } from '../utils/cn';
import { PathUtil } from '../utils/PathUtil';

export interface NavProps extends PageProps {}

export interface NavState {
  isOpen: boolean;
}

export class Nav extends React.Component<NavProps, NavState> {
  public state = { isOpen: false };

  public toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public render() {
    const { locale, otherPaths } = this.props;
    const homePath = PathUtil.getPathInLocale(locale, 'homepage', null);
    return (
      <Navbar dark sticky="top" expand="md" className="headerNav">
        <Container>
          <NavbarBrand tag={Link} to={homePath}>
            La Ritournelle
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggle}
            className={cn(this.state.isOpen && 'open')}
            aria-label="toggle navigation menu">
            <div className="one" />
            <div className="two" />
            <div className="three" />
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavBs className="ml-auto" navbar>
              {this.props.menu
                .filter(item => item.id !== 'homepage')
                .map(item => (
                  <NavItem key={item.path}>
                    <NavLink tag={Link} to={item.path}>
                      {item.label}
                    </NavLink>
                  </NavItem>
                ))}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.locale.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu right>
                  {locale !== 'nl' && (
                    <Link className="dropdown-item" to={otherPaths.find(x => x.locale === 'nl').path}>
                      Nederlands
                    </Link>
                  )}
                  {locale !== 'en' && (
                    <Link className="dropdown-item" to={otherPaths.find(x => x.locale === 'en').path}>
                      English
                    </Link>
                  )}
                  {locale !== 'fr' && (
                    <Link className="dropdown-item" to={otherPaths.find(x => x.locale === 'fr').path}>
                      français
                    </Link>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavBs>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
