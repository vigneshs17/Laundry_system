import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/Header';
import ItemsList from './components/Items/ItemsList';
import ItemForm from './components/Items/ItemForm';
import Item from './components/Items/Item';
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';

class App extends React.Component {
  render(){
      return (
        <BrowserRouter>
          <Header/>
          <Switch>
              <Route path='/items' exact component={ItemsList}/>
              <Route path='/items/new' exact component={ItemForm}/>
              <Route path='/items/:name' exact component={Item}/>
              <Redirect from='*' to='/'/>
          </Switch>
        </BrowserRouter>

    );
  }
}

export default App;
