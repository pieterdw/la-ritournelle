import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import { SurroundingsPageProps } from '../../containers/SurroundingsPage';
import { cn } from '../../utils/cn';
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
    return this.props.highlights.map((f, i) =>
      this.renderFeature(f.value.title, f.value.description, f.value.image.path, i)
    );
  };

  private renderDistances = () => {
    return null;
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

  private renderFeature = (title: string, text: string, backgroundImage: string, index: number) => {
    const isEven = index % 2 === 0;
    const imageCol = (
      <Col sm={12} md={5} lg={4} xl={3}>
        <div className="imageContainer wow jackInTheBox" style={{ animationDelay: index * 60 + 'ms' }}>
          <div style={{ backgroundImage: `url(https://admin.vakantiehuisantibes.com${backgroundImage})` }} />
        </div>
      </Col>
    );
    const textCol = (
      <Col sm={12} md={7} lg={8} xl={9}>
        <div className="wow fadeIn" style={{ animationDelay: index * 60 + 'ms' }}>
          <h3>{title}</h3>
          <Markdown content={text} />
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
