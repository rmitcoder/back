import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';



class DocUpload extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cart: {
                items:[],
                totalPrice: 0
            }
        }
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if(localStorage.cart) {
            this.setState({
                cart:{
                    items: JSON.parse(localStorage.cart).items,
                    totalPrice: parseInt(JSON.parse(localStorage.cart).totalPrice)
                }
            });
        }
    }
    handleFileChange(item,event){
        let fileName = item.doc;
        let file = {};
        let files = [];

        files.push(event.target.files);

       //
        //
        console.log("doc name is %s",fileName);

    }
   handleSubmit(event){
    let formData = ReactDOM.findDOMNode(this.refs.myForm);
    let upData = new FormData(formData);
    



    axios.post('http://localhost/api/api/post/upload',upData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err.message)
        });

        this.state.cart.items.map((item,index) => {
            console.log(upData.getAll(item.doc+'-docs[]'));
            upData.set(item.doc+'-docs[]',upData.getAll(item.doc+'-docs[]'),)
        });
       console.log(upData.get('full-name'));
       //console.log(upData.getAll('doc[]'));



       event.preventDefault();

   }

    uploadInput(){
        return(
            this.state.cart.items.map((item,index) => {
                return(
                        <div className="form-group" key={index}>
                            <h4>{item.doc}</h4>
                            <input className="file-input btn btn-info form-control" type="file" id={"item-"+index}
                                 name={item.doc+'-docs[]'}  multiple onChange={(event) =>
                                this.handleFileChange(item, event)}/>
                        </div>
                )
            })
        );



    }

    render() {
        return (
            <div className="jumbotron text-center" >
                <h1>Upload your documents</h1>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="POST" ref="myForm"  id="myForm" name="myForm">
                    {this.uploadInput()}
                    <div className="form-group">
                        <h5>Please enter your full name</h5>
                        <input type="text" ref="full-name" name="full-name" className="form-control" />
                        <h5>Please enter your post address</h5>
                        <input type="text" ref="post-address" name="post-address" className="form-control"/>
                        <h5>Other comment for the services</h5>
                        <textarea className="form-control" ref="comment"  name="comment" rows="2" placeholder="Comments for these documents
                            .e.g where are you going to use driver's licence" />
                    </div>

                    <div className="form-group">
                        <input type="submit" className="btn btn-success form-control" value="Upload"/>
                    </div>

                </form>
            </div>
        )
    }

}


export default DocUpload;