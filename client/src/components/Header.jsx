import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useUser } from '../contexts/userContext';


const Header = () => {
    const { user, setUser } = useUser();
    return (
            <div className='header'>
                <h1><Link to='/'>Evalúa</Link></h1>
                    <nav>
                        <Link to={"/"}>Inicio</Link>
                        <Link to={"/search"}><i className="fa-solid fa-magnifying-glass"></i>Evaluaciones</Link>
                        {!user?<Link to={"/registerLogin"}>Inicia sesión / Regístrate</Link>:''}
                    </nav>
            </div>
    );
}

export default Header;
