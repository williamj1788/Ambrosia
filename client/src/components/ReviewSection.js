import React from 'react';
import s from '../styles/ReviewSection.module.scss';

class ReviewSection extends React.Component{
    render(){
        return(
            <section className={s.review}>
                <h3 className={s.reviewTitle}>Reviews</h3>
                <div>
                    <ReviewContainer />
                    <div>
                        
                    </div>
                </div>
            </section>
        )
    }
}

const ReviewContainer = () => {
    return(
        <div>
            <Review />
            <Review />
            <Review />
        </div>
    )
}

const Review = () => {
    return(
        <div>
            <img src="" alt=""/>
            <div>
                <div>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                </div>
                <p></p>
            </div>
        </div>
    )
}

export default ReviewSection;