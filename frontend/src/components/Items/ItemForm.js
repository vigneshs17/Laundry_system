import {useState, setState} from 'react';
import axios from 'axios'

const ItemForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')

    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (event) => {
        
        event.preventDefault();
        const values = [name, price, desc];
        let errorMsg = '';
        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if(allFieldsFilled) {
            axios.post('http://localhost:8000/items/', {
                'name': name,
                'price': price,
                'desc': desc
            }).then(res => console.log(res))
            alert('Item created successfully.');
        }
        else {
            errorMsg = 'Please fill out all the fields.';
        }
        setErrorMsg(errorMsg);
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <form>
                    <label>Item name</label>
                    <input
                        className="input-control"
                        type="text"
                        name="name"
                        placeholder="Enter the name of the item"
                        onChange={event => setName(event.target.value)
                    }
                    />
                    <br></br>
                    <label>Item price</label>
                    <input
                        className="input-control"
                        type="text"
                        name="price"
                        placeholder="Enter the price of the item"
                        onChange={event => setPrice(event.target.value)
                        }
                        />

                    <br></br>
                    <label>Item description</label>
                    <input
                        className="input-control"
                        type="text"
                        name="desc"
                        placeholder="Enter the item description"
                        onChange={event => setDesc(event.target.value)}
                        />
                    <br></br>


                <button variant="primary" type="submit" className="submit-btn" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ItemForm;