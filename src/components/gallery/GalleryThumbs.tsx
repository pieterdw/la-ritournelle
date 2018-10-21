import React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { Gallery } from 'scripts/models/Gallery';

export interface GalleryThumbsProps {
  galleries: Gallery[];
  slug: string;
  onSelect: (imagePath: string) => any;
}

export class GalleryThumbs extends React.Component<GalleryThumbsProps, {}> {
  private handleSelect = event => {
    const path = event.target.dataset.path;
    this.props.onSelect(path);
  };
  public render() {
    const { galleries, slug } = this.props;
    let counter = -1;
    const gals = slug ? galleries.filter(x => x.slug === slug) : galleries;
    return (
      <div className="galleryThumbs">
        <Row>
          {gals.map(g =>
            g.images.map(img => {
              counter++;
              return (
                <Col key={counter} xs={6} md={3} className="thumbCol">
                  <a
                    data-path={img.fullSizePath}
                    onClick={this.handleSelect}
                    className="animated zoomIn"
                    style={{ backgroundImage: 'url(' + img.thumbPath + ')', animationDelay: counter * 100 + 'ms' }}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </div>
    );
  }
}
