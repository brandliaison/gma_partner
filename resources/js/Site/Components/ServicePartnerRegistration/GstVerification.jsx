import React, { useState } from "react";
import UIkit from "uikit";
import apiClient, { gstToken } from "../../services/api";
import axios from "axios";

export default function GstVerification({ user, onSubmit }) {
    const [userData, setUserData] = useState(user);
    const [formData, setFormData] = useState({
        gst_number: "",
    });

    const [disGst, setDisGst] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleGstVerify = async () => {
        try {
            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/corporate/gstin",
                {
                    id_number: formData.gst_number,
                },
                {
                    headers: {
                        Authorization: `Bearer ${gstToken}`, // Replace with actual API key
                        "Content-Type": "application/json",
                    },
                }
            );

            UIkit.notification({
                message: "GST Verified Successfully",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });

            setDisGst(true);
            const gstData = new FormData();
            gstData.append(
                "user_id",
                `${localStorage.getItem("service_partner_reg")}`
            );
            // setFormData(office_address.response.data.data.address)
            console.log(response.data);

            gstData.append("gst_number", formData.gst_number);
            gstData.append("gst_verified", true);
            gstData.append("gst_details", JSON.stringify(response.data.data));
            gstData.append("su_type", "gst_verification");
            apiClient
                .post(`/service-partner-details-save`, gstData)
                .then((response) => {
                    onSubmit();
                    setUserData(response?.data?.data);
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
                "Error GST Verification:",
                error?.response?.data?.message || "Invalid GST Number"
            );
            UIkit.notification({
                message: error?.response?.data?.message || "Invalid GST Number",
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
                    GST Number <span className="uk-text-danger">*</span>
                    <input
                        type="text"
                        className="uk-input"
                        placeholder="Enter GST Number"
                        name="gst_number"
                        onChange={handleChange}
                        value={userData?.gst_number ?? formData.gst_number}
                        disabled={disGst}
                        readOnly={userData?.gst_number ? true : false}
                    />
                </label>

                {!userData?.gst_number ? (
                    <div className="uk-margin">
                        <button
                            className="uk-button uk-button-primary"
                            type="button"
                            onClick={handleGstVerify}
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
