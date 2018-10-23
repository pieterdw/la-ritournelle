import React from 'react';
import Lightbox from 'react-images';
import { GalleryImage } from 'scripts/models/Gallery';

export interface GalleryLightboxProps {
  images: GalleryImage[];
  currentImagePath: string;
  onSelect: (imagePath: string) => any;
}

export class GalleryLightbox extends React.Component<GalleryLightboxProps, {}> {
  private handleSelect = path => () => this.props.onSelect(path);

  public render() {
    const { images, currentImagePath } = this.props;
    // if (!currentImagePath) {
    //   return null;
    // }
    const index = images.findIndex(img => img.fullSizePath === currentImagePath);
    const nextImagePath = images[(index + 1) % images.length].fullSizePath;
    const previousImagePath = images[(index + images.length - 1) % images.length].fullSizePath;
    return (
      <Lightbox
        // mainSrc={currentImagePath}
        // nextSrc={nextImagePath}
        // prevSrc={previousImagePath}
        // enableZoom={false}
        // onCloseRequest={this.handleSelect(null)}
        // onMovePrevRequest={this.handleSelect(previousImagePath)}
        // onMoveNextRequest={this.handleSelect(nextImagePath)}
        images={images.map(img => ({ src: img.fullSizePath }))}
        currentImage={index}
        isOpen={!!currentImagePath}
        onClickPrev={this.handleSelect(previousImagePath)}
        onClickNext={this.handleSelect(nextImagePath)}
        onClose={this.handleSelect(null)}
      />
    );
  }
}
