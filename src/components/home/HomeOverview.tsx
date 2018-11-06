import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { HomePageProps } from '../../containers/HomePage';
import { PathUtil } from '../../utils/PathUtil';
import { Markdown } from '../Markdown';

export interface HomeOverviewProps extends HomePageProps {}

export class HomeOverview extends React.Component<HomeOverviewProps, {}> {
  public render() {
    const {
      highlight1title,
      highlight1text,
      highlight1image,
      highlight2title,
      highlight2text,
      highlight2image,
      highlight3title,
      highlight3text,
      highlight3image
    } = this.props;
    return (
      <div className="homeOverview">
        <Row>
          <Col sm={12} md={4}>
            <div className="highlight highlight1">
              <div className="imageContainer wow jackInTheBox">
                <a
                  href="/nl/info"
                  style={{ backgroundImage: 'url(' + PathUtil.getFullImagePath(highlight1image.path) + ')' }}
                />
              </div>
              <h3>{highlight1title}</h3>
              <Markdown content={highlight1text} />
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="highlight highlight2">
              <div className="imageContainer wow jackInTheBox">
                <a
                  href="/nl/info"
                  style={{ backgroundImage: 'url(' + PathUtil.getFullImagePath(highlight2image.path) + ')' }}
                />
              </div>
              <h3>{highlight2title}</h3>
              <Markdown content={highlight2text} />
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="highlight highlight3">
              <div className="imageContainer wow jackInTheBox">
                <a
                  href="/nl/info"
                  style={{ backgroundImage: 'url(' + PathUtil.getFullImagePath(highlight3image.path) + ')' }}
                />
              </div>
              <h3>{highlight3title}</h3>
              <Markdown content={highlight3text} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
