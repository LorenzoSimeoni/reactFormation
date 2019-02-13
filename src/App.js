import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';

import RecipeList from './containers/RecipesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <RecipeList />
        </Container>
      </div>
    );
  }
}

export default App;
