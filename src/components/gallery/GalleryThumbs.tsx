import React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { GalleryImage } from 'scripts/models/Gallery';

export interface GalleryThumbsProps {
  images: GalleryImage[];
  onSelect: (imagePath: string) => any;
}

export class GalleryThumbs extends React.Component<GalleryThumbsProps, {}> {
  private handleSelect = event => {
    const path = event.target.dataset.path;
    this.props.onSelect(path);
  };
  public render() {
    return (
      <div className="galleryThumbs">
        <Row>
          {this.props.images.map((img, i) => (
            <Col
              key={i}
              xs={6}
              md={3}
              lg={2}
              className="thumbCol animated zoomIn"
              style={{ animationDelay: i * 60 + 'ms' }}>
              <a
                data-path={img.fullSizePath}
                onClick={this.handleSelect}
                style={{ backgroundImage: 'url(' + img.thumbPath + ')' }}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
