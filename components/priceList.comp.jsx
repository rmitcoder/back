import React from 'react';
import ReactDOM from 'react-dom';
import {Panel,Button,ListGroup,ListGroupItem,InputGroup} from 'react-bootstrap';
import Cart from './cart.comp';



class PriceList extends React.Component{
    constructor(){
        super();
        if(localStorage.cart){
            this.state = {
                buttonDisable: false,
                currentCart: {
                    items: JSON.parse(localStorage.cart).items,
                    totalPrice: parseInt(JSON.parse(localStorage.cart).totalPrice)
                }
            }
        }else{
            this.state = {
                buttonDisable: false,
                currentCart: {
                    items: [],
                    totalPrice: 0
                }
            }
        }

        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.add = this.add.bind(this);
        this.substract = this.substract.bind(this);
    }
    addIndex(arr){
        let newArr = []
        arr.map((item,index)=> {
            item.id = index;
            return newArr[index] = arr[index];
        })
        return newArr;
    }
    calculateTotal(items){
        let sum = 0;
        items.map((item) => {
            sum += item.subTotal;
        });
        return sum;
    }
    handleAddToCart(event){
        const priceInfo = this.props.priceData;
        const selectedDoc = JSON.parse(localStorage.selectedDocs);
        let btnId = event.target.id;
        let copyQty = ReactDOM.findDOMNode(this.refs[btnId]).value;//need to do some validation later
        let existCart = [];
        let totalOfCart = this.state.currentCart.totalPrice;
        let item = {};
        let basicPrice = priceInfo[btnId];
        if(window.localStorage && localStorage.cart){
            existCart = JSON.parse(localStorage.cart).items;
        }else{
            existCart = [];
        }
        item.doc = selectedDoc.document;
        item.dir = selectedDoc.direction;
        item.lang = selectedDoc.language;
        item.extraCop = copyQty;
        item.subTotal = basicPrice + 10 * item.extraCop; //Assume we charge $10 for each extra hard copy.
        existCart.push(item);
        existCart = this.addIndex(existCart);
        totalOfCart = this.calculateTotal(existCart);
        this.setState({
            currentCart: {
                items: existCart,
                totalPrice: totalOfCart
            },
            buttonDisable:true
        })

        localStorage.cart = JSON.stringify(this.state.currentCart);

        event.stopPropagation();
    }
    shouldComponentUpdate(nextProps,nextState){

        this.setState({
            currentCart:nextState.currentCart
        });
        localStorage.cart = JSON.stringify(nextState.currentCart);
        return true;

    }
    componentDidMount(){
        console.log('did mount called');
        if(localStorage.cart){
            let storedCart = JSON.parse(localStorage.cart);
            if(storedCart.items.length){
                this.setState({currentCart:storedCart});
            }

        }

    }
    componentWillUnmount(){
        this.state.buttonDisable? false: null;
    }
    add(event){
        event.stopPropagation();
        let btnId = event.target.id;
        let buttonId = '';
        switch (btnId){
            case 'stdAdd':
                buttonId = 'std';
                break;
            case 'expAdd':
                buttonId = 'exp';
                break;
            case 'urgAdd':
                buttonId = 'urg';
                break;
            default:
                null;
                break;
        }
        let inputVal = ReactDOM.findDOMNode(this.refs[buttonId]);
        let num = parseInt(inputVal.value);
        num +=1;
        inputVal.value = num;//to be optimized;

    }

