import React, { useEffect, useState } from "react";
import apiClient, { gstToken } from "../../services/api";
import UIkit from "uikit";
import { useNavigate } from "react-router-dom";
import Academic from "../../Components/ServicePartnerRegistration/Academic";
import Skills from "../../Components/ServicePartnerRegistration/Skills";
import Profile from "../../Components/ServicePartnerRegistration/Profile";
import axios from "axios";
import AadharVerification from "../../Components/ServicePartnerRegistration/AadharVerification";
import GstVerification from "../../Components/ServicePartnerRegistration/GstVerification";
import Branches from "../../Components/ServicePartnerRegistration/Branches";

export default function ServicePartnerDetails() {
    // const navigate = useNavigate();
    const [user, setUser] = useState();
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        aadhar_number: "",
        office_address: "",
        office_district: "",
        office_state: "",
        office_pincode: "",
        dob: "",
        id_card: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0], // Store the first selected file
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append(
            "user_id",
            `${localStorage.getItem("service_partner_reg")}`
        );
        data.append("office_address", formData.office_address);
        data.append("office_district", formData.office_district);
        data.append("office_state", formData.office_state);
        data.append("office_pincode", formData.office_pincode);
        data.append("dob", formData.dob);
        data.append("id_card", formData.id_card);
        data.append("su_type", "verification");

        // API Call (Optional)
        apiClient
            .post(`/service-partner-details-save`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                getData();
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

    const getData = () => {
        apiClient
            .get(
                `/get-service-partner/` +
                    localStorage.getItem("service_partner_reg"),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                setUser(res.data.user);
                setFormData({
                    dob: user?.dob,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChildSubmit = (data) => {
        getData();
    };

    return (
        <div className="uk-flex uk-flex-center uk-padding-large">
            <div style={{ width: "600px" }}>
                {user?.steps == "step1" ? (
                    <div>
                        <h2>Service Partner Registration</h2>
                        <form
                            className="uk-form-stacked"
                            onSubmit={handleSubmit}
                        >
                            <div className="uk-form-controls">
                                <h4 className="uk-margin-small-bottom">
                                    <b>Verification Details:</b>{" "}
                                </h4>
                                {user?.country == "India" ? (
                                    <>
                                        {user?.reg_type === "Individual" ? (
                                            <AadharVerification
                                                user={user}
                                                onSubmit={handleChildSubmit}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        {user?.reg_type === "Company" ? (
                                            <GstVerification
                                                user={user}
                                                onSubmit={handleChildSubmit}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </>
                                ) : (
                                    ""
                                )}

                                {user?.country !== "India" ? (
                                    <>
                                        <div className="uk-margin">
                                            <label>
                                                Upload ID Card{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="file"
                                                    className="uk-input"
                                                    placeholder="Upload ID Card"
                                                    name="id_card"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                {user?.aadhar_verified || user?.gst_verified ? (
                                    <>
                                        <div className="uk-margin">
                                            <label>
                                                Office Address{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Enter Office Address"
                                                    name="office_address"
                                                    onChange={handleChange}
                                                    value={
                                                        formData.office_address
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="uk-margin">
                                            <label>
                                                Office District / County
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Enter Office District / County"
                                                    name="office_district"
                                                    onChange={handleChange}
                                                    value={
                                                        formData.office_district
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="uk-margin">
                                            <label>
                                                Office State / Province{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Enter Office State / Province"
                                                    name="office_state"
                                                    onChange={handleChange}
                                                    value={
                                                        formData.office_state
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="uk-margin">
                                            <label>
                                                Office Pincode / Zipcode{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Office Pincode / Zipcode"
                                                    name="office_pincode"
                                                    onChange={handleChange}
                                                    value={
                                                        formData.office_pincode
                                                    }
                                                />
                                            </label>
                                        </div>

                                        <div className="uk-margin">
                                            <label>
                                                Date Of Birth{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="date"
                                                    className="uk-input"
                                                    placeholder="Date Of Birth"
                                                    name="dob"
                                                    onChange={handleChange}
                                                    value={formData.dob}
                                                    max={today}
                                                />
                                            </label>
                                        </div>

                                        <div className="uk-margin">
                                            <button className="uk-button uk-button-primary">
                                                Next
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}
                {user?.steps == "step2" ? (
                    <>
                        {user?.reg_type == "Individual" ? (
                            <Academic
                                user={user}
                                onSubmit={handleChildSubmit}
                            />
                        ) : (
                            ""
                        )}
                        {user?.reg_type == "Company" ? (
                            <Branches
                                user={user}
                                onSubmit={handleChildSubmit}
                            />
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    ""
                )}

                {user?.steps == "step3" ? (
                    <Skills onSubmit={handleChildSubmit} />
                ) : (
                    ""
                )}
                {user?.steps == "step4" ? (
                    <Profile user={user} onSubmit={handleChildSubmit} />
                ) : (
                    ""
                )}
                {user?.steps == "step5" ? (
                    <>
                        <h2>Thank you, We will contact you soon.</h2>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
