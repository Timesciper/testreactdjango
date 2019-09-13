import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findLeads, getLeads } from '../../actions/leads';



export class Searcher extends Component {
    static propTypes ={
        leads: PropTypes.array.isRequired,
        findLeads: PropTypes.func.isRequired
    };
    state ={
        value: ''
    };
    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });
    onClick = e => {
        e.preventDefault();
        const {value} = this.state;
        this.props.getLeads();
        this.props.findLeads(value);
        this.setState({
            value: ''
        })

    };
    render() {
        const {value} = this.state;
        return (
            <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="value"
              onChange={this.onChange}
              value={value}
            />
                <button onClick={this.onClick}>Find!</button>
          </div>
        )
    }

}


const mapStateToProps = state => ({
    leads: state.leads.leads //state.leadReducer.leads <- leads is part of state
});

export default connect(mapStateToProps, {findLeads, getLeads})(Searcher);