import React from "react";
import { useForm } from "react-hook-form";
import "./AuthApp.css";

function AuthApp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg">
      <div className="card">
        <h1>Register Here!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <div className="input">
              <label htmlFor="email">Email Address</label>
              <input {...register("email", { required: true })} placeholder="Enter Email" type="email" />
              {errors.email && <span className="error">Email is required</span>}
            </div>
            <div className="input">
              <label htmlFor="phoneNumber">Mobile Number</label>
              <input {...register("phoneNumber", { required: true, minLength: 10, maxLength: 10 })} placeholder="Enter Mobile Number" type="number" />
              {errors.phoneNumber && <span className="error">Mobile number should be 10 digits</span>}
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <input {...register("password", { required: true, minLength: 6 })} placeholder="Enter Password" type="password" />
              {errors.password && <span className="error">Password should be at least 6 characters</span>}
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AuthApp;
