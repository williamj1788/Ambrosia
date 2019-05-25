import React from 'react';
import Navbar from './Navbar';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import s from '../styles/OrderConfirm.module.scss';
import '../styles/geosuggest.scss'
import keys from '../key';

class OrderConfirm extends React.Component{
    state = {
        address: this.props.user && this.props.user.address,
        center: false,
    }

    componentDidMount(){
        this.refs.geo.focus();
    }

    handleSuggest = suggest => {
        this.setState({
            center: suggest.location
        });
    }

    render(){
        const { address, center } = this.state;
        return(
            <div>
                <Navbar />
                <div className={s.flexContainer}>
                    <Geosuggest
                    autoActivateFirstSuggest
                    className={s.geo}
                    country='us'
                    placeholder='Type address here'
                    initialValue={address}
                    queryDelay={500}
                    ref='geo'
                    onSuggestSelect={this.handleSuggest} />
                    <button className={s.button} type='button' >Confirm Address</button>
                </div>
                
                <div className={s.map}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: keys.googleID }}
                    defaultCenter={{lat: 35.0527, lng: -78.8784 }}
                    center={center}
                    defaultZoom={11}
                    zoom={center && 18}
                    options={{ minZoom: 11 }}>
                        {center && <Marker lat={center.lat} lng={center.lng} text='Home' />}
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

const Marker = ({lat, lng}) => {
    return(
        <div className={s.marker} lat={lat} lng={lng}/>
    )
}

export default connect(state => {
    return{
        user: state.user,
    }
})(OrderConfirm);