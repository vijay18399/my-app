import React from "react";
import { MdError } from "react-icons/md";
import { useForm } from "react-hook-form";
import "./AuthApp.css";

function AuthApp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Register Here!</h1>
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <div className="inputDiv">
              <input {...register("email", { required: true })} placeholder="Enter Email" type="email" />
              {errors.email && <div className="error"> <MdError className="icon" />Email is required</div>}
            </div>
            <div className="inputDiv">
              <input {...register("phoneNumber", { required: true, minLength: 10, maxLength: 10 })} placeholder="Enter Mobile Number" type="number" />
              {errors.phoneNumber && <div className="error">  <MdError className="icon" /> Mobile number should be 10 digits</div>}
            </div>
            <div className="inputDiv">
              <input {...register("password", { required: true, minLength: 6 })} placeholder="Enter Password" type="password" />
              {errors.password && <div className="error">  <MdError className="icon" /> Password should be at least 6 characters</div>}
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AuthApp;
