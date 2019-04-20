import React from 'react';
import s from '../styles/ReviewSection.module.scss';
import Person from '../images/Person.jpg';
import starFull from '../images/star-full.png';

class ReviewSection extends React.Component{
    state = {
        offset: 0,
    }
    componentWillMount(){
        setTimeout(() => {
            this.setState({
                offset: this.state.offset + 500,
            });
        }, 3000);
    }

    render(){
        return(
            <section className={s.reviewSection}>
                <h3 className={s.Title}>Reviews</h3>
                <div className={s.slideShow}>
                    <ReviewContainer offset={this.state.offset} />
                    <Selection />
                </div>
            </section>
        )
    }
}

const ReviewContainer = ({ offset }) => {
    
    let style = {
        right: `${offset}px`
    };
    return(
        <div className={s.view}>
            <div className={s.container} style={style}>
                <Review />
                <Review />
                <Review />
                <Review />
                <Review />
            </div>  
        </div>
        
    )
}

const Review = () => {
    return(
        <div className={s.review}>
            <img className={s.reviewImg} src={Person} alt="Person Image" />
            <div className={s.reviewInfo}>
                <div className={s.reviewStarsContainer}>
                    <img className={s.reviewStar} src={starFull} alt="Star"/>
                    <img className={s.reviewStar} src={starFull} alt="Star"/>
                    <img className={s.reviewStar} src={starFull} alt="Star"/>
                    <img className={s.reviewStar} src={starFull} alt="Star"/>
                    <img className={s.reviewStar} src={starFull} alt="Star"/>
                </div>
                <p className={s.reviewDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum  </p>
            </div>
        </div>
    )
}

const Selection = () => {
    return(
        <div>
            {/* <img src={starFull} alt="Star"/>
            <img src={starFull} alt="Star"/>
            <img src={starFull} alt="Star"/>
            <img src={starFull} alt="Star"/>
            <img src={starFull} alt="Star"/> */}
        </div>
    )
}

export default ReviewSection;