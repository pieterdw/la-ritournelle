import React from 'react';
import { ImageLayoutSettings } from 'scripts/models/ImageLayout';
import { cn } from '../../utils/cn';
import { StyleUtil } from '../../utils/StyleUtil';

export interface ImageLayoutProps {
  settings: ImageLayoutSettings;
}

export const ImageLayout: React.SFC<ImageLayoutProps> = ({ settings }) => {
  const url =
    settings.image.path.indexOf('http:') === 0
      ? settings.image.path
      : 'https://admin.vakantiehuisantibes.com' + settings.image.path;
  const style = !settings.width && !settings.height ? { width: '100%', height: 'auto' } : undefined;
  return (
    <div
      id={settings.id || undefined}
      className={cn('imageLayout', settings.class)}
      style={StyleUtil.stringToStyleObject(settings.style) || undefined}>
      <img
        src={url}
        alt={settings.image.meta ? settings.image.meta.title : undefined}
        width={settings.width || undefined}
        height={settings.height || undefined}
        style={style}
      />
    </div>
  );
};
