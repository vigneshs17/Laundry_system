import React from 'react';
import axios from 'axios'
import _ from 'lodash';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';


class Invoices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invoicesList: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    // read all todos 
    componentDidMount() {
        axios.get('http://localhost:8000/invoices')
        .then(res => {
            this.setState({invoicesList: res.data})
            for (const invoice of this.state.invoicesList) {
                console.log(invoice)
            }
        })
    }

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
            <div>
                <Link to={`/invoices/new`}><Button color="success">Add new invoice</Button></Link>
                <Table bordered>
                    <thead>
                        <tr>
                        <th>Username</th>
                        <th>Date of purchase</th>
                        <th>Total amount</th>
                        <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.invoicesList.map(invoice => 
                            <tr key={invoice.id}> 
                                <td>{invoice.username}</td>
                                <td>{invoice.created_at}</td>
                                <td>{invoice.total_amount}</td>
                                <td><Link to={`/invoices/${invoice._id}`}><Button color="primary">View</Button></Link></td>
                                <td><Link to={`/invoices/${invoice.id}/edit`} params={{invoice : invoice}}><Button color="secondary">Edit</Button></Link></td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Invoices;