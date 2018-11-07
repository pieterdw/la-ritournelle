import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import { KeyValue } from 'scripts/models/KeyValue';
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
        <div className="highlights">
          <Container>
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
          </Container>
        </div>
        <div className="numbers">
          <Container>
            <Row>
              {this.getNumbers().map((x, i) => (
                <Col xs={6} md={3} key={i}>
                  <strong>{x.value}</strong>
                  <span>{x.key}</span>
                </Col>
              ))}
            </Row>
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
                <span className="wow fadeIn">Alles in de buurt!</span>
              </Col>
              <Col md={8} className="innerDistances">
                <Row>
                  {this.getDistances().map((x, i) => (
                    <Col xs={6} sm={6} md={4} key={i}>
                      <div>
                        <strong>{x.key}</strong>
                        <span>{x.value}</span>
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

  private getNumbers = (): KeyValue<string>[] => {
    return [
      { key: 'personen', value: '8' },
      { key: 'slaapkamers', value: '4' },
      { key: 'terassen', value: '2' },
      { key: `auto's in carport`, value: '2' },
      { key: '', value: 'zwembad' },
      { key: '', value: 'wifi' },
      { key: '', value: 'BBQ' },
      { key: '', value: 'keuken' }
    ];
  };

  private getDistances = (): KeyValue<string>[] => {
    return [
      { key: 'Strand', value: '150m' },
      { key: 'Superette', value: '500m' },
      { key: 'Restaurants', value: '150m' },
      { key: 'Belbus', value: '100m' },
      { key: `Antibes`, value: '3km' },
      { key: 'Cannes', value: '12km' },
      { key: 'Nice', value: '30km' },
      { key: 'Monaco', value: '50km' },
      { key: 'Luchthaven', value: '24km' }
    ];
  };
}
