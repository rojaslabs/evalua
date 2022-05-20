import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';

const EvaluacionesPersonales = () => {

    const [reviews, setReviews] = useState();
    const [counter, setCounter] = useState(0);
    const [ideReview, setIdeReview] = useState();
    const { user, setUser } = useUser();


    const getReviews = () => {
        axios.get('http://localhost:8000/api/allreviewsbyuser/' + user._id)
            .then(res => {
                setReviews(res.data.reviews);
            })
            .catch(err => console.log("Error:", err))
    }
    useEffect(() => {
        getReviews();
    }, []);
    useEffect(() => {
        getReviews();
    }, [counter]);

    const deleteReview = (idReview) => {
        axios.delete("http://localhost:8000/api/review/delete/" + idReview)
            .then((res) => {
                console.log("eliminada: ", res);
                getReviews();
                setCounter(counter + 1);
            });
    };

    return (
        <div className='mis-evaluaciones-container'>
            <div className='mis-evaluaciones'>
                <div className='breadcrumb'>
                    <Link to="/search"><i className="fa-solid fa-angles-left"></i>Volver al buscador</Link>
                </div>
                {reviews?.map((review, i) =>
                    <div key={i}>
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
                        />
                        {/* <p><span>Cargo:</span> {review.cargo}</p>
                        <p><span>Experiencia:</span> {review.experiencia}</p>
                        <p><span>Comentario:</span> {review.comentario}</p>
                        <p><span>Lo bueno:</span> {review.lobueno}</p>
                        <p><span>Lo malo:</span> {review.lomalo}</p>
                        <hr/>
                        <p><span>Sueldo:</span> {review.sueldo}</p>
                        <p><span>Entrega materiales:</span> {review.entregamateriales}</p>
                        <p><span>Ambiente de trabajo:</span> {review.ambientedetrabajo}</p>
                        <p><span>Liderazgo:</span> {review.liderazgo}</p>
                        <p><span>Respeto a los Funcionarios:</span> {review.respetoalosfuncionarios}</p>
                        <hr/>
                        <p><span>Promedio:</span> {review.promedio}</p> */}
                        <div className='actions'>
                            <Link to={"/editarevaluaciones/" + review._id} ><button className='btn-edit'>Editar</button></Link>
                            <button className='btn-delete' onClick={() => deleteReview(review._id)}>Eliminar</button>
                        </div>
                    </div>)},
            </div>
        </div>
    );
}

export default EvaluacionesPersonales;
