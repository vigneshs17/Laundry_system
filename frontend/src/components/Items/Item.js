import axios from "axios"
import React from "react";
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';

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
                <Card>
                    <CardBody>
                    <CardTitle tag="h5">{this.state.item.name}</CardTitle>
                    <CardSubtitle tag="h6">Price: {this.state.item.price} </CardSubtitle>
                    <CardText>Description: {this.state.item.desc} </CardText>
        

                    <Link to='/items'><Button color="primary">All items</Button></Link>
                    <Link to={`/items/${this.state.item.name}/edit`} params={{item : this.state.item}}><Button color="secondary">Edit item</Button></Link>
                    <Button color="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(this.state.item.name)}}>Delete</Button>

                    </CardBody>

                </Card>
            </div>
        )
    }
}

export default Item;