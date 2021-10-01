import axios from "axios"
import React from "react";
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Item.css';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/items/${this.props.match.params.name}`)
        .then((res) => {
            this.setState({item: res.data})
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

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
            <div className="item-container" key={this.state.item.name}>
                <Card className="card">
                    <CardBody>
                    <CardTitle tag="h3">{this.state.item.name}</CardTitle>
                    <CardSubtitle tag="h4">Price: {this.state.item.price} </CardSubtitle>
                    <CardText tag="h5">Description: {this.state.item.desc} </CardText>
        

                    <Link to='/items'><Button className="btn btn-all" color="primary">All items</Button></Link>
                    <Link to={`/items/${this.state.item.name}/edit`} params={{item : this.state.item}}><Button className="btn btn-edit" color="secondary">Edit item</Button></Link>
                    <Button className="btn btn-delete" color="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(this.state.item.name)}}>Delete</Button>

                    </CardBody>

                </Card>
            </div>
        )
    }
}

export default Item;