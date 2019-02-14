import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from 'reactstrap';
import Dashboard from './components/Dashboard';
import RecipeList from './containers/RecipesList';
import IngredientList from './containers/IngredientList';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">REACT - Excilys</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/RecipeList">Recipe</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/IngredientList">Ingredient</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Router>
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/RecipeList" component={RecipeList} />
            <Route path="/IngredientList" component={IngredientList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
