import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/userContext';

const ReviewForm = () => {

    const { id } = useParams()
    let navigate = useNavigate()
    const [errores, setErrores] = useState([]);
    const { user, setUser } = useUser();
    const [promedio, setPromedio] = useState(0);
    const [school, setSchool] = useState();

    console.log(promedio)

    const back = () => {
        navigate(`/reviews/${id}`)
    }

    const createNewReview = (newReview) => {
        console.log(newReview)
        let valoresPromedio = [newReview.sueldo + newReview.entregamateriales + newReview.ambientedetrabajo + newReview.liderazgo + newReview.respetoalosfuncionarios];
        let sum = valoresPromedio.reduce((previous, current) => current += previous);
        let promedioActualizado = (sum / 5)
        axios.post(`http://localhost:8000/api/review/create`, {
            cargo: newReview.cargo, experiencia: newReview.experiencia,
            comentario: newReview.comentario, lobueno: newReview.lobueno,
            lomalo: newReview.lomalo, sueldo: newReview.sueldo,
            entregamateriales: newReview.entregamateriales,
            ambientedetrabajo: newReview.ambientedetrabajo,
            liderazgo: newReview.liderazgo,
            respetoalosfuncionarios: newReview.respetoalosfuncionarios,
            promedio: promedioActualizado.toFixed(1), author: user._id
        })
            .then(res => {
                console.log(res)
                axios.put('http://localhost:8000/api/school/update/' + id, { reviews: [...school.reviews, res.data.newReview] })
                    .then(res => {
                        console.log(res);
                    });
                back()
            })
            .catch(err => {
                console.log(err.response.data)
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrores(errorArr);
            })
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/school/' + id)
            .then(res => setSchool(res.data.schoolById))
            .catch(err => console.log(err))
    }, []);
    return (
        <div >
            <Formik
                initialValues={{
                    cargo: "",
                    experiencia: "",
                    comentario: "",
                    lobueno: "",
                    lomalo: "",
                    sueldo: 0,
                    entregamateriales: 0,
                    ambientedetrabajo: 0,
                    liderazgo: 0,
                    respetoalosfuncionarios: 0,
                    promedio: 0,

                }}
                validationSchema={Yup.object().shape({
                    cargo: Yup.string()
                        .min(3, "El cargo requiere minimo 3 caracteres.")
                        .required("Debe ingresar un cargo."),

                    experiencia: Yup.number()
                        .min(0, "La experiencia debe ser igual o mayor a 0.")
                        .required("Debe indicar su experiencia en el cargo."),

                    comentario: Yup.string()
                        .min(10, "El comentario es muy corto.")
                        .max(500, "El comentario debe tener un máximo de 500 caracteres.")
                        .required("Debe ingresar un comentario."),

                    lobueno: Yup.string()
                        .min(10, "El minimo de caracteres es 50.")
                        .max(500, "El maximo de caracteres es 500.")
                        .required("Debe ingresar lo bueno del establecimiento."),

                    lomalo: Yup.string()
                        .min(10, "El minimo de caracteres es 50.")
                        .max(500, "El maximo de caracteres es 500.")
                        .required("Debe ingresar lo malo del establecimiento."),

                    sueldo: Yup.number()
                        .min(0)
                        .max(5)
                        .required("La calificación es obligatoria."),

                    entregamateriales: Yup.number()
                        .min(0)
                        .max(5)
                        .required("La calificación es obligatoria."),

                    ambientedetrabajo: Yup.number()
                        .min(0)
                        .max(5)
                        .required("La calificación es obligatoria."),

                    liderazgo: Yup.number()
                        .min(0)
                        .max(5)
                        .required("La calificación es obligatoria."),

                    respetoalosfuncionarios: Yup.number()
                        .min(0)
                        .max(5)
                        .required("La calificación es obligatoria."),

                    promedio: Yup.number()
                        .min(0)
                        .max(5)
                        .required("La calificación es obligatoria."),


                })}

                onSubmit={(values, { setSubmitting }) => {
                    const timeOut = setTimeout(() => {
                        createNewReview(values);
                        setSubmitting(false);
                        clearTimeout(timeOut);
                    }, 1000);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    //isSubmitting,
                    //validating,
                    valid,
                }) => {
                    return (
                        <div className='review-form-container'>
                            <div className='review-form'>
                                <div className='breadcrumb'>
                                    <button onClick={back}><i className="fa-solid fa-angles-left"></i>Volver a escuela</button>
                                </div>
                                <Form method="post" onSubmit={handleSubmit}>
                                    <div>
                                        <h3>Información y comentarios</h3>
                                        <label htmlFor="cargo">Cargo</label>
                                        <Field id='cargo' type="text" name='cargo' />
                                        {errors.cargo && touched.cargo && <p>{errors.cargo}</p>}
                                        <label htmlFor="experiencia">Años que lleva o estuvo en el establecimiento</label>
                                        <Field id='experiencia' type="number" name='experiencia' />
                                        {errors.experiencia && touched.experiencia && <p>{errors.experiencia}</p>}
                                        <label htmlFor="comentario">Comentario</label>
                                        <Field id='comentario' type="text" name='comentario' component='textarea' rows='4' />
                                        {errors.comentario && touched.comentario && <p>{errors.comentario}</p>}
                                        <label htmlFor="lobueno">Lo bueno</label>
                                        <Field id='lobueno' type="text" name='lobueno' component='textarea' rows='2' />
                                        {errors.lobueno && touched.lobueno && <p>{errors.lobueno}</p>}
                                        <label htmlFor="lomalo">Lo malo</label>
                                        <Field id='lomalo' type="text" name='lomalo' component='textarea' rows='2' />
                                        {errors.lomalo && touched.lomalo && <p>{errors.lomalo}</p>}
                                    </div>
                                    <div>
                                        <h3>Calificaciones (de 0 a 5)</h3>
                                        <label htmlFor="Sueldo">Sueldo</label>
                                        <Field id='sueldo' type="number" max="5" min="0" step="0.1" name='sueldo' />
                                        {errors.sueldo && touched.sueldo && <p>{errors.sueldo}</p>}
                                        <label htmlFor="Entrega de materiales">Entrega de materiales</label>
                                        <Field id='entregamateriales' type="number" max="5" min="0" step="0.1" name='entregamateriales' />
                                        {errors.entregamateriales && touched.entregamateriales && <p>{errors.entregamateriales}</p>}
                                        <label htmlFor="Ambiente de trabajo">Ambiente de trabajo</label>
                                        <Field id='ambientedetrabajo' type="number" max="5" min="0" step="0.1" name='ambientedetrabajo' />
                                        {errors.ambientedetrabajo && touched.ambientedetrabajo && <p>{errors.ambientedetrabajo}</p>}
                                        <label htmlFor="Liderazgo">Liderazgo</label>
                                        <Field id='liderazgo' type="number" max="5" min="0" step="0.1" name='liderazgo' />
                                        {errors.liderazgo && touched.liderazgo && <p>{errors.liderazgo}</p>}
                                        <label htmlFor="Respeto al los funcionarios">Respeto al los funcionarios</label>
                                        <Field id='respetoalosfuncionarios' type="number" max="5" min="0" step="0.1" name='respetoalosfuncionarios' />
                                        {errors.respetoalosfuncionarios && touched.respetoalosfuncionarios && <p>{errors.respetoalosfuncionarios}</p>}
                                        <button type="submit" disabled={Object.values(errors).length > 0}>Evaluar</button>
                                    </div>
                                </Form>
                            </div>
                            {errores?.map((error, i) => <p className='error' key={i}>{error}</p>)}
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}

export default ReviewForm;
