import React from 'react';
import { Jumbotron,Button } from 'react-bootstrap';
import MyAlert from './alert.comp';
import { hashHistory } from 'react-router';


class DLComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            stateUse: '',
            reasons: '',
            alert: false,
            buttonDisable: false
        };
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleProceed = this.handleProceed.bind(this);


    }
    handleStateChange(event){
        let s = event.target.value;
        if(s === 'selected'){
            this.state.stateUse = '';
            return;
        }
        this.state.stateUse = s;
        let selectedState = this.state.stateUse;
        let selectedReason = this.state.reasons;
        if(selectedState === 'nsw' && selectedReason === 'getLicence'){
            this.setState({alert: true,buttonDisable:true});
        }else{
            this.setState({alert:false,buttonDisable:false});
        }
        event.stopPropagation();

    }
    handleReasonChange(event){
        let r = event.target.value;
        if(r === 'selected'){
            this.state.reasons = '';
            return;
        }
        this.state.reasons = r;
        let selectedState = this.state.stateUse;
        let selectedReason = this.state.reasons;

        if(selectedState === 'nsw' && selectedReason === 'getLicence'){
            this.setState({alert: true,buttonDisable:true});
        }else{
            this.setState({alert:false,buttonDisable:false});
        }

        event.stopPropagation();
    };
    handleProceed(){
        if(this.state.reasons === '' || this.state.stateUse === ''){
            alert('please select the state or reason');
            return;
        }
        let path ='/services/Driver\'s Licence';
        hashHistory.push(path);
    }


    render() {
        let styleObj = {
            h3:{
                color:'white'
            }

        };





        return(
            <div >
                <Jumbotron>
                    <div className="row col-md-6 col-md-offset-3 " >
                        <h3 style={styleObj.h3}>Which state you are going to use this licence</h3>
                        <select name="state" id="state" onChange={this.handleStateChange} defaultValue="selected" className="form-control">
                            <option value="selected">Select s State</option>
                            <option value="nsw">NSW</option>
                            <option value="vic">VIC</option>
                            <option value="qld">QLD</option>
                            <option value="sa">SA</option>
                            <option value="wa">WA</option>
                            <option value="act">ACT</option>
                            <option value="nt">NT</option>
                        </select>
                    </div>
                    <div className="row col-md-6 col-md-offset-3 ">
                        <h3 style={styleObj.h3}>Which state you are going to use this licence</h3>
                        <select name="state" id="state" onChange={this.handleReasonChange} className="form-control" defaultValue="selected">
                            <option value="selected">Choose a reason</option>
                            <option value="getLicence">I want to get Australian's Licence</option>
                            <option value="drive">Driving in Australia</option>
                            <option value="reason1">Reason1</option>
                            <option value="reason2">Reason2</option>
                        </select>
                        <Button bsStyle="primary" block disabled={this.state.buttonDisable} onClick={this.handleProceed}>
                            Proceed
                        </Button>
                    </div>
                    <div className="row col-md-6 col-md-offset-3" >
                        {this.state.alert? <MyAlert/> : null}
                    </div>
                </Jumbotron>

            </div>
        )
    }
}

export default DLComponent;