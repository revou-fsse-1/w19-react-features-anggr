import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser, LoginData } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import { DecodedJwt } from "../context/AuthContext";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();

  const { setToken, setUserId } = useAuthContext();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      console.log(response);

      const decodedToken = jwt_decode<DecodedJwt>(response.token);

      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("userId", decodedToken.id.toString());

      setToken(response.token);
      setUserId(decodedToken.id.toString());

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
