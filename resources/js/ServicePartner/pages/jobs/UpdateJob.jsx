import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import UIkit from "uikit";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateJob() {
    const { id } = useParams();

    const navigation = useNavigate();

    const [formData, setformData] = useState({
        _method: "PUT",
        title: "",
        description: "",
        positions: "",
        job_type: "",
        is_active: "",
    });

    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await apiClient.get(`/careers/${id}`);
            setData(response.data.data);
            setformData({
                title: response.data.data.title,
                description: response.data.data.description,
                positions: response.data.data.positions,
                job_type: response.data.data.job_type,
                is_active: response.data.data.is_active,
            });
        } catch (error) {
            console.log(error);

            UIkit.notification({
                message: "Failed to load data!",
                status: "danger",
                timeout: 1000,
                pos: "top-center",
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // API Call (Optional)
        apiClient
            .put(`/careers/${id}`, formData)
            .then((response) => {
                console.log("Success:", response.data);
                UIkit.notification({
                    message: "Job created successfully!",
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                setformData({
                    title: "",
                    description: "",
                    positions: "",
                    job_type: "",
                    is_active: "",
                });
                navigation("/service-partner/jobs");
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

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-padding-small">
                            <h3 className="uk-card-title">
                                Update Job Details
                            </h3>
                        </div>

                        <div className="uk-margin-top">
                            <div className="uk-card">
                                <div className="uk-card-body">
                                    <form onSubmit={handleSubmit}>
                                        <fieldset className="uk-fieldset">
                                            <div
                                                className="uk-grid uk-grid-small "
                                                uk-grid="true"
                                            >
                                                <div>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        value={formData.title}
                                                        placeholder="Job Title"
                                                        data-sc-input
                                                    />
                                                    <select
                                                        name="job_type"
                                                        className="uk-select uk-margin-bottom"
                                                        onChange={handleChange}
                                                        value={
                                                            formData.job_type
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Job Type
                                                        </option>
                                                        <option value="general">
                                                            General Vacancy
                                                        </option>
                                                        <option value="current_opening">
                                                            Current Opening
                                                        </option>
                                                    </select>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="positions"
                                                        onChange={handleChange}
                                                        value={
                                                            formData.positions
                                                        }
                                                        placeholder="Positions"
                                                        data-sc-input
                                                    />
                                                </div>
                                            </div>
                                            <div className="uk-margin">
                                                <textarea
                                                    className="uk-textarea"
                                                    rows="5"
                                                    name="description"
                                                    onChange={handleChange}
                                                    value={formData.description}
                                                    placeholder="Discription"
                                                    data-sc-input
                                                ></textarea>
                                            </div>
                                            <div className="uk-margin">
                                                <input
                                                    type="submit"
                                                    className="sc-button waves-effect waves-button solid-button"
                                                    value="Submit"
                                                ></input>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
