import React from "react";
import logout from "../actions/logout";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EvaluacionesPersonales from "../views/EvaluacionesPersonales";

const UserOptions = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logOut = async () => {
    const { success } = await logout();
    if (success) setUser(null);
    else window.alert("Error, could not log out");
    navigate("/");
  };
  return (
    <nav className="user-options">
      <div>
        <Link to="/misevaluaciones"><i className="fa-regular fa-star"></i>Mis evaluaciones</Link>
      </div>
      <div>
        <button onClick={logOut}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default UserOptions;
