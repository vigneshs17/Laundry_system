import React, {Component, setState} from 'react';
import axios from 'axios'
import {Form, Button, Label, Input, FormGroup} from 'reactstrap';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            desc: '',
            errorMsg: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {   
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const values = [this.state.name, this.state.price, this.state.desc];
        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if(allFieldsFilled) {
            axios.post('http://localhost:8000/items/', {
                'name': this.state.name,
                'price': this.state.price,
                'desc': this.state.desc
            }).then(res => console.log(res))
        }
        else {
            this.state.errorMsg = 'Please fill out all the fields.';
        }

        this.props.history.push(`/items/${this.state.name}`)
    };

    render() {
        return (
            <div className="main-form">
                {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                <Form>
                    <FormGroup>
                        <Label>Item name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Item price</Label>
                        <Input
                            type="text"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                            />
                    </FormGroup>

                    <FormGroup>
                        <Label>Item description</Label>
                        <Input
                            type="text"
                            name="desc"
                            value={this.state.desc}
                            onChange={this.handleChange}
                            />
                    </FormGroup>

                    <Button color="success" type="submit" className="submit-btn" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default AddItem;