import React, { Component } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

const URL = 'http://10.0.1.9:8080/api/v1';
let compteur = 100;
class RecipeList extends Component {
  state = {
    data: [],
    createMode: false
  };
  componentDidMount() {
    this.getAll();
  }
  toggle = () => {
    this.postRecipe();
    this.setState({ createMode: !this.state.createMode });
  };

  getAll = () => {
    Axios.get(`${URL}/recipes`)
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  postRecipe = () => {
    var new_recipe = {
      name: 'Beydi Sanogo',
      picture:
        'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/50003317_3180236092022937_2948138484814053376_n.jpg?_nc_cat=103&_nc_ht=scontent-cdt1-1.xx&oh=aebc55580525e9a9363c3dabf06d71a1&oe=5CE9C2DC',
      description: 'JE SUIS NUL A FIFA SHARIF IL M A VIOLE 6/1',
      ingredients: [
        {
          recipeID: compteur++,
          ingredientId: 1,
          name: 'Beydi Sanogo',
          quantity: 2,
          unit: 'oz'
        }
      ],
      instructions: '',
      id: compteur++
    };
    Axios.post(`${URL}/recipes/`, new_recipe, {
      header: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  delete = id => () => {
    this.setState({ data: this.state.data.filter(recipe => recipe.id !== id) });
    Axios.delete(`${URL}/recipes/${id}`);
  };

  edit = recipe => {
    var temp = this.state.data.filter(item => recipe.id !== item.id);
    temp.push(recipe);

    this.setState({ data: temp });
    Axios.patch(`${URL}/recipes/`, recipe, {
      header: { 'Content-Type': 'application/json' }
    });
  };

  add = recipe => {
    this.setState({ createMode: !this.state.createMode });
    var new_recipe = {
      ...recipe,
      ingredients: [
        {
          recipeID: compteur++,
          ingredientId: 1,
          name: 'Beydi Sanogo',
          quantity: 2,
          unit: 'oz'
        }
      ],
      instructions: '',
      id: compteur++
    };
    Axios.post(`${URL}/recipes/`, new_recipe, {
      header: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    var temp = this.state.data;
    temp.push(new_recipe);

    this.setState({ data: temp });
  };

  render() {
    let { data } = this.state;
    return (
      <Container>
        <Row>
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
          <Col md="auto">
            <FontAwesomeIcon icon={faPlusCircle} onClick={this.toggle} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecipeList;
