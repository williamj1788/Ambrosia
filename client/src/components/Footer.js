import React from 'react';
import s from '../styles/Footer.module.scss';

import twitterIcon from '../images/twitter_icon.png';
import facebookIcon from '../images/Facebook-Icon.png';
import instagramIcon from '../images/instagram.png';

import locationIcon from '../images/location-icon.png';
import phoneIcon from '../images/phone-icon.png';
import emailIcon from '../images/email-icon.svg';

const Footer = () => {
    return(
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.opening}>
                    <h4 className={s.title}>Opening Hours</h4>
                    <div className={s.hours}>
                        <div className={s.hoursSection}>
                            <p className={s.hoursTitle}>Monday - Friday</p>
                            <p className={s.hoursText}>8.00 am - 10.00 pm</p>
                        </div>
                        <div className={s.hoursSection}>
                            <p className={s.hoursTitle}>Saturday</p>
                            <p className={s.hoursText}>10.00 am - 5.00 pm</p>
                        </div>
                        <div className={s.hoursSection}>
                            <p className={s.hoursTitle}>Sunday</p>
                            <p className={s.hoursText}>Closed</p>
                        </div>
                    </div>
                </div>
                <div className={s.contact}>
                    <h4 className={s.title}>Contact Us</h4>
                    <div className={s.contactSocialIconContainer}>
                        <img className={s.contactSocialIcon} src={twitterIcon} alt="Social Media Icon"/>
                        <img className={s.contactSocialIcon} src={facebookIcon} alt="Social Media Icon"/>
                        <img className={s.contactSocialIcon} src={instagramIcon} alt="Social Media Icon"/>
                    </div>
                    <div className={s.contactSection}>
                        <img className={s.contactSectionIcon} src={locationIcon} alt="Location Icon"/>
                        <p className={s.contactSectionText}>203 Fake St. Mountain View, San Francisco, California, USA</p>
                    </div>
                    <div className={s.contactSection}>
                        <img className={s.contactSectionIcon} src={phoneIcon} alt="Phone Icon"/>
                        <p className={s.contactSectionText}>+1 978-236-7889</p>
                    </div>
                    <div className={s.contactSection}>
                        <img className={s.contactSectionIcon} src={emailIcon} alt="Email Icon"/>
                        <p className={s.contactSectionText}>JacquezWilliams@teleworm.us</p>
                    </div>
                </div>
            </div>
        </footer> 
    )
}

export default Footer;