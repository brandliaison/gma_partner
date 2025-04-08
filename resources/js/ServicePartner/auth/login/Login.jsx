import React, { useState } from "react";
import "./login.css";
import { login } from "../../services/api";
import UIkit from "uikit";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [logformdata, setlogformdata] = useState({
        mobile: "",
        password: "",
    });

    // Handle text input changes
    const handleChange = (e) => {
        setlogformdata({
            ...logformdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(logformdata); // Call API
            console.log(response.data);
            UIkit.notification({
                message: response.data.message || "Login In successfully",
                status: "success",
                timeout: 1000,
                pos: "top-center",
            });
            setlogformdata({
                mobile: "",
                password: "",
            });
            if (response.data.token) {
                navigate("/service-partner/dashboard");
            }
        } catch (err) {
            console.log("Login Error:", err);
            UIkit.notification({
                message:
                    err.response.data.message || "Unable To Login Got an Error",
                status: "danger",
                timeout: 1000,
                pos: "top-center",
            });
        }
    };

    return (
        <>
            <div
                className="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper"
                style={{ height: "100vh" }}
            >
                <div className="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl">
                    <div className="uk-card">
                        <div className="uk-card-body">
                            <div
                                id="sc-login-form"
                                className="sc-toggle-login-register sc-toggle-login-password"
                            >
                                <h4 className="uk-text-center">Partner Login</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="sc-login-page-inner">
                                        <div className="uk-margin-medium">
                                            <label for="sc-login-username">
                                                Mobile
                                            </label>
                                            <input
                                                id="sc-login-username"
                                                name="mobile"
                                                onChange={handleChange}
                                                value={logformdata.mobile}
                                                type="text"
                                                className="uk-input"
                                                data-sc-input
                                            />
                                        </div>
                                        <div className="uk-margin-medium">
                                            <label for="sc-login-password">
                                                Password
                                            </label>
                                            <input
                                                id="sc-login-password"
                                                name="password"
                                                onChange={handleChange}
                                                value={logformdata.password}
                                                type="password"
                                                className="uk-input"
                                                data-sc-input
                                            />
                                            <div className="uk-margin-small-top uk-text-small uk-text-right@s">
                                                <a
                                                    href="#"
                                                    className="sc-link"
                                                    data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up"
                                                >
                                                    Forgot Password?
                                                </a>
                                            </div>
                                        </div>
                                        <div className="uk-margin-large-top">
                                            <input
                                                type="submit"
                                                value="Sign In"
                                                className="sc-button sc-button-large sc-button-block sc-button-danger"
                                            ></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div
                                id="sc-register-form"
                                className="sc-toggle-login-register"
                                hidden
                            >
                                <div className="sc-login-page-inner">
                                    <div className="uk-margin-medium">
                                        <label for="sc-register-username">
                                            Name
                                        </label>
                                        <input
                                            id="sc-register-username"
                                            type="text"
                                            className="uk-input"
                                            data-sc-input
                                        />
                                    </div>
                                    <div className="uk-margin-medium">
                                        <label for="sc-register-email">
                                            Email
                                        </label>
                                        <input
                                            id="sc-register-email"
                                            type="text"
                                            className="uk-input"
                                            data-sc-input
                                        />
                                    </div>
                                    <div className="uk-margin-medium">
                                        <label for="sc-register-password">
                                            Password
                                        </label>
                                        <input
                                            id="sc-register-password"
                                            type="password"
                                            className="uk-input"
                                            data-sc-input
                                        />
                                    </div>
                                    <div className="uk-margin-large-top">
                                        <button className="sc-button sc-button-large sc-button-block sc-button-primary">
                                            Sign Up
                                        </button>
                                        <div className="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
                                            <a
                                                href="#"
                                                className="sc-text-semibold"
                                                data-uk-toggle="target: .sc-toggle-login-register; animation: uk-animation-scale-up"
                                            >
                                                Back to login form
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="sc-password-form"
                                className="sc-toggle-login-password"
                                hidden
                            >
                                <div className="sc-login-page-inner">
                                    <div className="uk-margin-medium">
                                        Please enter your email address. You
                                        will receive a link to reset your
                                        password.
                                    </div>
                                    <div className="uk-margin-medium">
                                        <label for="sc-reset-email">
                                            Email
                                        </label>
                                        <input
                                            id="sc-reset-email"
                                            type="text"
                                            className="uk-input"
                                            data-sc-input
                                        />
                                    </div>
                                    <div className="uk-margin-large-top">
                                        <button className="sc-button sc-button-large sc-button-block sc-button-primary">
                                            Reset Password
                                        </button>
                                        <div className="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
                                            <a
                                                href="#"
                                                className="sc-text-semibold"
                                                data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up"
                                            >
                                                Back to login form
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
