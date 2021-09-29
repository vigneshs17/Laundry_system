import React from 'react';
import axios from 'axios'
import _ from 'lodash';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';


class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    // read all todos 
    componentDidMount() {
        axios.get('http://localhost:8000/items')
        .then(res => {
            this.setState({itemList: res.data})
        })
    }

    handleDelete(name) {
        axios.delete(`http://localhost:8000/items/${name}`).then(res => {
            this.setState(previousState => {
                return {
                    itemList: previousState.itemList.filter(i => i.name !== name)
                };
            });
        })
    }

    render() {
        return (
            <div>
                <Link to={`/items/new`}><Button color="success">Add new item</Button></Link>
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
                    {this.state.itemList.map(item => 
                        <tr key={item.id}> 
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.desc}</td>
                            <td><Link to={`/items/${item.name}`}><Button color="primary">View</Button></Link></td>
                            <td><Link to={`/items/${item.name}/edit`} params={{item : item}}><Button color="secondary">Edit</Button></Link></td>
                            <td><Button color="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(item.name)}}>Delete</Button></td>
                        </tr>    
                    )}
                </tbody>
            </Table>
            </div>
        );
    }
}

export default Items;