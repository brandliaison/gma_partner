import React, { useEffect, useState } from "react";
import apiClient from "../../frontservices/api";
import UIkit from "uikit";

const Skills = ({ onSubmit }) => {

    const [fields, setFields] = useState([
        { id: Date.now(), service: "", remarks: "" },
    ]);

    const addField = () => {
        setFields([...fields, { id: Date.now(), service: "", remarks: "" }]);
    };

    const removeField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    const handleChangeSk = (id, field, value) => {
        setFields((prevFields) =>
            prevFields.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmitSk = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append(
            "user_id",
            `${localStorage.getItem("service_partner_reg")}`
        );
        data.append("skills", JSON.stringify(fields));
        data.append("su_type", "skills");

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
                onSubmit();
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

    const [serviceCategories, setServiceCategories] = useState();

    const getServiceCategories = () => {
        apiClient
            .get(`/v1/op-admin/active-services`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setServiceCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getServiceCategories();
    }, []);

    return (
        <div>
            <h2>Skill/Services</h2>
            <form className="uk-form-stacked" onSubmit={handleSubmitSk}>
                <div className="uk-form-controls">
                    <div className="uk-flex gap-6">
                        <div className="uk-width-1-2">
                            <b>Service</b>
                        </div>
                        <div className="uk-width-1-2">
                            <b>Remarks</b>
                        </div>
                    </div>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="uk-flex gap-6 uk-margin-small-top uk-margin-small-bottom"
                        >
                            {/* Service Dropdown */}
                            <div className="uk-width-1-2">
                                <select
                                    className="uk-select"
                                    name="service"
                                    value={field.service}
                                    onChange={(e) =>
                                        handleChangeSk(
                                            field.id,
                                            "service",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Service</option>
                                    {serviceCategories?.map((val, i) => (
                                        <option value={val._id} key={i}>
                                            {val.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Text Input */}
                            <div className="uk-width-1-2 uk-flex uk-gap-small">
                                <input
                                    type="text"
                                    className="uk-input"
                                    name="remarks"
                                    value={field.text}
                                    onChange={(e) =>
                                        handleChangeSk(
                                            field.id,
                                            "remarks",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* Remove Button (Only show if more than 1 field) */}
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        className="uk-button uk-button-danger"
                                        onClick={() => removeField(field.id)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Add More Button */}
                    <button
                        type="button"
                        className="uk-button uk-button-default uk-button-small"
                        onClick={addField}
                    >
                        + Add More
                    </button>

                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Skills;
