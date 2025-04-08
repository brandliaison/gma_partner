import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import UIkit from "uikit";

export default function Career() {
    const [data, setData] = useState();
    const [jobtitle, setJobtitle] = useState();
    const [jobId, setJobId] = useState();

    const getData = () => {
        apiClient
            .get("/active-jobs")
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const [formData, setFormData] = useState({
        job_id: "",
        name: "",
        email: null,
        mobile: null,
        city: null,
        cv: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("job_id", jobId);
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
        data.append("city", formData.city);
        data.append("cv", formData.cv);

        // API Call (Optional)
        apiClient
            .post(`/apply-jobs`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                UIkit.modal("#my-id").hide();
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0], // Store the first selected file
        });
    };

    return (
        <div className="uk-padding-large" id="pageId">
            <h2>Career</h2>

            <div className="uk-margin-top">
                <h4>Current Job Openings</h4>
                <ul uk-accordion="true">
                    {data?.map((val, i) => (
                        <li key={i}>
                            <a className="uk-accordion-title">{val.title}</a>
                            <div className="uk-accordion-content">
                                Positions: {val.positions}
                                <br />
                                Job Description: {val.description}
                                <div className="uk-margin-top">
                                    <button
                                        className="uk-button uk-button-primary"
                                        uk-toggle="target: #my-id"
                                        type="button"
                                        onClick={() => {
                                            setJobtitle(val.title),
                                                setJobId(val._id);
                                        }}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="my-id" uk-modal="true" container="#pageId">
                <div className="uk-modal-dialog uk-modal-body">
                    <h4 className="uk-modal-title">Apply For Job</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                htmlFor="job-title"
                            >
                                Job Title
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="job-title"
                                    type="text"
                                    value={jobtitle}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="name">
                                Name
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="email">
                                Email
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="mobile">
                                Mobile
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="city">
                                City
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="cv">
                                Upload CV
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="cv"
                                    name="cv"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <button type="submit" className="uk-button uk-button-primary">
                                Apply Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
