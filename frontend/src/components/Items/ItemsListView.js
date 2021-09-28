import Item from "./Item";
import {Table, Button, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios'
import React from "react";

class ItemView extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(name) {
        axios.delete(`http://localhost:8000/items/${name}`).then(res =>
        console.log(res.data))
    }
    
    render() {
        return (
            <div>
                <Table bordered>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.itemList.map(item => 
                            <tr key={item.id}> 
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.desc}</td>
                                <td>
                                    <Link to={`/items/${item.name}`}><Button color="primary">View</Button></Link>
                                </td>
                                <td><Button color="secondary">Edit</Button></td>
                                <td><Button color="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(item.name)}}>Delete</Button></td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
    
                
            </div>
        )
    }
}

export default ItemView;