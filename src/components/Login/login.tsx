"use client";
import React from "react";
import Background from "../../assets/images/zurich-logo.svg";

import "./styles.css";
import Image from "next/image";
import GoogleSvg from "../../assets/images/icons8-google.svg";
import { doLogin } from "@/src/app/actions";
const Login: React.FC = () => {
  return (
    <div className="login-main">
      <div className="login-left">
        <Image src={Background} alt="Background" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Welcome back!</h2>
            <form action={doLogin}>
              <div className="login-center-buttons">
                <button type="submit" name="action" value="google">
                  <Image src={GoogleSvg} alt="Google logo" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Dont have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
