import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../routes/Router";
import { redirectUser, userFind } from "../../services/user";
import swal from "sweetalert";
import "./style.scss";

const Login = () => {
  const { setUsuario } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {   //aqui
    //redirect if not session
    redirectUser(navigate);
}, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = async ({ email, password }) => {
    const user = await userFind(email, password);
    if (user.length && !user.error) {
      swal("Bienvendio a la PizzeriApi, Que JSON desea llevar?");
      setUsuario(...user);
      sessionStorage.setItem('user', JSON.stringify(user[0]));
      console.log(...user);
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <img
        src="https://hungryforhalaal.co.za/wp-content/uploads/2021/05/Pizza-Spots-Cape-Town-Hungry-for-Halaal.jpg"
        alt="Pizza"
      />
      <div className="login__title">
        <h1>PizzaDuck</h1>
        <h2>Inicia sesión</h2>
        <p>
          Disfruta de la mejor pizza que tu apetito pueda imaginar
        </p>
      </div>
      <form onSubmit={handleSubmit(userLogin)} className="form">
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>El email es obligatorio</span>}
        </div>

        <div className="input">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && <span>la contraseña es obligatoria</span>}
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div className="linkRegister">
        <span>Restablecer contraseña</span>
        <h5>¿No tienes una cuenta?</h5>
        <Link to="/register">
        <button className="register">
          Registrate aquí
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
