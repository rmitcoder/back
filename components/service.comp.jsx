import React from 'react';
import axios from 'axios';
import {   hashHistory } from 'react-router';
class ServiceComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            documents: [],
            languages: [],
            selectedVal: {
                document: '',
                direction: '',
                language: ''
            }

        };
        this.handleRedir = this.handleRedir.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };
    componentWillUnmount(){
        console.log('services component is gone ^_^!!');
        console.log(this.state);
    }
    componentDidMount(){
        let _self = this;
        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        axios.all([
            axios.get('http://localhost/api/api/get/allDocs',config),
            axios.get('http://localhost/api/api/get/allLanguages',config)
        ]).then(axios.spread(function(docResponse,lanResponse){
            _self.setState({
                documents: docResponse.data,
                languages: lanResponse.data
            })
        }));
    }

    handleChange(event){
        let selectId = event.target.id;
        let selectValue = event.target.value;
        if(selectValue === 'selected'){
            return;
        }
        let cached = this.state.selectedVal;

        switch (selectId){
            case 'document':
                cached.document = selectValue;
                break;
            case 'direction':
                cached.direction = selectValue;
                break;
            case 'language':
                cached.language = selectValue;
                break;
            default :
                null;
                break;
        }
        //console.log(cached);
        this.setState({
            selectedVal: cached
        });
    }
    handleRedir(event){
        let path = '';
        let selected = this .state.selectedVal;
        if(selected.document === 'Driver\'s Licence')
        {
            path = '/services/Driver\'s Licence Check';

        }else{
            path = '/services/'+selected.document;
        }

        if(selected.doc === '' || selected.dir === '' || selected.language === '' ){
            alert( "Please complete the information ");
            return;
        }

        if(window.localStorage){
            localStorage.selectedDocs = JSON.stringify(selected);
        }else{
            alert('Your browser does not support localStorage');
            return;
        }
        hashHistory.push(path);
        event.stopPropagation();

    }


    render(){

        const docOpt = this.state.documents.map((doc,index)=>{
            return (
                <option value={doc.docName} key={index}>{doc.docName}</option>
            );
        });
        const lanOpt = this.state.languages.map((lan,index) => {
            return (
                <option value={lan.language} key={index}>{lan.language}</option>
            );
        });
        return(
            <div>
                <div className=" jumbotron text-center">
                    <h1>Choose Your Service</h1>
                    <div className="form-inline" >
                        <div className="form-group " >
                            <select name="document" id="document" className="form-control" onChange={this.handleChange} defaultValue="selected" >
                                <option value="selected">Select a Document</option>
                                {docOpt}
                            </select>
                            <select name="direction" id="direction" className="form-control" onChange={this.handleChange} defaultValue="selected" >
                                <option value="selected">Select Direction </option>
                                <option value="From">Translate From</option>
                                <option value="Into">Translate Into</option>
                            </select>
                            <select name="language" id="language" className="form-control" onChange={this.handleChange} defaultValue="selected">
                                <option value="selected">Select a Language</option>
                                {lanOpt}
                            </select>
                            <button className="btn btn-primary" onClick={this.handleRedir}>Quote Now</button>
                        </div>
                    </div>
                </div>

            <div >
                {this.props.children}
            </div>
            </div>


        )
    }
}


export default ServiceComponent;