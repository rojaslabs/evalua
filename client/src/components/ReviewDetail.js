import React from 'react';
import StarsRating from './StarsRating';

const ReviewDetail = (props) => {

    const { id,
        date,
        cargo,
        experiencia,
        comentario,
        lobueno,
        lomalo,
        sueldo,
        entregamateriales,
        ambientedetrabajo,
        liderazgo,
        respetoalosfuncionarios,
        promedio } = props;

        const formattedDate = new Date(date).toLocaleDateString(
            'es-CL',
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timeZone: 'America/Santiago',
                hour: 'numeric',
                minute: 'numeric'
            }
        )

    return (
        <div className='review-card' key={id}>
            <div className='review-card-header'>
                <div>
                    <p className='fecha'>{formattedDate}</p>
                    <StarsRating rating={promedio}/>
                </div>
                <div className='cargo'>{cargo}</div>
            </div>
            <hr/>
            <p><span>Experiencia:</span> {experiencia}</p>
            <p><span>Comentario:</span> {comentario}</p>
            <p><span>Lo bueno:</span> {lobueno}</p>
            <p><span>Lo malo:</span> {lomalo}</p>
            <hr/>
            <p><span>Sueldo:</span> {sueldo}</p>
            <p><span>Entrega de materiales:</span> {entregamateriales}</p>
            <p><span>Ambiente de trabajo:</span> {ambientedetrabajo}</p>
            <p><span>Liderazgo:</span> {liderazgo}</p>
            <p><span>Respeto a los Funcionarios:</span> {respetoalosfuncionarios}</p>
        </div>
    );
}

export default ReviewDetail;
