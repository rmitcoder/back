import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Panel,Button,ListGroup,ListGroupItem,Badge ,Modal,Table,InputGroup} from 'react-bootstrap';


class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart:{
                items: props.cartData.items,
                totalPrice: props.cartData.totalPrice
            },
            showCart: false
        };
        this.show = this.show.bind(this);
        this.hideCart  = this.hideCart.bind(this);
        this.addMoreDoc = this.addMoreDoc.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);

    }

    addMoreDoc(event){
        event.stopPropagation();
        hashHistory.push('/services');
    }
    show(){
        this.setState({
            showCart: true
        });

    }
    hideCart(){
        this.setState({
            showCart:false
        })

    }

    handleCheckout(){
        // if(confirm('This button is currently in test and all data will be erased and back to Homepage, do you' +
        //         'want to continue?')){
        //     let cart = JSON.parse(localStorage.cart);
        //     this.printOrder(cart);
        //     hashHistory.push('/');
        //     localStorage.clear();
        // }
        hashHistory.push('/upload');
    }
    printOrder(cart){
        let total = parseInt(cart.totalPrice);
        let itemNum = cart.items.length;
        let items = cart.items;
        items.map((item,index) => {
            console.log('your order:'+itemNum+' services this is '+(parseInt(index)+1)+' document' +
                ', document name is:'+item.doc+' translate '+item.dir+' '+ item.lang+' the ' +
                'qty of hard copy is:'+item.extraCop);
        });
        console.log('total price is '+total);
    }
    remove(item){
        let newState = this.state.cart;
        const deletedItemPrice = item.subTotal;
        if (newState.items.indexOf(item) > -1) {
            newState.items.splice(newState.items.indexOf(item), 1);
            newState.totalPrice -=  deletedItemPrice;
            this.setState({
                cart: newState
            });
            localStorage.cart = JSON.stringify(newState);
        }


    }

    calculateTotal(items){
        let sum = 0;
        items.map((item) => {
            sum += item.subTotal;
        });
        return sum;
    }


    updateItem(cart,attr,item,opt,val){
        cart.map((carItem) =>{
            if(carItem.id === item.id){
                if(opt === '+='){
                    item[attr] += val;
                }else if(opt === '-='){
                    item[attr] -= val;
                }
            }
        });
    }
    edit(item,event){
        const args = event.target.id.split(':');
        const elementId = args[0];
        const action = args[1];
        let updatedCart = this.state.cart;
        let QtyInput = ReactDOM.findDOMNode(this.refs[elementId+':qty']);
        let copyQty = parseInt(QtyInput.value);
        if(action === 'add'){
            QtyInput.value = copyQty + 1;
            this.updateItem(updatedCart.items,'subTotal',item,'+=',10);
            updatedCart.totalPrice = this.calculateTotal(updatedCart.items);
        }else if(action === 'subs'){
            if(copyQty <= 0){
                return;
            }
            QtyInput.value = copyQty - 1;
            this.updateItem(updatedCart.items,'subTotal',item,'-=',10);
            updatedCart.totalPrice = this.calculateTotal(updatedCart.items);
        }
        this.setState({
            cart: updatedCart
        });
        localStorage.cart = JSON.stringify(this.state.cart);

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cart: nextProps.cartData,
        });

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
                    <td><Button bsStyle="danger" onClick={this.remove.bind(this,item)} id={'btn-'+item.id}>remove</Button></td>
                </tr>
            )
        });
        return(

            <div  >
                <Panel style={this.props.panelStyle.tab} header="Shopping Cart" bsStyle="info" >
                        <ListGroup fill>
                            <ListGroupItem><Button bsStyle="success" onClick={this.show} >ViewCart <Badge>{this.state.cart.items.length}</Badge></Button></ListGroupItem>
                            <ListGroupItem><Button onClick={this.handleCheckout} >CheckOut</Button></ListGroupItem>
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