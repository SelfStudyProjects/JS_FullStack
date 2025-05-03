import React from 'react';
import axios from 'axios';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        axios.delete(url)
            .then((response) => {
                this.props.stateRefresh();
            });
    }

    render() {
        return   (
            <button onClick={() => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;