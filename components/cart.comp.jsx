import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Panel,Button,ListGroup,ListGroupItem,Badge ,Modal,Table,InputGroup} from 'react-bootstrap';


class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cart:{
                items: props.cartData.items,
                totalPrice: props.cartData.totalPrice
            },
            showCart: false
        }
        this.show = this.show.bind(this);
        this.hideCart  = this.hideCart.bind(this);
        this.addMoreDoc = this.addMoreDoc.bind(this);
        this.edit = this.edit.bind(this);
        this.test = this.test.bind(this);

    }

    addMoreDoc(event){
        event.stopPropagation();
        hashHistory.push('/services');
    }
    show(){
        this.setState({
            showCart: true
        });


        console.log(this.state.cart);

    }
    hideCart(){
        this.setState({
            showCart:false
        })

    }
    test(e){
        e.stopPropagation();
        hashHistory.push('/');
        localStorage.clear();
    }
    delete(item){
        const newState = this.state.cart.items;
        if (newState.indexOf(item) > -1) {
            newState.splice(newState.indexOf(item), 1);
            this.setState({cart: {items: newState} })
            localStorage.cart = JSON.stringify(this.state.cart.items);
        }

    }

    edit(item,event){
        const args = event.target.id.split(':');
        const elementId = args[0];
        const action = args[1];
        let updatedCart = this.state.cart.items;
        // let itemIndex = updatedCart.indexOf(item);
        // let sumOfPrice = 0;
        let currentQty = ReactDOM.findDOMNode(this.refs[elementId+':qty']);
        if(action === 'add'){
            currentQty.value = (parseInt(currentQty.value) + 1);
        }else if(action === 'subs'){
            if(parseInt(currentQty.value) <= 0){
                return;
            }
            currentQty.value = (parseInt(currentQty.value) - 1);
        }

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cart: nextProps.cartData,
        });
        console.log((nextProps.cartData));
    }
    render(){
        const cartItemRow = this.state.cart.items.map((item) => {
            return (
                <tr key={item.id} id={item.id}>
                    <td>{item.id}</td>
                    <td>{item.doc}</td>
                    <td>{item.dir}</td>
                    <td>{item.lang}</td>
                    <td>
                    <InputGroup bsSize="small">
                        <InputGroup.Button>
                            <Button bsStyle="info"  onClick={this.edit.bind(this,item)} id={'item-'+item.id+':add'}>+</Button>
                        </InputGroup.Button>
                        <input className="form-control"  readOnly type="text" ref={'item-'+item.id+':qty'} defaultValue={item.extraCop}/>
                        <InputGroup.Button>
                            <Button bsStyle="info"  onClick={this.edit.bind(this,item)} id={'item-'+item.id+':subs'}>-</Button>
                        </InputGroup.Button>
                    </InputGroup>
                    </td>
                    <td>${item.subTotal}</td>
                    <td><Button bsStyle="danger" onClick={this.delete.bind(this,item)} id={'btn-'+item.id}>remove</Button></td>
                </tr>
            )
        });
        return(

            <div >
                <Panel style={this.props.panelStyle.tab} header="Shopping Cart" bsStyle="info" >
                        <ListGroup fill>
                            <ListGroupItem><Button bsStyle="success" onClick={this.show} >ViewCart <Badge>{this.state.cart.items.length}</Badge></Button></ListGroupItem>
                            <ListGroupItem><Button onClick={this.test} >CheckOut</Button></ListGroupItem>
                        </ListGroup>
                </Panel>

                <Modal show={this.state.showCart} bsSize="large" onHide={this.hideCart}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Orders</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Document</th>
                                <th>Direction</th>
                                <th>Language</th>
                                <th>Extra Copy</th>
                                <th>Sub-Total</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.cart.items.length?cartItemRow :null}
                            <tr>
                                <td colSpan="6" className="text-right">Total Price $:</td>
                                <td >{this.state.cart.totalPrice}</td>
                            </tr>
                            </tbody>
                        </Table>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.hideCart}>Close</Button>
                        <Button bsStyle="success"  onClick={this.addMoreDoc}>Continue Shopping</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default Cart;