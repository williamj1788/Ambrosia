import React from 'react';
import s from '../styles/ReviewSection.module.scss';
import Person from '../images/Person.jpg';
import starFull from '../images/star-full.png';

class ReviewSection extends React.Component{
    state = {
        selected: 0,
        numOfReviews: 5, // based on number of reviews in <ReviewContainer />
    }
    componentWillMount(){
        setInterval(() => {
            const { selected, numOfReviews } = this.state;
            if(selected > numOfReviews - 2){
                this.setSelected(0);
            }else{
                this.setSelected(selected + 1);
            }
        }, 3000);
    }

    setSelected =  (index) => {
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
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                    </ReviewContainer>
                    <Selection selected={selected} numOfReviews={numOfReviews} />
                </div>
            </section>
        )
    }
}

const ReviewContainer = ({ selected, children }) => {
    let style = {
        right: `${selected * 860}px`
    };
    return(
        <div className={s.view}>
            <div className={s.container} style={style}>
                {children}
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

const Selection = ({ selected, numOfReviews }) => {
    let buttons = [];
    for(let i = 0; i < numOfReviews; i++){
        buttons.push(<button key={i} className={`${s.sectionButton} ${selected === i ? s.active: undefined}`}></button>);
    };
    return(
        <div className={s.selection}>
            {buttons}
        </div>
    )
}

export default ReviewSection;