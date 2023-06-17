import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser, RegisterData } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <section className="vh-100" style={{ backgroundColor: "black" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="card"
              style={{ border: "none", borderRadius: "2rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://res.cloudinary.com/djudfrj8s/image/upload/v1686969216/w19/background-img_d9bl5q.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">
                          Follow your dream
                        </span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}>
                        Sign up new account
                      </h5>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          {...register("name")}
                        />
                        <p id="name-validation">
                          {errors.name && <p>{errors.name.message}</p>}
                        </p>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          {...register("email")}
                        />
                        <p id="email-validation">
                          {errors.email && <p>{errors.email.message}</p>}
                        </p>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          {...register("password")}
                        />
                        <p id="password-validation">
                          {errors.password && <p>{errors.password.message}</p>}
                        </p>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit">
                          Sign Up
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have an account?
                        <Link to="/login" style={{ color: "#393f81" }}>
                          Login Here
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
