import React from 'react';
import { Link } from 'react-static';
import Button from 'reactstrap/lib/Button';
import Container from 'reactstrap/lib/Container';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { PageProps } from '../containers/Page';
import '../css/Footer.scss';

export interface FooterProps extends PageProps {}

export class Footer extends React.Component<FooterProps, {}> {
  public render() {
    const { locale, menu, id, text, otherPaths } = this.props;
    const isBookingPage = id === 'bookingpage';
    const booking = menu.find(x => x.id === 'bookingpage');
    return (
      <div className="pageFooter">
        {!isBookingPage && (
          <Container className="bookingFooter">
            <p>{text.bookingFooterText}</p>
            <Button color="primary" tag={Link} to={booking.path}>
              {text.bookingFooterButton}
            </Button>
          </Container>
        )}
        <Container className="navFooter">
          <Nav>
            {this.props.menu.map(item => (
              <NavItem key={item.path}>
                <NavLink tag={Link} to={item.path}>
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <Nav>
            {locale != 'nl' && (
              <NavItem>
                <NavLink tag={Link} to={otherPaths.find(x => x.locale === 'nl').path}>
                  Nederlands
                </NavLink>
              </NavItem>
            )}
            {locale != 'en' && (
              <NavItem>
                <NavLink tag={Link} to={otherPaths.find(x => x.locale === 'en').path}>
                  English
                </NavLink>
              </NavItem>
            )}
            {locale != 'fr' && (
              <NavItem>
                <NavLink tag={Link} to={otherPaths.find(x => x.locale === 'fr').path}>
                  français
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Container>
      </div>
    );
  }
}
