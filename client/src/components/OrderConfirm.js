import React from 'react';
import Navbar from './Navbar';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import s from '../styles/OrderConfirm.module.scss';
import '../styles/geosuggest.scss'

class OrderConfirm extends React.Component{
    state = {
        address: this.props.user && this.props.user.address,
    }

    componentDidMount(){
        this.refs.geo.update(this.props.user && this.props.user.address);
    }

    render(){
        return(
            <div>
                <Navbar />
                <Geosuggest
                autoActivateFirstSuggest
                className={s.geo}
                country='us'
                placeholder='Type address here'
                initialValue={this.state.address}
                queryDelay={500}
                ref='geo'/>
            </div>
        )
    }
}

export default connect(state => {
    return{
        user: state.user,
    }
})(OrderConfirm);