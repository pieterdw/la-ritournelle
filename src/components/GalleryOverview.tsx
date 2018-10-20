import React from 'react';
import { Link } from 'react-static';
import Alert from 'reactstrap/lib/Alert';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { GalleryPageProps } from '../containers/GalleryPage';
import { tr } from '../utils/tr';

export interface GalleryOverviewProps extends GalleryPageProps {}

export class GalleryOverview extends React.Component<GalleryOverviewProps, {}> {
  public render() {
    return (
      <div className="galleryOverview wow slideInUp">
        {this.renderGallerySelector()}
        <Alert>{JSON.stringify(this.props)}</Alert>
      </div>
    );
  }

  private renderLink = props => {
    return <Link {...props} activeClassName="pageActive" />;
  };

  private renderGallerySelector = () => {
    const { page, galleries, gallerySlug } = this.props;
    return (
      <Nav pills>
        <NavItem>
          <NavLink tag={this.renderLink} to={page.path} active={!gallerySlug}>
            {tr('all', page.locale)}
          </NavLink>
        </NavItem>
        {galleries.map(g => (
          <NavItem>
            <NavLink key={g.slug} tag={Link} to={`${page.path}/${g.slug}`} active={gallerySlug === g.slug}>
              {g.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  };
}
