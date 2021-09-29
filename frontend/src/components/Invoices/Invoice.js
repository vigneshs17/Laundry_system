import axios from "axios"
import React from "react";
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: [],
            itemList: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/invoices/${this.props.match.params.id}`)
        .then((res) => {
            this.setState({invoice: res.data});
            this.setState({itemList: this.state.invoice.items})
            console.log(res.data);
        })
        .catch((err) => console.log(err));
        var created_at = this.state.invoice.created_at;
        var date = moment(created_at);
        var dateComponent = date.utc().format('YYYY-MM-DD');
        var timeComponent = date.utc().format('HH:mm:ss');
        // this.setState({invoice.created_at dateComponent + ' ' + timeComponent});
        console.log(this.state.invoice.created_at);
    };

    handleDelete(id) {
        axios.delete(`http://localhost:8000/invoices/${id}`).then(res => {
            this.setState(previousState => {
              return {
                invoicesList: previousState.invoicesList.filter(i => i.id !== id)
              };
            });
          })
    }

    render() {
        return (
            <div className="item-container" key={this.state.invoice.id}>
                <Card>
                    <CardBody>
                    <CardTitle tag="h5">Customer name</CardTitle>
                    <CardTitle tag="h5">{this.state.invoice.username}</CardTitle>
                    <CardSubtitle tag="h6">Date of purchase: {this.state.invoice.created_at} </CardSubtitle>
                    <CardText>
                        <Table>
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
                                    </tr>    
                                )}
                            </tbody>
                        </Table>
                    </CardText>
                    <CardText>Total amount: {this.state.invoice.total_amount} </CardText>
                    <CardText>Total quantity: {this.state.invoice.total_number} </CardText>
        

                    <Link to='/invoices'><Button color="primary">All invoices</Button></Link>
                    <Link to={`/invoices/${this.state.invoice.id}/edit`} params={{invoice : this.state.invoice}}><Button color="secondary">Edit invoice</Button></Link>

                    </CardBody>

                </Card>
            </div>
        )
    }
}

export default Invoice;