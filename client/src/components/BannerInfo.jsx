import React from 'react';
import info from '../img/info.png'

const BannerInfo = () => {
    return (
        <div>
            <div className='banner'>
                <p className='banner-message'>
                    Bienvenidos al sistema de <br />evaluación de clima laboral escolar
                </p>
            </div>
            <div className='info'>
                <h2>¿Qué es Evalúa?</h2>
                <div className='info-contents'>
                    <div>
                        <p>Evalúa, es una plataforma que califica las escuelas como lugar de trabajo.</p>
                        <p>Nuestra misión es entregar una herramienta para visibilizar realidades que se encuentan ocultas en el diario vivir de la comunidad educativa, permitiendo destacar a aquellos empleadores donde sus pares, tales como: docentes, auxiliares, Psicopedagogos, Personal de alimentación, etc, recomiendan trabajar.</p>
                        <p>Sabemos que los equipos de trabajo que cuentan con herramientas adecuadas, trato respetuoso, etica profesional pueden influir directamente en los estudiantes, permitiendo una mejor educación y mejor bienestar emocional para nuestros estudiantes.</p>
                    </div>
                    <div>
                        <img src={info} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerInfo;
