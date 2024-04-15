import React, { Component } from "react";
import styles from "./NumberLogin.module.css";
import svgImage from "../../assets/otp.svg";

class NumberLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: "otp",
      otpLength: 4,
      otp: new Array(4).fill(""),
      focusedIndex: 0,
    };
  }


   handleChange(value, index) {
  }

  handleBackspaceAndEnter(e, index) {
    if(e.key === "Backspace" && !e.target.value && index > 0){
      
    }
    if(e.key === "Enter" && e.target.value && index < this.state.otpLength-1){
      
    }
  }

  render() {
    const { pageState, otpLength, otp } = this.state;
    return (
      <div className={styles.LoginContainer}>
        <div className={styles.LoginCard}>
          {pageState === "login" && (
            <>
              <div className={styles.CardImageContainer}>
                <img className={styles.CardImage} src={svgImage} alt={pageState} />
              </div>
              <div className={styles.CardSubText}>
                You'll receive a {otpLength} digit code to verify next
              </div>
              <div className={styles.container}>
                <div className={styles.inputContainer}>
                  <label htmlFor="phonenumber">Enter your mobile number</label>
                  <input type="number" name="phonenumber" />
                </div>
                <button>Continue</button>
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
                  Code is sent to +90 6500450403
                </div>
                <div className={styles.OtpInputContainer}>
                  {otp.map((digit, index) => (
                    <input
                    key={index} 
                    maxLength={1}  
                    onChange={(e)=> this.handleChange(e.target.value, index)}
                    onKeyUp={(e)=> this.handleBackspaceAndEnter(e, index)}
                   
                    />
                  ))}
                </div>
              </div>
              <div className={styles.container}>
                <button>Login</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default NumberLogin;