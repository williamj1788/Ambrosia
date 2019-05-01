import React from 'react';
import Navbar from './Navbar';
class UserOrder extends React.Component{
    
    logout = res => {
        console.log('final');
    }
    
    render(){
        return(
            <div>
                <Navbar />
            </div>
        )
    }
}

export default UserOrder;