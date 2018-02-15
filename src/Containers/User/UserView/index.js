/**
 * 
 * UserView
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { CircularProgress } from 'material-ui/Progress';

import Card from '../../../Components/Card';
import Table from '../../../Components/Table';
import UserActions from '../../../Actions/UserActions';

const header = ['ID', 'Name', 'Email'];

class CourseView extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(UserActions.getAll()); 
    }
    render() {
        const
        
    }
}
