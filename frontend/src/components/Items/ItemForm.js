import React, {useState, setState} from 'react';
import axios from 'axios'

class ItemForm extends React.Component {
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
                <form>
                        <label>Item name</label>
                        <input
                            type="text"
                            placeholder="Name of the item"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <label>Item price</label>
                        <input
                            type="text"
                            placeholder="Price of the item"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                            />
    
                        <br></br>
                        <label>Item description</label>
                        <input
                            type="text"
                            placeholder="Item description"
                            name="desc"
                            value={this.state.desc}
                            onChange={this.handleChange}
                            />
                        <br></br>
    
    
                    <button variant="primary" type="submit" className="submit-btn" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
};

export default ItemForm;