import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../services/api";
import UIkit from "uikit";
import FormatText from "../../../components/FormatText";
import RevisionList from "../../../components/RevisionList";

export default function ViewServiceCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setformData] = useState({
        name: "",
        description: "",
        title: "",
        slug: "",
    });

    // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        editblogcategory();
    }, []);

    const editblogcategory = () => {
        apiClient
            .get(`/service-categories/${id}`)
            .then((res) => {
                setformData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-child-width-1-1@l" data-uk-grid>
                        <div>
                            <div className="uk-card">
                                <div className="uk-card-body">
                                    <h5 className="uk-heading-line">
                                        <span>Service Category Details</span>
                                    </h5>

                                    <fieldset className="uk-fieldset">
                                        <div className="uk-width-1-2">
                                            <div
                                                className="uk-padding-small"
                                                style={{
                                                    border: "1px solid #ccc",
                                                }}
                                            >
                                                <b>Name</b>: {formData.name}
                                            </div>
                                        </div>

                                        <div className="uk-width-1-2">
                                            <div
                                                className="uk-padding-small"
                                                style={{
                                                    border: "1px solid #ccc",
                                                }}
                                            >
                                                <b>Title</b>: {formData.title}
                                            </div>
                                        </div>

                                        <div className="uk-width-1-2">
                                            <div
                                                className="uk-padding-small"
                                                style={{
                                                    border: "1px solid #ccc",
                                                }}
                                            >
                                                <b>Slug</b>: {formData.slug}
                                            </div>
                                        </div>

                                        <div className="uk-width-1-2">
                                            <div
                                                className="uk-padding-small"
                                                style={{
                                                    border: "1px solid #ccc",
                                                }}
                                            >
                                                <b>Description</b>:{" "}
                                                {formData.description}
                                            </div>
                                        </div>

                                        <div className="uk-width-1-2">
                                            <div
                                                className="uk-padding-small"
                                                style={{
                                                    border: "1px solid #ccc",
                                                }}
                                            >
                                                <b>Parent Category</b>:{" "}
                                                {formData?.parent_cat?.name}
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="uk-margin-top">
                                        <h2>Post Revisions</h2>
                                        <div>
                                            <RevisionList
                                                data={formData?.revisions}
                                            />
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
