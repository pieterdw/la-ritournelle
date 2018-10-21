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
            <Col key={i} xs={12} sm={6} md={3} className="thumbCol">
              <a
                data-path={img.fullSizePath}
                onClick={this.handleSelect}
                className="animated zoomIn"
                style={{ backgroundImage: 'url(' + img.thumbPath + ')', animationDelay: i * 80 + 'ms' }}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
