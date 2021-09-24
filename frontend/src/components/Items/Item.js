import axios from "axios"
import React, {useState, useEffect,} from "react";
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({match}) => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = () => {
        axios.get(`http://localhost:8000/items/${match.params.name}`)
        .then((res) => {
            setItem(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="item-container" key={item.name}>
            <div>Name: {item.name}</div>
            <div>Price: {item.price} </div>
            <div>Description: {item.desc} </div>

            <div className='back'>
                <Link to='/items'>All items</Link>
            </div>
        </div>
    )
}

export default Item;