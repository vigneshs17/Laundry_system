import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Item from "./Item";
import _ from 'lodash';
import ItemView from './ItemsListView';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';


function Items(props) {

    const [itemList, setItemList] = useState([{}])
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')

    // read all todos 
    useEffect(() => {
        axios.get('http://localhost:8000/items')
        .then(res => {
            setItemList(res.data)
        })
    }, []);

    return (
        <div>
            <Link to={`/items/new`}><Button color="light">Add new item</Button></Link>
            <ItemView itemList = {itemList}/>
        </div>
    );
}

export default Items;