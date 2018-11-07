import React from 'react';
import { Link } from 'react-static';
import Container from 'reactstrap/lib/Container';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { GalleryImage } from 'scripts/models/Gallery';
import { GalleryPageProps } from '../../containers/GalleryPage';
import { PathUtil } from '../../utils/PathUtil';
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
        <Container>{this.renderGallerySelector()}</Container>
        <GalleryThumbs images={images} onSelect={this.handleSelect} />
        <GalleryLightbox images={images} currentImagePath={this.state.currentImagePath} onSelect={this.handleSelect} />
      </div>
    );
  }

  private renderLink = props => {
    return <Link {...props} activeClassName="pageActive" />;
  };

  private renderGallerySelector = () => {
    const { text, locale, id, slug, galleries, gallerySlug } = this.props;
    const path = PathUtil.getPathInLocale(locale, id, slug);
    return (
      <Nav pills>
        <NavItem>
          <NavLink tag={this.renderLink} to={path} active={!gallerySlug}>
            {text.all}
          </NavLink>
        </NavItem>
        {galleries.map((g, i) => (
          <NavItem key={i}>
            <NavLink key={g.slug} tag={Link} to={`${path}/${g.slug}`} active={gallerySlug === g.slug}>
              {g.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  };
}
