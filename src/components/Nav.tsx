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
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import '../css/Nav.scss';
import { RouteMatch } from '../models/RouteMatch';

export interface NavProps {
  page: Page;
  menu: MenuItem[];
  match: RouteMatch;
}

export interface NavState {
  isOpen: boolean;
}

export class Nav extends React.Component<NavProps, NavState> {
  public state = { isOpen: false };

  private getPathInLocale = (locale: string) => {
    if (this.props.page.slug === 'home') {
      return locale === 'nl' ? '/' : '/' + locale;
    }
    return `/${locale}/${this.props.page.slug}`;
  };

  public toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public render() {
    const locale = this.props.page.locale;
    const homePath = locale === 'nl' ? '/' : '/' + locale;
    return (
      <Navbar dark sticky="top" expand="md" className="headerNav">
        <Container>
          <NavbarBrand tag={Link} to={homePath}>
            La Ritournelle
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavBs className="ml-auto" navbar>
              {this.props.menu.map(item => (
                <NavItem key={item.url}>
                  <NavLink tag={Link} to={item.url}>
                    {item.label}
                  </NavLink>
                </NavItem>
              ))}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.page.locale.toUpperCase()}
                </DropdownToggle>
                <DropdownMenu right>
                  {locale !== 'nl' && (
                    <Link className="dropdown-item" to={this.getPathInLocale('nl')}>
                      Nederlands
                    </Link>
                  )}
                  {locale !== 'en' && (
                    <Link className="dropdown-item" to={this.getPathInLocale('en')}>
                      English
                    </Link>
                  )}
                  {locale !== 'fr' && (
                    <Link className="dropdown-item" to={this.getPathInLocale('fr')}>
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
