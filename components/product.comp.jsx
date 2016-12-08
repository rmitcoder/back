import React from 'react';
import axios from 'axios';
import PriceList from './priceList.comp';

class GetPrice extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            currentPrice: {}
            //cart: []
        }
    }

    componentDidMount() {
        let selectedProduct = JSON.parse(localStorage.selectedDocs);
        let _self = this;
        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        let language = ''
        if(selectedProduct.sourceLanguage === 'English'){
            language = selectedProduct.targetLanguage;
        }else{
            language = selectedProduct.sourceLanguage;
        }/*
            just 1 language is enough to get the data except English
        */

        axios.get('http://localhost/api/api/get/price/'+selectedProduct.document+'/'+language,config)
            .then(function(response){
                _self.setState({
                    currentPrice: response.data
                });
            });

    }



    render() {

                return(

                    <div className="jumbotron text-center">
                        <h1>Product</h1>
                        <PriceList priceData={this.state.currentPrice}/>
                    </div>
                    )

            }
}

export default GetPrice;