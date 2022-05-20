import React from 'react';

const StarsRating = (props) => {

    const { rating } = props

    return (
        <div className='rating'>
            { 
            (rating === 5) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 4.5 && rating < 5) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 4 && rating < 4.5) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 3.5 && rating < 4) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 3 && rating < 3.5) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 2.5 && rating < 3) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 2 && rating < 2.5) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 1.5 && rating < 2) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 1 && rating < 1.5) && <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating >= 0.5 && rating < 1) && <>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
            { 
            (rating < 0.5) && <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <span>{rating}</span>
            </>
            }
        </div>
    );
}

export default StarsRating;
