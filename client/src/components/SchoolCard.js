import React from 'react';
import { Link } from 'react-router-dom'
import StarsRating from './StarsRating';

const SchoolCard = (props) => {

    const { id, nombre, ciudad, direccion, reviews, average } = props;

    return (
        <div className='school-list-item'>
            <div>
                <Link to={`/reviews/${id}`}>{nombre}</Link>
            </div>
            <div>
                <p>Ciudad</p>
                {ciudad}
            </div>
            <div>
                <p>Dirección</p>
                {direccion}
            </div>
            <div>
                <p>Evaluaciones</p>
                {reviews}
            </div>
            <div>
                <p>Promedio</p>
                <StarsRating rating={average}/>
            </div>
        </div>
    );
}

export default SchoolCard;
