import React, { Component } from 'react';
import { Col, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class IngredientDetails extends Component {
  state = {
    ingredient: this.props.ingredient,
    editMode: this.props.ingredient ? false : true
  };

  toggle = () => {
    this.state.editMode && this.props.edit(this.state.ingredient);
    this.setState({ editMode: !this.state.editMode });
  };

  submit = () => {
    this.state.editMode && this.props.add(this.state.ingredient);
    this.setState({ editMode: !this.state.editMode });
  };

  handleEditName = event => {
    this.setState({
      ingredient: { ...this.state.ingredient, name: event.target.value }
    });
  };
  render() {
    return (
      <tr>
        <td>
          {this.state.editMode ? (
            <Input
              defaultValue={this.state.ingredient && this.state.ingredient.name}
              onChange={this.handleEditName}
            />
          ) : (
            <p>{this.state.ingredient.name}</p>
          )}
        </td>
        <td>
          {this.props.ingredient && (
            <Col md="auto">
              <FontAwesomeIcon icon={faEdit} onClick={this.toggle} />
              <FontAwesomeIcon icon={faTrash} onClick={this.props.delete} />
            </Col>
          )}
          {this.props.ingredient === undefined && (
            <Button onClick={this.submit}>Submit</Button>
          )}
        </td>
      </tr>
    );
  }
}

export default IngredientDetails;
