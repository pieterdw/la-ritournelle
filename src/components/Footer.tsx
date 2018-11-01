import React from 'react';
import { Link } from 'react-static';
import Button from 'reactstrap/lib/Button';
import Container from 'reactstrap/lib/Container';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { MenuItem } from 'scripts/MenuUtil';
import { Page } from 'scripts/models/Page';
import '../css/Footer.scss';
import { tr } from '../utils/tr';

export interface FooterProps {
  page: Page;
  menu: MenuItem[];
  isBookingPage?: boolean;
}

export class Footer extends React.Component<FooterProps, {}> {
  private getPathInLocale = (locale: string) => {
    if (this.props.page.slug === 'home') {
      return locale === 'nl' ? '/' : '/' + locale;
    }
    return `/${locale}/${this.props.page.slug}`;
  };

  public render() {
    const {
      page: { locale },
      menu,
      isBookingPage
    } = this.props;
    const booking = menu.find(x => x.url.endsWith('/reserveren'));
    return (
      <div className="pageFooter">
        {!isBookingPage && (
          <Container className="bookingFooter">
            <p>{tr('bookingFooterText', locale)}</p>
            <Button color="primary" tag={Link} to={booking.url}>
              {tr('bookingFooterButton', locale)}
            </Button>
          </Container>
        )}
        <Container className="navFooter">
          <Nav>
            <NavItem>
              <NavLink tag={Link} to={locale === 'nl' ? '/' : `/${locale}`}>
                {tr('home', locale)}
              </NavLink>
            </NavItem>
            {this.props.menu.map(item => (
              <NavItem key={item.url}>
                <NavLink tag={Link} to={item.url}>
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <Nav>
            {locale != 'nl' && (
              <NavItem>
                <NavLink tag={Link} to={this.getPathInLocale('nl')}>
                  Nederlands
                </NavLink>
              </NavItem>
            )}
            {locale != 'en' && (
              <NavItem>
                <NavLink tag={Link} to={this.getPathInLocale('en')}>
                  English
                </NavLink>
              </NavItem>
            )}
            {locale != 'fr' && (
              <NavItem>
                <NavLink tag={Link} to={this.getPathInLocale('fr')}>
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
