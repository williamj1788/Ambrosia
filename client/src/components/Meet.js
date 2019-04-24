import React from 'react';
import Navbar from './Navbar';

import s from '../styles/Meet.module.scss';
import chef from '../images/chef.jpg';

class Meet extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <div className={s.content}>
                    <h1 className={s.title}>Meet The Cheifs</h1>
                    <div className={s.chiefContainer}>
                        <Chief 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                        <Chief 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                        <Chief 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                        <Chief 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const Chief = ({ img, name, desc }) => {
    return(
        <div className={s.chief}>
            <img className={s.chiefImg} src={img} alt={name}/>
            <p className={s.chiefDesc}>{desc}</p>
        </div>
    )
}

export default Meet;