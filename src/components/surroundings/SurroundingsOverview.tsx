import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import { SurroundingValue } from 'src/models/Surrounding';
import { SurroundingDistance } from 'src/models/SurroundingDistance';
import { SurroundingsPageProps } from '../../containers/SurroundingsPage';
import { cn } from '../../utils/cn';
import { tr } from '../../utils/tr';
import { Markdown } from '../Markdown';

export interface SurroundingsOverviewProps extends SurroundingsPageProps {}

export class SurroundingsOverview extends React.Component<SurroundingsOverviewProps, {}> {
  public render() {
    console.log(this.props);

    return (
      <div className="surroundingsOverview">
        {this.renderHighlights()}
        {this.renderDistances()}
      </div>
    );
  }

  private renderHighlights = () => {
    return this.props.highlights.map((f, i) => this.renderHighlight(f.value, i));
  };

  private renderDistance = (distance: SurroundingDistance, index: number) => {
    return (
      <div className="distance" key={index}>
        {distance.value.title}
        <span>{distance.value.distance}</span>
      </div>
    );
  };

  private renderDistances = () => {
    const { distances } = this.props;
    const firstCount = Math.ceil(distances.length / 3);
    const firstBatch = distances.slice(0, firstCount);
    const secondBatch = distances.slice(firstCount, 2 * firstCount);
    const thirdBatch = distances.slice(2 * firstCount);
    console.log(firstCount, distances);

    return (
      <div className="distances">
        <Container>
          <Row>
            <Col sm={12} md={6} lg={4}>
              {firstBatch.map(this.renderDistance)}
            </Col>
            <Col sm={12} md={6} lg={4}>
              {secondBatch.map(this.renderDistance)}
            </Col>
            <Col sm={12} md={6} lg={4}>
              {thirdBatch.map(this.renderDistance)}
            </Col>
          </Row>
        </Container>
      </div>
    );
    // return (
    //   <div className="details">
    //     <Container>
    //       <div className="desc">
    //         <h2>{this.props.details_title}</h2>
    //         <p>{this.props.details_description}</p>
    //       </div>
    //       <Row>
    //         <Col sm={12} md={6} lg={3}>
    //           <h4>{this.props.details_1_title}</h4>
    //           <ul>
    //             {items1.map((x, i) => (
    //               <li key={i}>{x}</li>
    //             ))}
    //           </ul>
    //         </Col>
    //         <Col sm={12} md={6} lg={3}>
    //           <h4>{this.props.details_2_title}</h4>
    //           <ul>
    //             {items2.map((x, i) => (
    //               <li key={i}>{x}</li>
    //             ))}
    //           </ul>
    //         </Col>
    //         <Col sm={12} md={6} lg={3}>
    //           <h4>{this.props.details_3_title}</h4>
    //           <ul>
    //             {items3.map((x, i) => (
    //               <li key={i}>{x}</li>
    //             ))}
    //           </ul>
    //         </Col>
    //         <Col sm={12} md={6} lg={3}>
    //           <h4>{this.props.details_4_title}</h4>
    //           <ul>
    //             {items4.map((x, i) => (
    //               <li key={i}>{x}</li>
    //             ))}
    //           </ul>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </div>
    // );
  };

  private renderHighlight = (surrounding: SurroundingValue, index: number) => {
    const isEven = index % 2 === 0;
    const imageCol = (
      <Col sm={12} md={5} lg={4} xl={3} className="imageCol">
        {surrounding.image && (
          <div className="imageContainer wow jackInTheBox" style={{ animationDelay: index * 60 + 'ms' }}>
            <div style={{ backgroundImage: `url(https://admin.vakantiehuisantibes.com${surrounding.image.path})` }} />
          </div>
        )}
      </Col>
    );
    const textCol = (
      <Col sm={12} md={7} lg={8} xl={9} className="textCol">
        <div className="textContainer wow fadeIn" style={{ animationDelay: index * 60 + 'ms' }}>
          <h3>
            {surrounding.title} <span>{surrounding.distance}</span>
          </h3>
          <Markdown content={surrounding.description} />
          {surrounding.link && (
            <a target="_blank" href={surrounding.link} className="btn btn-primary">
              {tr('moreInfo', this.props.locale)}
            </a>
          )}
        </div>
      </Col>
    );
    return (
      <div className={cn('highlight', isEven ? 'even' : 'odd')} key={index}>
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
