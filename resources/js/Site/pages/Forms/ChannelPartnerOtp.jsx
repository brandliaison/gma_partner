import React, { useState } from "react";
import apiClient from "../../services/api";
import UIkit from "uikit";
import { useNavigate } from "react-router-dom";

export default function ChannelPartnerOtp() {

    const navigate = useNavigate()
    const [emailOtp, setEmailOtp] = useState();
    const [emailDisabled, setEmailDisabled] = useState(false);
    const [mobileOtp, setMobileOtp] = useState();
    const [mobileDisabled, setMobileDisabled] = useState(false);

    const userData = localStorage.getItem("channel_partner_reg");

    const resendOtp = (e) => {
        // API Call (Optional)
        apiClient
            .post(`/resend-channel-partner-otp`, {
                id: userData,
                type: e,
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                UIkit.notification({
                    message: error?.response?.data?.message,
                    status: "danger",
                    timeout: 2000,
                    pos: "top-center",
                });
            });
    };

    const verifyOtp = (e) => {
        // API Call (Optional)
        if (e === "email") {
            var otp = emailOtp;
        }
        if (e === "mobile") {
            var otp = mobileOtp;
        }
        apiClient
            .post(`/verify-channel-partner-otp`, {
                id: userData,
                type: e,
                otp: otp,
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: response?.data?.status,
                    timeout: 2000,
                    pos: "top-center",
                });
                if (response?.data?.status == "success") {
                    if (e === "email") {
                        setEmailDisabled(true);
                    }
                    if (e === "mobile") {
                        setMobileDisabled(true);
                    }
                    if(response?.data?.url == true)
                    {
                        navigate("/channel-partner-details");
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                UIkit.notification({
                    message: error?.response?.data?.message,
                    status: response?.data?.status,
                    timeout: 2000,
                    pos: "top-center",
                });
            });
    };

    return (
        <div className="uk-flex uk-flex-center uk-padding-large">
            <div style={{ width: "600px" }}>
                <h2>Verify OTP</h2>
                <div className="uk-margin">
                    <label>
                        Email OTP <span className="uk-text-danger">*</span>
                    </label>
                    <br />
                    <div uk-form-custom="target: true">
                        <input
                            class="uk-input uk-form-width-medium"
                            type="text"
                            placeholder="Enter Email OTP"
                            name="email_otp"
                            onChange={(e) => setEmailOtp(e.target.value)}
                            value={emailOtp}
                            disabled={emailDisabled}
                        />
                    </div>
                    <button
                        class="uk-button uk-button-default"
                        onClick={() => verifyOtp("email")}
                    >
                        Submit
                    </button>
                    <div>
                        <button
                            class="uk-text-small"
                            onClick={() => resendOtp("email")}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
                <div className="uk-margin">
                    <label>
                        Mobile OTP <span className="uk-text-danger">*</span>
                    </label>
                    <br />
                    <div uk-form-custom="target: true">
                        <input
                            class="uk-input uk-form-width-medium"
                            type="text"
                            placeholder="Enter Mobile OTP"
                            name="mobile_otp"
                            onChange={(e) => setMobileOtp(e.target.value)}
                            value={mobileOtp}
                        />
                    </div>
                    <button
                        class="uk-button uk-button-default"
                        onClick={() => verifyOtp("mobile")}
                    >
                        Submit
                    </button>
                    <div>
                        <button
                            class="uk-text-small"
                            onClick={() => resendOtp("mobile")}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
