import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser, RegisterData } from "../api";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      console.log(response);

      window.localStorage.setItem("token", response.token);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" value="Register" />
      <p> template</p>
      <p> email: okky@mail.com </p>
      <p> password": okkyokky </p>
    </form>
  );
};

export default Register;
