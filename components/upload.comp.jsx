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
            },
            uploadFiles:[]
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
        this.setState({
            uploadFiles: files
        });

       //
        //
        console.log("doc name is %s",fileName);

    }
   handleSubmit(event){
    let config = {
       headers:{
           "Content-Type":"multipart/form-data"
       }
    }
    let data = new FormData();

    console.log(this.state.uploadFiles);
    axios.post('http://localhost/api/api/post/upload',data,config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err.message)
        });
    event.preventDefault();
   }

    uploadInput(){
        return(
            this.state.cart.items.map((item,index) => {
                return(
                        <div className="form-group" key={index}>
                            <h4>{item.doc}</h4>
                            <input className="file-input btn btn-info form-control" type="file" id={"item-"+index} name="docs[]"
                                   multiple onChange={(event) =>
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
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    {this.uploadInput()}
                    <div className="form-group">
                        <h5>Please enter your full name</h5>
                        <input type="text" ref="full-name" className="form-control"/>
                        <h5>Please enter your post address</h5>
                        <input type="text" ref="post-address" className="form-control"/>
                        <h5>Other comment for the services</h5>
                        <textarea className="form-control" ref="comment" rows="2" placeholder="Comments for these documents
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