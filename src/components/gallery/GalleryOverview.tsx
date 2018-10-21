import React from 'react';
import { Link } from 'react-static';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { GalleryPageProps } from '../../containers/GalleryPage';
import { tr } from '../../utils/tr';
import { GalleryThumbs } from './GalleryThumbs';

export interface GalleryOverviewProps extends GalleryPageProps {}

export class GalleryOverview extends React.Component<GalleryOverviewProps, {}> {
  private handleSelect = (path: string) => alert(path);

  public render() {
    return (
      <div className="galleryOverview">
        {this.renderGallerySelector()}
        <GalleryThumbs galleries={this.props.galleries} slug={this.props.gallerySlug} onSelect={this.handleSelect} />
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
