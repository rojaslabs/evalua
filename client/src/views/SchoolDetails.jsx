import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SchoolCard from '../components/SchoolCard';
import ReviewDetail from '../components/ReviewDetail';
import { useUser } from '../contexts/userContext';

const SchoolDetails = () => {

    const { user, setUser } = useUser();
    const [school, setSchool] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getSchool();
    }, []);

    const getSchool = () => {
        setIsLoading(true)
        axios.get(`http://localhost:8000/api/school/average/${id}`)
            .then(res => {
                setIsLoading(false)
                setSchool(res.data.schoolById[0])
            })
    }

    return (
        <div className='school-details-container'>
            <div className='school-details'>
                <div className='breadcrumb'>
                    <Link to="/search"><i className="fa-solid fa-angles-left"></i>Volver al buscador</Link>
                </div>
                {school && <SchoolCard
                    id={school._id}
                    nombre={school.nombreescuela}
                    ciudad={school.ciudad}
                    direccion={school.direccionescuela}
                    reviews={school.review_docs.length}
                    average={school.avgRating}
                />}
                {user ? <Link to={`/create-review/${id}`}><div className='btn-evaluar'><button><i className="fa-regular fa-star"></i>Evaluar este establecimiento</button></div></Link> : ''}
                <div>
                    {school?.review_docs?.map((review, i) =>
                        <ReviewDetail
                            id={review._id}
                            date={review.createdAt}
                            cargo={review.cargo}
                            experiencia={review.experiencia}
                            comentario={review.comentario}
                            lobueno={review.lobueno}
                            lomalo={review.lomalo}
                            sueldo={review.sueldo}
                            entregamateriales={review.entregamateriales}
                            ambientedetrabajo={review.ambientedetrabajo}
                            liderazgo={review.liderazgo}
                            respetoalosfuncionarios={review.respetoalosfuncionarios}
                            promedio={review.promedio}
                        />)
                    }
                </div>
            </div>
        </div>
    );
}

export default SchoolDetails;
