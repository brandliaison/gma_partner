import axios from "axios";
import React, { useState } from "react";
import UIkit from "uikit";
import apiClient, { gstToken } from "../../services/api";

export default function AadharVerification({user, onSubmit}) {

    const [userData, setUserData] = useState(user);
    const [formData, setFormData] = useState({
        aadhar_number: "",
    });

    const [disAadhar, setDisAadhar] = useState(false);
    const [otpButton, setOtpButton] = useState(false);
    const [genOtpButton, setGenOtpButton] = useState(true);
    const [aadharClientId, setAadharClientId] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAadharOTP = async () => {
        if (formData.aadhar_number.length < 12) {
            UIkit.notification({
                message: "Aadhar Number Must be in 12 digits.",
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
            return false;
        }
        try {
            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp",
                {
                    id_number: formData.aadhar_number, // Aadhar Number from Form Data
                },
                {
                    headers: {
                        Authorization: `Bearer ${gstToken}`, // Replace with actual API key
                        "Content-Type": "application/json",
                    },
                }
            );

            setDisAadhar(true);
            setOtpButton(true);
            setGenOtpButton(false);
            setAadharClientId(response.data.data.client_id);
            UIkit.notification({
                message: "OTP Sent Successfully",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });
            console.log("OTP Sent Successfully:", response.data);
        } catch (error) {
            console.error("Error sending OTP:", error);
            var msg = "Verification Failed.";
            if (error?.response.data.data?.status == "invalid_aadhaar") {
                msg = "Invalid Aadhar Number.";
            }
            UIkit.notification({
                message: msg,
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
        }
    };

    const handleOtpVerify = async () => {
        try {
            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/aadhaar-v2/submit-otp",
                {
                    client_id: aadharClientId,
                    otp: formData.aadhar_otp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${gstToken}`, // Replace with actual API key
                        "Content-Type": "application/json",
                    },
                }
            );

            UIkit.notification({
                message: "OTP Verified Successfully",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });

            const aadharData = new FormData();
            aadharData.append(
                "user_id",
                `${localStorage.getItem("service_partner_reg")}`
            );
            console.log(response.data);

            aadharData.append("aadhar_number", formData.aadhar_number);
            aadharData.append("aadhar_verified", true);
            aadharData.append(
                "aadhar_details",
                JSON.stringify(response.data.data)
            );
            aadharData.append("su_type", "aadhar_verification");
            apiClient
                .post(`/service-partner-details-save`, aadharData)
                .then((response) => {
                    onSubmit();
                    setOtpButton(false);
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
        } catch (error) {
            console.error(
                "Error sending OTP:",
                error.response?.data || error.message
            );
            UIkit.notification({
                message: error.response?.data || error.message,
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
        }
    };

    return (
        <>
            <div className="uk-margin">
                <label>
                    Aadhar Number <span className="uk-text-danger">*</span>
                    <input
                        type="text"
                        className="uk-input"
                        placeholder="Enter Aadhar Number"
                        name="aadhar_number"
                        onChange={handleChange}
                        value={
                            userData?.aadhar_number ?? formData.aadhar_number
                        }
                        disabled={disAadhar}
                        readOnly={userData?.aadhar_number ? true : false}
                    />
                </label>

                {otpButton == true ? (
                    <div className="uk-margin-small-top">
                        <label>
                            Aadhar OTP <span className="uk-text-danger">*</span>
                            <input
                                type="text"
                                className="uk-input"
                                placeholder="Enter Aadhar OTP"
                                name="aadhar_otp"
                                onChange={handleChange}
                                value={formData.aadhar_otp}
                            />
                        </label>
                    </div>
                ) : (
                    ""
                )}

                {genOtpButton == true && !userData?.aadhar_number ? (
                    <div className="uk-margin">
                        <button
                            className="uk-button uk-button-primary"
                            type="button"
                            onClick={handleAadharOTP}
                        >
                            Generate OTP
                        </button>
                    </div>
                ) : (
                    ""
                )}
                {otpButton == true ? (
                    <div className="uk-margin">
                        <button
                            className="uk-button uk-button-primary"
                            type="button"
                            onClick={handleOtpVerify}
                        >
                            Verify OTP
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
