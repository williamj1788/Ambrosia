import React from 'react';
import s from '../../styles/Footer.module.scss';
import Title from '../shared/Title';

import locationIcon from '../../images/location-icon.png';
import phoneIcon from '../../images/phone-icon.png';
import emailIcon from '../../images/email-icon.svg';

export const Footer = () => {
    return(
        <footer className={s.footer}>
            <div className={s.container}>
                <Opening />
                <Contact />
            </div>
        </footer> 
    )
}

export const Opening = () => {
    return(
        <div className={s.opening}>
            <h4 className={s.title}>Opening Hours</h4>
            <div className={s.hours}>
                <HoursSection date={'Monday - Friday'} time={'8.00 am - 10.00 pm'} />
                <HoursSection date={'Saturday'} time={'10.00 am - 5.00 pm'} />
                <HoursSection date={'Sunday'} time={'Closed'} />
            </div>
        </div>
    )
}

export const HoursSection = ({ date, time }) => {
    return(
        <div className={s.hoursSection}>
            <p className={s.hoursTitle}>{date}</p>
            <p className={s.hoursText}>{time}</p>
        </div>
    )
}

export const Contact = () => {
    return(
        <div className={s.contact}>
            <h4 className={s.title}>Contact Us</h4>
            <div className={s.contactSocialIconContainer}>
                <LinkIcon href='https://www.twitter.com' className={s.twitterIcon} />
                <LinkIcon href='https://www.facebook.com' className={s.facebookIcon} />
                <LinkIcon href='https://www.instagram.com' className={s.instagramIcon} />
            </div>
            <ContactSection img={locationIcon} text={'203 Fake St. Mountain View, San Francisco, California, USA'} />
            <ContactSection img={phoneIcon} text={'+1 978-236-7889'} />
            <ContactSection img={emailIcon} text={'JacquezWilliams@teleworm.us'} />
        </div>
    )
}

export const LinkIcon = ({ href, className }) => {
    return(
        <a href={href} target='_blank' rel="noopener noreferrer" className={`${s.contactSocialIcon} ${className}`} ></a>
    )
}

export const ContactSection = ({ img, text }) => {
    return(
        <div className={s.contactSection}>
            <img className={s.contactSectionIcon} src={img} alt="Icon"/>
            <p className={s.contactSectionText}>{text}</p>
        </div>
    )
}

export default Footer;