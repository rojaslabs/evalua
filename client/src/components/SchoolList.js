import React from 'react';
import { Link } from 'react-router-dom';
import SchoolCard from './SchoolCard';

const SchoolList = (props) => {

    const { schools } = props;

    return (
        <div>
            {schools?.map((school, i) => (
                <SchoolCard
                    key={i}
                    id={school._id}
                    nombre={school.nombreescuela}
                    ciudad={school.ciudad}
                    direccion={school.direccionescuela}
                    reviews={school.review_docs.length}
                    average={school.avgRating}
                />
            ))}
        </div>
    );
}

export default SchoolList;