import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired

    };
    componentDidUpdate(prevProps){
        const { error, alert, message } = this.props;
        if (error !== prevProps.error){
            if (error.msg.name){
                alert.error('Name:'+ error.msg.name.join());
            }
            if (error.msg.email){
                alert.error('Email:' + error.msg.email.join()) ;
            }
            if (error.msg.message){
                alert.error('Email:' + error.msg.message.join()) ;
            }
            if (error.msg.comment){
                alert.error('Email:' + error.msg.comment.join()) ;
            }
        }
        if (message !== prevProps.message){
            if (message.leadDeleted){
                alert.show(message.leadDeleted)
            }
            if (message.addLead){
                alert.success(message.addLead)
            }
        }
    }
    render() {
        return <Fragment />;
    }
}


const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));