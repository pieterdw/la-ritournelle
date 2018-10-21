import React from 'react';
import { Link } from 'react-static';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { GalleryImage } from 'scripts/models/Gallery';
import { GalleryPageProps } from '../../containers/GalleryPage';
import { tr } from '../../utils/tr';
import { GalleryLightbox } from './GalleryLightbox';
import { GalleryThumbs } from './GalleryThumbs';

export interface GalleryOverviewProps extends GalleryPageProps {}

export interface GalleryOverviewState {
  currentImagePath: string;
}

export class GalleryOverview extends React.Component<GalleryOverviewProps, {}> {
  public state = { currentImagePath: null };

  private handleSelect = (path: string) => this.setState({ currentImagePath: path });

  public render() {
    const { galleries, gallerySlug } = this.props;
    const gals = gallerySlug ? galleries.filter(x => x.slug === gallerySlug) : galleries;
    const images = gals.reduce((img: GalleryImage[], g) => img.concat(g.images), []);
    return (
      <div className="galleryOverview">
        {this.renderGallerySelector()}
        <GalleryThumbs images={images} onSelect={this.handleSelect} />
        <GalleryLightbox images={images} currentImagePath={this.state.currentImagePath} onSelect={this.handleSelect} />
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
        {galleries.map((g, i) => (
          <NavItem key={i}>
            <NavLink key={g.slug} tag={Link} to={`${page.path}/${g.slug}`} active={gallerySlug === g.slug}>
              {g.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  };
}
