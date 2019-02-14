import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import IngredientDetails from '../components/IngredientDetails';

const URL = 'http://10.0.1.9:8080/api/v1';
class IngredientList extends Component {
  state = {
    data: [],
    createMode: false
  };
  componentDidMount() {
    this.getAll();
  }
  toggle = () => {
    this.setState({ createMode: !this.state.createMode });
  };

  getAll = () => {
    Axios.get(`${URL}/ingredients`)
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  delete = id => () => {
    this.setState({
      data: this.state.data.filter(ingredient => ingredient.id !== id)
    });
    Axios.delete(`${URL}/ingredients/${id}`);
  };

  edit = ingredient => {
    var temp = this.state.data.filter(item => ingredient.id !== item.id);
    temp.push(ingredient);

    this.setState({ data: temp });
    Axios.patch(`${URL}/ingredients/`, ingredient, {
      header: { 'Content-Type': 'application/json' }
    });
  };

  add = ingredient => {
    this.setState({ createMode: !this.state.createMode });
    Axios.post(`${URL}/ingredients/`, ingredient.name, {
      header: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    var temp = this.state.data;
    temp.push(ingredient);

    this.setState({ data: temp });
  };

  render() {
    let { data } = this.state;
    return (
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.createMode && <IngredientDetails add={this.add} />}
            {data.map(ingredient => {
              return (
                <IngredientDetails
                  ingredient={ingredient}
                  key={ingredient.id}
                  edit={this.edit}
                  delete={this.delete(ingredient.id)}
                />
              );
            })}
          </tbody>
        </Table>
        <Col md="auto">
          <FontAwesomeIcon icon={faPlusCircle} onClick={this.toggle} />
        </Col>
      </Row>
    );
  }
}

export default IngredientList;
