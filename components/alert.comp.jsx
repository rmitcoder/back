import {Alert} from 'react-bootstrap';

import React from 'react';

class MyAlert extends React.Component{

    render() {
        return(
            <Alert bsStyle="info">
                <strong>Reminder..</strong> Some information will be here
            </Alert>
        )
    }
}

export default MyAlert;
