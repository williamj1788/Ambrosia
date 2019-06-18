import React from 'react';
import Navbar from './shared/Navbar';
import Content from './shared/Content';
import Title from './shared/Title';

import s from '../styles/Meet.module.scss';
import chef from '../images/chef.jpg';

export class Meet extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Content>
                    <Title style={{margin: '50px 0 0 0'}}>Meet The Chefs</Title>
                    <div className={s.chiefContainer}>
                        <Chef 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                       s arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                        <Chef 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                        <Chef 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                        <Chef 
                        img={chef}
                        name='joe down'
                        desc='Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Nullam sit amet purus porta, 
                        dapibus felis in malesuada diam. Integer quis imperdiet 
                        arcu, ut ornare sem. Phasellus magna justo, tincidunt quis'
                        />
                    </div>
                </Content>
            </div>
        )
    }
}

export const Chef = ({ img, name, desc }) => {
    return(
        <div className={s.chief}>
            <img className={s.chiefImg} src={img} alt={name}/>
            <p className={s.chiefDesc}>{desc}</p>
        </div>
    )
}

export default Meet;