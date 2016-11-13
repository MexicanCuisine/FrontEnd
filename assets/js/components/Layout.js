import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/exampleActions';
@connect((store) => {
    return {
        user: store.example.user
    }
})
export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser());
    }
    render() {
        return <p>{this.props.user.name}</p>;
    }
}