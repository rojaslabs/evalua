import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = (props) => {

    const { onSubmitProp } = props;

    return (
        <div >
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Correo no valido")
                        .min(3, "Este correo electrónico es incorrecto")
                        .required("Por favor, ingresa un correo electrónico válido"),

                    password: Yup.string()
                        .min(8, "La clave debe contener más de 8 caractes")
                        .required("Por favor ingrese una contraseña")
                })}

                onSubmit={(values, { setSubmitting }) => {
                    const timeOut = setTimeout(() => {
                        console.log(values);
                        onSubmitProp(values);
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
                        <div>
                            <Form method="post" onSubmit={handleSubmit}>
                                <label htmlFor="email">Correo Electrónico</label>
                                <Field id='loginemail' type="text" placeholder="Email" name='email' />
                                <ErrorMessage name="email">{(msg) => <p>{msg}</p>}</ErrorMessage>

                                <label htmlFor="password">Contraseña</label>
                                <Field id='loginpassword' type="password" placeholder="Contraseña" name='password' />
                                {errors.password && touched.password && <p>{errors.password}</p>}
                                <br></br>
                                <button type="submit" disabled={Object.values(errors).length > 0}>Iniciar sesión</button>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Login;
