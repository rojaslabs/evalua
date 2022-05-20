import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUser } from '../contexts/userContext';

const RegisterLogin = () => {
    const { setUser } = useUser();
    const [errors, setErrors] = useState([]);
    const [errorsR, setErrorsR] = useState([]);
    const navigate = useNavigate();

    const registerUser = values => {
        console.log("hola")
        axios.post('http://localhost:8000/api/register', values)
            .then(res => {
                console.log(res.data);
                axios.get(`http://localhost:8000/api/user/${res.data._id}`)
                    .then(res => {
                        setUser(res.data);
                        navigate("/search");
                    })
                    .catch(err => {
                        console.error(err);
                        return { success: false, data: err.message };
                    })

            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrorsR(errorArr);
            })
    }

    const loginUser = values => {
        console.log("hola")
        axios.post('http://localhost:8000/api/login', values)
            .then(res => {
                console.log('Usuario logueado');
                console.log(res.data);
                axios.get(`http://localhost:8000/api/user/${res.data._id}`)
                    .then(res => {
                        setUser(res.data);
                        navigate("/search");
                    })
                    .catch(err => {
                        console.error(err);
                        return { success: false, data: err.message };
                    })

            })
            .catch(err => {
                console.log(err.response.data);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }

                setErrors(errorArr);
            })
    }

    return (
        <div className='register-login-container'>
            <div className='register-login'>
                <div>
                    <h2>Registrarse</h2>
                    {errorsR.map((err, index) => <div>{err}</div>)}
                    <Register onSubmitProp={registerUser} iFirstName='' iLastName='' iEmail='' iPassword='' iConfirm='' ></Register>
                </div>
                <div>
                    <h2>Iniciar sesión</h2>
                    {errors.map((err, index) => <div>{err}</div>)}
                    <Login onSubmitProp={loginUser}></Login>
                </div>
            </div>
        </div>
    );
}

export default RegisterLogin;
