import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import { TheHousePageProps } from '../../containers/TheHousePage';
import { cn } from '../../utils/cn';
import { Markdown } from '../Markdown';

export interface TheHouseOverviewProps extends TheHousePageProps {}

export class TheHouseOverview extends React.Component<TheHouseOverviewProps, {}> {
  public render() {
    return (
      <div className="theHouseOverview">
        {this.renderFeature(
          'Privézwembad',
          'Geniet in alle rust en privacy van dit mooie zwembad.',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          true
        )}
        {this.renderFeature(
          '4 slaapkamers',
          'Met bedden voor 8 volwassenen, plus 1 kinderbedje',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          false
        )}
        {this.renderFeature(
          'Volledig voorziene keuken',
          'Gezellige keuken met alle voorzieningen!',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          true
        )}
        {this.renderFeature(
          'Ruime woon/eetkamer',
          'Veel plaats!',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          false
        )}
        {this.renderFeature(
          'Dubbele carport',
          'Er is buiten veel plaats, ondermeer met een dubbele carport, 2 terrassen, tuinhuis, BBQ, ...',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          true
        )}
      </div>
    );
  }

  private renderFeature = (title: string, text: string, backgroundImage: string, isEven: boolean) => {
    const imageCol = (
      <Col sm={12} md={4}>
        <div className="imageContainer wow jackInTheBox">
          <a href="/nl/fotos/binnen" style={{ backgroundImage: `url(${backgroundImage})` }} />
        </div>
      </Col>
    );
    const textCol = (
      <Col sm={12} md={8}>
        <h3>{title}</h3>
        <Markdown content={text} />
      </Col>
    );
    return (
      <div className={cn('feature', isEven ? 'even' : 'odd')}>
        <Container>
          {isEven ? (
            <Row>
              {imageCol}
              {textCol}
            </Row>
          ) : (
            <Row>
              {textCol}
              {imageCol}
            </Row>
          )}
        </Container>
      </div>
    );
  };
}
