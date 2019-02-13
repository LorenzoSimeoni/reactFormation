import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Button,
  CardText,
  Col
} from 'reactstrap';

class RecipeDetails extends Component {
  render() {
      let {name, picture, description} = this.props.recipe;
    return (
      <Col md={4}>
        <Card>
          <CardImg
            top
            width="100%"
            src={picture}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText>{description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default RecipeDetails;