    substract(event){
        event.stopPropagation();
        let btnId = event.target.id;

        let buttonId = '';
        switch (btnId){
            case 'stdSub':
                buttonId = 'std';
                break;
            case 'expSub':
                buttonId = 'exp';
                break;
            case 'urgSub':
                buttonId = 'urg';
                break;
            default:
                null;
                break;
        }
        let inputVal = ReactDOM.findDOMNode(this.refs[buttonId]);
        let num = parseInt(inputVal.value);
        num -=1;
        if(num < 0){
            return;
        }
        inputVal.value = num;//to be optimized;
    }
    render() {
        let StyleObj = {
            tab:{margin: '20px'},

        };
        return(
            <div>
                <div className="row col-md-9">
                    <Panel className="col-md-3" header="Standard" bsStyle="success" style={StyleObj.tab}>
                        <ListGroup fill>
                            <ListGroupItem><h4 >${this.props.priceData.std}</h4></ListGroupItem>
                            <ListGroupItem>3-5 business Day</ListGroupItem>
                            <ListGroupItem>with 1 hard copy</ListGroupItem>
                            <ListGroupItem >
                                Extra Copy
                                <InputGroup>
                                    <InputGroup.Button>
                                        <Button bsStyle="info" onClick={this.add} id="stdAdd">+</Button>
                                    </InputGroup.Button>
                                    <input className="form-control" type="text" ref="std" defaultValue="0"/>
                                    <InputGroup.Button>
                                        <Button bsStyle="info" onClick={this.substract} id="stdSub">-</Button>
                                    </InputGroup.Button>
                                </InputGroup>

                            </ListGroupItem>
                            <ListGroupItem><Button onClick={this.handleAddToCart} disabled={this.state.buttonDisable} id="std" bsStyle="info"><span className='glyphicon glyphicon-shopping-cart'></span>add to cart</Button></ListGroupItem>
                        </ListGroup>
                    </Panel>
                    <Panel className="col-md-3" header="Express" bsStyle="success" style={StyleObj.tab}>
                        <ListGroup fill>
                            <ListGroupItem><h4>${this.props.priceData.exp}</h4></ListGroupItem>
                            <ListGroupItem>In 3 business days   </ListGroupItem>
                            <ListGroupItem>with 1 hard copy</ListGroupItem>
                            <ListGroupItem>
                                Extra Copy
                                <InputGroup>
                                    <InputGroup.Button>
                                        <Button bsStyle="info" onClick={this.add} id="expAdd">+</Button>
                                    </InputGroup.Button>
                                    <input className="form-control" type="text" ref="exp" defaultValue="0"/>
                                    <InputGroup.Button>
                                        <Button bsStyle="info" onClick={this.substract} id="expSub">-</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </ListGroupItem>
                            <ListGroupItem><Button onClick={this.handleAddToCart} disabled={this.state.buttonDisable} id="exp" bsStyle="info"><span className='glyphicon glyphicon-shopping-cart'></span>add to cart</Button></ListGroupItem>
                        </ListGroup>
                    </Panel>
                    <Panel className="col-md-3" header="Urgent" bsStyle="success" style={StyleObj.tab}>
                        <ListGroup fill>
                            <ListGroupItem><h4>${this.props.priceData.urg}</h4></ListGroupItem>
                            <ListGroupItem>Within ONE day</ListGroupItem>
                            <ListGroupItem>with 1 hard copy</ListGroupItem>
                            <ListGroupItem>
                                Extra Copy
                                <InputGroup>
                                    <InputGroup.Button>
                                        <Button bsStyle="info"  onClick={this.add} id="urgAdd">+</Button>
                                    </InputGroup.Button>
                                    <input className="form-control" type="text" ref="urg" defaultValue="0"/>
                                    <InputGroup.Button>
                                        <Button bsStyle="info"  onClick={this.substract} id="urgSub">-</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </ListGroupItem>
                            <ListGroupItem><Button onClick={this.handleAddToCart} disabled={this.state.buttonDisable} id="urg" bsStyle="info"><span className='glyphicon glyphicon-shopping-cart'></span>add to cart</Button></ListGroupItem>
                        </ListGroup>
                    </Panel>
                </div>
                <div className="col-md-3 pull-right" >
                    <Cart panelStyle={StyleObj} cartData={this.state.currentCart} />
                </div>
            </div>
        )
    }
}




export default PriceList;