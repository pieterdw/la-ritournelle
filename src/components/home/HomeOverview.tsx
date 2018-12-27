import * as React from 'react';
import { Link } from 'react-static';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
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
      highlight3image,
      menu,
      text,
      numbers,
      distances
    } = this.props;
    const fotos = menu.find(x => x.id === 'gallerypage');
    const theHouse = menu.find(x => x.id === 'thehousepage');
    return (
      <div className="homeOverview">
        <div className="highlights">
          <Container>
            <Row>
              <Col sm={12} md={4}>
                <div className="highlight highlight1">
                  <div className="imageContainer wow jackInTheBox">
                    <a
                      href={theHouse.path}
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
                      href={theHouse.path}
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
                      href={theHouse.path}
                      style={{ backgroundImage: 'url(' + PathUtil.getFullImagePath(highlight3image.path) + ')' }}
                    />
                  </div>
                  <h3>{highlight3title}</h3>
                  <Markdown content={highlight3text} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="numbers">
          <Container>
            <Row>
              {numbers.map((x, i) => (
                <Col xs={6} md={3} key={i}>
                  <strong>{x.value.value}</strong>
                  <span>{x.value.name}</span>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <div className="pictures">
          <Container>
            <div>
              <Button color="secondary" tag={Link} to={fotos.path} className="wow fadeInUp">
                {text.picturesLink}
              </Button>
            </div>
          </Container>
        </div>
        <div className="distances">
          <Container>
            <Row className="outerRow">
              <Col md={4} className="pin">
                <img
                  src="https://admin.vakantiehuisantibes.com/storage/uploads/2018/11/07/5be332fc97974pin-small.png"
                  className="wow bounceIn"
                />
                <span className="wow fadeIn">{text.everythingNearby}</span>
              </Col>
              <Col md={8} className="innerDistances">
                <Row>
                  {distances.map((x, i) => (
                    <Col xs={6} sm={6} md={4} key={i}>
                      <div>
                        <strong>{x.value.name}</strong>
                        <span>{x.value.distance}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
