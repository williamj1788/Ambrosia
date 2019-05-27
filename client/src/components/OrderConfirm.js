import React from 'react';
import Navbar from './Navbar';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import { setUser, clearOrders } from '../redux/action';
import { Redirect } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import truck from '../images/truck_icon.png';
import s from '../styles/OrderConfirm.module.scss';
import '../styles/geosuggest.scss'
import keys from '../key';

class OrderConfirm extends React.Component{
    state = {
        address: this.props.user && this.props.user.address,
        center: false,
        mapHieght: window.innerWidth > 1980 ? 900 : window.innerHeight - 140 > 600 ? 600 : window.innerHeight - 140,
        suggest: null,
        confirm: false,
        redirect: false,
    }

    componentDidMount(){
        if(this.state.address){
            this.refs.geo.focus(); 
        }
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {;
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const newHieght =  window.innerWidth > 1980 ? 900 : window.innerHeight - 140 > 600 ? 600 : window.innerHeight - 140;
        if(this.state.mapHieght !== newHieght){
            this.setState({
                mapHieght: newHieght
            });
        }
    }

    handleSuggest = suggest => {
        this.setState({
            suggest,
            center: suggest.location
        });
    }

    handleClick = () => {
        if(this.state.suggest){
            const order = {
                address: document.getElementsByClassName('geosuggest__input')[0].value,
                ...JSON.parse(localStorage.getItem('orders'))
            }
            fetch('/api/user/order/create', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(order),
            })
            .then(res => res.json())
            .then(res => this.props.dispatch(setUser(res)))
            .then(() => this.props.dispatch(clearOrders()))
            .catch(console.log);
            
            this.setState({
                confirm: true,
            });
        }
    }

    setRedirect = value => {
        this.setState({
            redirect: value
        });
    }

    render(){
        const { address, center, mapHieght, confirm, redirect } = this.state;
        if(!this.props.user || redirect){
            return <Redirect to='/' />
        }
        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <div className={s.flexContainer}>
                        <Geosuggest
                        autoActivateFirstSuggest
                        className={s.geo}
                        country='us'
                        placeholder='Enter address'
                        initialValue={address}
                        queryDelay={500}
                        ref='geo'
                        onSuggestSelect={this.handleSuggest} />
                        <button onClick={this.handleClick} className={s.button} type='button' >Confirm Address</button>
                    </div>
                    <div className={s.map} style={{height: mapHieght}} >
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: keys.googleID }}
                        defaultCenter={{lat: 35.0527, lng: -78.8784 }}
                        center={center}
                        defaultZoom={11}
                        zoom={center && 18}
                        options={{ minZoom: 11 }}>
                            {center && <Marker lat={center.lat} lng={center.lng} />}
                        </GoogleMapReact>
                    </div>
                </div>
                {confirm && <ConfirmModal redirect={this.setRedirect} /> }
            </div>
        )
    }
}

const ConfirmModal = ({ redirect }) => {
    return(
        <div className={s.dark}>
            <div className={s.confirm}>
                <p className={s.title}>Order is on its way!</p>
                <img className={s.truck} src={truck} alt="truck"/>
                <p className={s.time}>Estimated Time: 35 mins</p>
                <button onClick={() => redirect(true)} type='button' className={s.HomeButton}>Back to Home</button>
            </div>
        </div>
    )
}

const Marker = ({lat, lng}) => {
    return(
        <div className={s.marker} lat={lat} lng={lng}/>
    )
}

export default connect(state => {
    return{
        user: state.user,
        orders: state.orders,
    }
})(OrderConfirm);