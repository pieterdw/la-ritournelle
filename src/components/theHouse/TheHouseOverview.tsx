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
          '2 terrassen',
          'Een terras bij het zwembad, en een ander terras bij de keuken.',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          false
        )}
        {this.renderFeature(
          '4 slaapkamers',
          'Met bedden voor 8 volwassenen, plus 1 kinderbedje',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          true
        )}
        {this.renderFeature(
          'Volledig voorziene keuken',
          'Gezellige keuken met alle voorzieningen!',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          false
        )}
        {this.renderFeature(
          'Ruime woon/eetkamer',
          'Veel plaats!',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          true
        )}
        {this.renderFeature(
          'Dubbele carport',
          'Er is buiten veel plaats, ondermeer met een dubbele carport, 2 terrassen, tuinhuis, BBQ, ...',
          'https://admin.vakantiehuisantibes.com/storage/home-circle1.png',
          false
        )}
        <div className="details">
          <Container>
            <Row>
              <Col sm={12} md={6} lg={3}>
                <h4>Buiten</h4>
                <ul>
                  {this.getOutside().map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </Col>
              <Col sm={12} md={6} lg={3}>
                <h4>Binnen</h4>
                <ul>
                  {this.getInside().map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </Col>
              <Col sm={12} md={6} lg={3}>
                <h4>Keuken</h4>
                <ul>
                  {this.getKitchen().map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </Col>
              <Col sm={12} md={6} lg={3}>
                <h4>Overige</h4>
                <ul>
                  {this.getOther().map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  private renderFeature = (title: string, text: string, backgroundImage: string, isEven: boolean) => {
    const imageCol = (
      <Col sm={12} md={5} lg={4} xl={3}>
        <div className="imageContainer wow jackInTheBox">
          <a href="/nl/fotos/binnen" style={{ backgroundImage: `url(${backgroundImage})` }} />
        </div>
      </Col>
    );
    const textCol = (
      <Col sm={12} md={7} lg={8} xl={9}>
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

  private getInside = () => {
    return [
      'Woonkamer',
      'Keuken',
      'Slaapkamer met bed 140cm en lavabo',
      'Slaapkamer met bed 160cm',
      'Slaapkamer met stapelbed 2P en lavabo',
      'Badkamer met douche, lavabo en toilet',
      'Apart toilet'
    ];
  };

  private getOutside = () => {
    return [
      'Privézwembad',
      'Terras vooraan',
      'Terras achteraan',
      'Barbeque',
      'Tuinmeubilair',
      'Carport voor 2 wagens',
      'Buitendouche',
      'Onheinde tuin'
    ];
  };

  private getKitchen = () => {
    return [
      'Diepvriezer',
      'Koelkast',
      'Koffiezet',
      'Microgolf',
      'Oven',
      'Vaatwasser',
      'Toaster',
      'Broodrooster',
      'Waterkoker'
    ];
  };

  private getOther = () => {
    return [
      'Wifi',
      'Wasmachine',
      'Stofzuiger',
      'Strijkijzer',
      'Radio',
      'Verwarming',
      'Kinderbed',
      'Kinderstoel',
      'Muggenramen'
    ];
  };
}
