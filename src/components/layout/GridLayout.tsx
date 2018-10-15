import React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { GridColumnLayout } from 'scripts/models/GridLayout';
import { LayoutSettings } from 'scripts/models/LayoutSettings';
import { cn } from '../../utils/cn';
import { StyleUtil } from '../../utils/StyleUtil';
import { LayoutChooser } from './LayoutChooser';

export interface GridLayoutProps {
  settings: LayoutSettings;
  columns: GridColumnLayout[];
}

export class GridLayout extends React.Component<GridLayoutProps> {
  public render() {
    const { settings, columns } = this.props;
    return (
      <div
        id={settings.id || undefined}
        className={cn('gridLayout', settings.class)}
        style={StyleUtil.stringToStyleObject(settings.style) || undefined}>
        <Row>
          {columns.map((col, i) => (
            <Col
              key={i}
              id={col.settings.id || undefined}
              className={cn('gridColumnLayout', col.settings.class)}
              style={StyleUtil.stringToStyleObject(col.settings.style) || undefined}>
              {col.children.map((x, i2) => (
                <LayoutChooser key={i2} layout={x} />
              ))}
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
