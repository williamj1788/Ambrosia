import React from 'react';
import s from '../styles/ReviewSection.module.scss';
import Person from '../images/Person.jpg';
import starFull from '../images/star-full.png';
import starEmpty from '../images/star.png';

export class ReviewSection extends React.Component{
    state = {
        selected: 0,
        numOfReviews: 5, // based on number of reviews in <ReviewContainer />
    }

    componentWillMount(){
        setInterval(this.incrementSelected, 4000);
    }

    incrementSelected = () => {
        const { selected, numOfReviews } = this.state;
        if(selected === numOfReviews - 1){
            this.setSelected(0);
        }else{
            this.setSelected(selected + 1);
        }
    }

    setSelected = index => {
        this.setState({
            selected: index,
        });
    }

    render(){
        const { selected, numOfReviews } = this.state;
        return(
            <section className={s.reviewSection}>
                <h3 className={s.Title}>Reviews</h3>
                <div className={s.slideShow}>
                    <ReviewContainer selected={selected}>
                        <Review 
                        img={Person}
                        rating={5}
                        desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum'}
                        />
                        <Review 
                        img={Person}
                        rating={4}
                        desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum'}
                        />
                        <Review 
                        img={Person}
                        rating={4}
                        desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum'}
                        />
                        <Review 
                        img={Person}
                        rating={5}
                        desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum'}
                        />
                        <Review 
                        img={Person}
                        rating={5}
                        desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum'}
                        />
                    </ReviewContainer>
                    <Selection 
                    selected={selected} 
                    numOfReviews={numOfReviews} 
                    setSelected={this.setSelected} 
                    />
                </div>
            </section>
        )
    }
}

export function calulateRelativeOffset(selected) {
    const { innerWidth } = window;
    const viewWidth = 800; //based on .view width property
    let margin = (innerWidth - viewWidth) / 2;
    if(margin < 0){
        margin = 0;
    }
    return (selected * innerWidth) + margin;
}

export const ReviewContainer = ({ selected, children }) => {
    return(
        <div className={s.view}>
            <div className={s.container} style={{right: calulateRelativeOffset(selected)}}>
                {children}
            </div>  
        </div>
        
    )
}

export const Review = ({ img, rating, desc }) => {
    if(rating < 1){
        rating = 1;
    }else if (rating > 5){
        rating = 5;
    }
    const stars = [];
    for(let i = 0; i < 5; i++){
        if(i < rating){
            stars.push(<img key={i} className={s.reviewStar} src={starFull} alt="Star"/>)
        }else{
            stars.push(<img key={i} className={s.reviewStar} src={starEmpty} alt="Star"/>)
        }
    };
    return(
        <div className={s.review}>
            <div className={s.reviewContain}>
                <img className={s.reviewImg} src={img} alt="Person Image" />
                <div className={s.reviewInfo}>
                    <div className={s.reviewStarsContainer}>
                        {stars}
                    </div>
                    <p className={s.reviewDesc}>{desc}</p>
                </div>
            </div>
        </div>
    )
}

export const Selection = ({ selected, numOfReviews, setSelected }) => {
    let buttons = [];
    for(let i = 0; i < numOfReviews; i++){
        buttons.push(
            <button 
            key={i}
            onClick={() => setSelected(i)} 
            className={`${s.sectionButton} ${selected === i ? s.active: undefined}`}
            />
        );
    };
    return(
        <div className={s.selection}>
            {buttons}
        </div>
    )
}

export default ReviewSection;