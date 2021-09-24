import Item from "./Item";
import {Table} from 'reactstrap';

function ItemView(props) {
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.itemList.map(item => <Item item={item}/>)}
                    </tr>
                </tbody>
            </Table>

            
        </div>
    )
}

export default ItemView;