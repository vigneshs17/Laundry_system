import axios from "axios"
import React from "react";
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Invoice.css';

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
                <Card className="card">
                    <CardBody>
                    <CardTitle tag="h3">Customer name: {this.state.invoice.username}</CardTitle>
                    <CardSubtitle tag="h5">Date of purchase: {this.state.invoice.created_at} </CardSubtitle>
                    <CardText>
                        <Table className="table">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th colSpan="3"></th>
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
                    <CardText tag="h6">Total amount: {this.state.invoice.total_amount} </CardText>
                    <CardText tag="h6">Total quantity: {this.state.invoice.total_number} </CardText>
        

                    <Link to='/invoices'><Button className="btn btn-all" color="primary">All invoices</Button></Link>

                    </CardBody>

                </Card>
            </div>
        )
    }
}

export default Invoice;