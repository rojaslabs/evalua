import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EditReview from '../components/EditReview';

const ViewEditReview = () => {

    const [review, setReview] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])

    useEffect(() => {
        console.log("estoy llamando el use effec")
        axios.get('http://localhost:8000/api/review/' + id)
            .then(res => setReview(res.data.reviewById))
            .catch(err => console.log(err))
    }, []);

    const editReview = (values) => {
        console.log(values)
        let valoresPromedio = [values.sueldo + values.entregamateriales + values.ambientedetrabajo + values.liderazgo + values.respetoalosfuncionarios];
        let sum = valoresPromedio.reduce((previous, current) => current += previous);
        let promedioUpdate = (sum / 5)
        axios.put('http://localhost:8000/api/review/update/' + id,
            {
                cargo: values.cargo,
                experiencia: values.experiencia,
                comentario: values.comentario,
                lobueno: values.lobueno,
                lomalo: values.lomalo,
                sueldo: values.sueldo,
                entregamateriales: values.entregamateriales,
                ambientedetrabajo: values.ambientedetrabajo,
                liderazgo: values.liderazgo,
                respetoalosfuncionarios: values.respetoalosfuncionarios,
                promedio: promedioUpdate.toFixed(1),
            })
            .then(res => {
                console.log(res)
                navigate("/misevaluaciones")
            })
            .catch(err => {
                console.log(err.response.data)
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <div className='review-form-container'>
                <div className='review-form'>
                    <div className='breadcrumb'>
                        <Link to="/misevaluaciones"><i className="fa-solid fa-angles-left"></i>Mis evaluaciones</Link>
                    </div>
                    {review && <EditReview onSubmitProp={editReview}
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
                        promedio={review.promedio} />}
                    {errors.map((err, i) => <p key={i}>{err}</p>)}
                </div>
            </div>

        </div>
    );
}

export default ViewEditReview;
