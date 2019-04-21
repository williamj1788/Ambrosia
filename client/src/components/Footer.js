import React from 'react';
import s from '../styles/Footer.module.scss';

import locationIcon from '../images/location-icon.png';
import phoneIcon from '../images/phone-icon.png';
import emailIcon from '../images/email-icon.svg';

const Footer = () => {
    return(
        <footer className={s.footer}>
            <div className={s.container}>
                <Opening />
                <Contact />
            </div>
        </footer> 
    )
}

const Opening = () => {
    return(
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
    )
}

const Contact = () => {
    return(
        <div className={s.contact}>
            <h4 className={s.title}>Contact Us</h4>
            <div className={s.contactSocialIconContainer}>
                <a href='https://www.twitter.com'target='_blank' rel="noopener noreferrer" className={`${s.contactSocialIcon} ${s.twitterIcon}`} />
                <a href='https://www.facebook.com' target='_blank' rel="noopener noreferrer" className={`${s.contactSocialIcon} ${s.facebookIcon}`} />
                <a href='https://www.instagram.com' target='_blank' rel="noopener noreferrer" className={`${s.contactSocialIcon} ${s.instagramIcon}`} />
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
    )
}
export default Footer;