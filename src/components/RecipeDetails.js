import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Col,
  Row,
  Input,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class RecipeDetails extends Component {
  state = {
    recipe: this.props.recipe,
    editMode: this.props.recipe ? false : true
  };

  toggle = () => {
    this.state.editMode && this.props.edit(this.state.recipe);
    this.setState({ editMode: !this.state.editMode });
  };
  submit = () => {
    this.state.editMode && this.props.add(this.state.recipe);
    this.setState({ editMode: !this.state.editMode });
  };
  handleEditName = event => {
    this.setState({
      recipe: { ...this.state.recipe, name: event.target.value }
    });
  };
  handleEditPicture = event => {
    this.setState({
      recipe: { ...this.state.recipe, picture: event.target.value }
    });
  };
  handleEditDescription = event => {
    this.setState({
      recipe: { ...this.state.recipe, description: event.target.value }
    });
  };

  render() {
    return (
      <Col md={4}>
        <Card>
          <CardBody>
            <Row className="justify-content-between">
              <Col md="auto">
                {this.state.editMode ? (
                  <Input
                    defaultValue={this.state.recipe && this.state.recipe.name}
                    onChange={this.handleEditName}
                  />
                ) : (
                  <CardTitle>{this.state.recipe.name}</CardTitle>
                )}
              </Col>
              {this.props.recipe && (
                <Col md="auto">
                  <FontAwesomeIcon icon={faEdit} onClick={this.toggle} />
                  <FontAwesomeIcon icon={faTrash} onClick={this.props.delete} />
                </Col>
              )}
            </Row>
          </CardBody>
          {this.state.editMode ? (
            <Input
              defaultValue={this.state.recipe && this.state.recipe.picture}
              onChange={this.handleEditPicture}
            />
          ) : (
            <CardImg
              top
              width="100%"
              src={this.state.recipe.picture}
              alt="Card image cap"
            />
          )}

          <CardBody>
            {this.state.editMode ? (
              <textarea
                defaultValue={
                  this.state.recipe && this.state.recipe.description
                }
                onChange={this.handleEditDescription}
              />
            ) : (
              <CardText>{this.state.recipe.description}</CardText>
            )}
          </CardBody>
          {this.props.recipe === undefined && (
            <Button onClick={this.submit}>Submit</Button>
          )}
        </Card>
      </Col>
    );
  }
}

export default RecipeDetails;
