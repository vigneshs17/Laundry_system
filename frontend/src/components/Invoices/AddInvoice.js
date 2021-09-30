import React from 'react';
import axios from 'axios'
import {Form, Button, Label, Input, FormGroup, Table} from 'reactstrap';

class AddInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            created_at: '',
            username: '',
            items: [],
            itemList: [],
            total_amount: '',
            total_number: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8000/items')
        .then(res => {
            this.setState({itemList: res.data})
        })
    }
    handleChange(event) {   
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleAddItem(item) {
        console.log(item);
        const items = this.state.items;
        items.push(item);
        this.setState({items: items});
        console.log(this.state.items);
    }

    handleRemoveItem(item) {
        const index = this.state.items.indexOf(item);
        if(index>=0) {
            this.state.items.splice(index, 1);
        }
        this.setState({items: this.state.items});
    }

    handleSubmit(event) {
        event.preventDefault();
        const values = [this.state.username, this.state.items];
        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        const created_at_time = new Date();
        var mongoObjectId = function () {
            var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
            return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
                return (Math.random() * 16 | 0).toString(16);
            }).toLowerCase();
        };
        var invoice_id = mongoObjectId();
        var invoice_amount = 0;
        for(var i = 0;i<this.state.items.length;i++) {
            invoice_amount = invoice_amount + this.state.items[i].price;
        }

        if(allFieldsFilled) {
            console.log('all fields filled');
            axios.post('http://localhost:8000/invoices/', {
                'id': invoice_id,
                'created_at': created_at_time,
                'items': this.state.items,
                'username': this.state.username,
                'total_number': this.state.items.length,
                'total_amount': invoice_amount
            }).then(res => console.log(res))
        }
        else {
            this.state.errorMsg = 'Please fill out all the fields.';
        }

        this.props.history.push(`/invoices/${this.state.id}`)
    };

    render() {
        return (
            <div className="main-form">
                {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                

                <Form>
                    <FormGroup>
                        <Label>User name</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Enter the name of the customer"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <h2>Items in cart</h2>
                    <Table bordered>
                        
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map(item => 
                                <tr key={item.id}> 
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.desc}</td>
                                    <td><Button color="danger" onClick={() => {this.handleRemoveItem(item)}}>Remove item from invoice</Button></td>

                                </tr>    
                            )}
                        </tbody>
                    </Table>
                    <Table bordered size="sm">
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
                                    <td><Button color="primary" onClick={() => {this.handleAddItem(item)}}>Add item to invoice</Button></td>
                                </tr>    
                            )}
                        </tbody>
                    </Table>

                    <Button color="success" type="submit" className="submit-btn" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default AddInvoice;