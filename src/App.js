import React, { Component } from 'react';
import './App.css';
import RecipeDetails from './components/RecipeDetails';
import { Row, Container } from 'reactstrap';
import { MOCK } from './Mock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            {MOCK.map(recipe => {
              return <RecipeDetails recipe={recipe} key={recipe.id} />;
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
