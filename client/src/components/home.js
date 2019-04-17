import React from 'react';

import Navbar from './Navbar';

class Home extends React.Component{
    render(){
        return(
            <div>
                <Navbar page={'home'} />
            </div>
        )
    }
}

export default Home;