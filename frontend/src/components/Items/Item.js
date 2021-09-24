import axios from "axios"
import React from "react"
import { Button, Card } from 'react-bootstrap';

function Item(props) {

    return (
                <div className="item-details">
                    <div>Name: {props.item.name}</div>
                    <div>Price: {props.item.price} </div>
                    <div>Description: {props.item.desc} </div>
                </div>
    )
}

export default Item;