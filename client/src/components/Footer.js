import React from 'react';
import s from '../styles/Footer.module.scss';

const Footer = () => {
    return(
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.opening}>
                    <h4 className={s.title}>Opening Hours</h4>
                    <div className={s.hours}>
                        <div>
                            <p>Monday - Friday</p>
                            <p>Saturday</p>
                            <p>Sunday</p>
                        </div>
                        <div>
                            <p>8.00 am - 10.00 pm</p>
                            <p>10.00 am - 5.00 pm</p>
                            <p>Closed</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className={s.title}>Contact Us</h4>
                    <div>
                        <img src="" alt=""/>
                        <img src="" alt=""/>
                        <img src="" alt=""/>
                    </div>
                    <div>
                        <img src="" alt=""/>
                        <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                    </div>
                    <div>
                        <img src="" alt=""/>
                        <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                    </div>
                    <div>
                        <img src="" alt=""/>
                        <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                    </div>
                </div>
            </div>
        </footer> 
    )
}

export default Footer;