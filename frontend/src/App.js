import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import ItemsList from './components/Items/ItemsList';
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';

class App extends React.Component {
  render(){
      return (
      <div className="App">
        <BrowserRouter>
          <Header/>
          <Switch>
              <Route path='/items' exact strict component={ItemsList}/>
              <Redirect from='*' to='/'/>
          </Switch>
        </BrowserRouter>

        
      </div>
    );
  }
}

export default App;
