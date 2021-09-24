import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Item from "./Item";
import _ from 'lodash';
import ItemView from './ItemsListView';

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

    const deleteTodoHandler = (name) => {
        axios.delete(`http://localhost:8000/items/${name}`).then(res =>
        console.log(res.data))
    }

    return (
        <div>
            <ItemView itemList = {itemList}/>
        </div>
    );
}

export default Items;