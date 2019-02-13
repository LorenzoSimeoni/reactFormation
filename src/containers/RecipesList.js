import React, { Component } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { Row, Col } from 'reactstrap';
import { MOCK } from '../Mock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class RecipeList extends Component {
  state = {
    data: MOCK,
    createMode: false
  };

  toggle = () => {
    this.setState({ createMode: !this.state.createMode });
  };

  delete = id => () => {
    this.setState({ data: this.state.data.filter(recipe => recipe.id !== id) });
  };

  edit = recipe => {
    var temp = this.state.data.filter(item => recipe.id !== item.id);
    temp.push(recipe);

    this.setState({ data: temp });
  };

  add = recipe => {
    var temp = this.state.data;
    temp.push(recipe);

    this.setState({ data: temp });
  };

  render() {
    let { data } = this.state;
    return (
      <Row>
        <Col md="auto">
          <FontAwesomeIcon icon={faPlusCircle} onClick={this.toggle} />
        </Col>
        {this.state.createMode && <RecipeDetails add={this.add} />}
        {data.map(recipe => {
          return (
            <RecipeDetails
              recipe={recipe}
              key={recipe.id}
              edit={this.edit}
              delete={this.delete(recipe.id)}
            />
          );
        })}
      </Row>
    );
  }
}

export default RecipeList;
