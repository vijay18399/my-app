import React, { Component } from "react";
import styles from "./NumberLogin.module.css";
import svgImage from "../../assets/otp.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class NumberLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: "login",
      phoneNumber: "",
      otpLength: 4,
      otp: new Array(4).fill(""),
      focusedIndex: 0,
      disableLoginBtn:true,
    };
    this.inputRefs = Array.from({ length: 4 }, () => React.createRef());
  }

  handleChange(value, index) {
    const { otp } = this.state;
    otp[index] = value[0] ? value[0] : "";

    this.setState({ otp ,disableLoginBtn : otp.join("").length !==4 });
    if (value && index + 1 < this.inputRefs.length) {
      this.inputRefs[index + 1].current.focus();
    }
  }

  handleBackspaceAndEnter(e, index) {
    const { otpLength } = this.state;
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      this.inputRefs[index - 1].current.focus();
    }
    if (e.key === "Enter" && e.target.value && index < otpLength - 1) {
      this.inputRefs[index + 1].current.focus();
    }
  }
  login(){
    toast.error("Invalid OTP");
  }
  sendOtp() {
    if (this.isValidPhoneNumber(this.state.phoneNumber)) {
      this.setState({ pageState: "otp" });
    } else {
      toast.error("Please enter a valid phone number.");
    }
  }

  isValidPhoneNumber(phoneNumber) {
    return phoneNumber.length === 10;
  }

  render() {
    const { pageState, otpLength, otp,disableLoginBtn, phoneNumber } = this.state;
    return (
      <div className={styles.LoginContainer}>
        <ToastContainer />
        <div className={styles.LoginCard}>
          {pageState === "login" && (
            <>
              <div className={styles.CardImageContainer}>
                <img
                  className={styles.CardImage}
                  src={svgImage}
                  alt={pageState}
                />
              </div>
              <div className={styles.CardSubText}>
                You'll receive a {otpLength} digit code to verify next
              </div>
              <div className={styles.container}>
                <div className={styles.inputContainer}>
                  <label htmlFor="phonenumber">Enter your mobile number</label>
                  <input
                    type="number"
                    name="phonenumber"
                    value={phoneNumber}
                    onChange={(e) =>
                      this.setState({ phoneNumber: e.target.value })
                    }
                  />
                </div>
                <button
                  onClick={() => {
                    this.sendOtp();
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {pageState === "otp" && (
            <>
              <div className={styles.CardTitleContainer}>
                <h3> Welcome to Team</h3>
                <span>join community</span>
              </div>
              <div className={styles.OtpContainer}>
                <div className={styles.CardSubText}>
                  Code is sent to {phoneNumber}
                </div>
                <div className={styles.OtpInputContainer}>
                  {otp.map((digit, index) => (
                    <input
                      type="number"
                      key={index}
                      maxLength={1}
                      ref={this.inputRefs[index]}
                      id={index}
                      value={digit}
                      onChange={(e) => this.handleChange(e.target.value, index)}
                      onKeyUp={(e) => this.handleBackspaceAndEnter(e, index)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.container}>
                <button    onClick={() => {
                    this.login();
                  }} disabled={disableLoginBtn} >Login</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default NumberLogin;
