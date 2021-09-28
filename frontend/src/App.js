import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import ItemsList from './components/Items/ItemsList';
import AddItem from './components/Items/AddItem';
import EditItem from './components/Items/EditItem';
import Item from './components/Items/Item';
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';

class App extends React.Component {
  render(){
      return (
        <BrowserRouter>
          <Header/>
          <Switch>
              <Route path='/items' exact component={ItemsList}/>
              <Route path='/items/new' component={AddItem}/>
              <Route path='/items/:name/edit' component={EditItem}/>
              <Route path='/items/:name' exact component={Item}/>
              <Redirect from='*' to='/'/>
          </Switch>
        </BrowserRouter>

    );
  }
}

export default App;
