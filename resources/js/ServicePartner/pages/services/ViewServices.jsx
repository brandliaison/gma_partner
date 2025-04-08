import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../services/api";
import RevisionList from "../../components/RevisionList";
import FormatText from "../../components/FormatText";
import FormattedDate from "../../components/FormattedDate";

export default function ViewServices() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tutorialcategrydata, settutorialcategrydata] = useState([]);
    const [formData, setformData] = useState({
        name: "",
        service_category_id: "",
        image_url: null,
        image_alt: "",
        description: "",
        compliance_header: "",
    });

    const edittutorial = () => {
        apiClient
            .get(`/services/${id}`)
            .then((res) => {
                setformData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        edittutorial();
    }, []);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-child-width-1-1@l" data-uk-grid>
                        <div>
                            <div className="uk-card">
                                <div className="uk-card-body">
                                    <h2>Service Details</h2>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-flex uk-flex-between gap-3">
                                            <div className="uk-width-1-2">
                                                <div
                                                    className="uk-padding-small"
                                                    style={{
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <b>Title</b>:{" "}
                                                    {formData.name}
                                                </div>
                                                <div
                                                    className="uk-padding-small"
                                                    style={{
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <b>Slug</b>: {formData.slug}
                                                </div>
                                                <div
                                                    className="uk-padding-small"
                                                    style={{
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <b>Category</b>:{" "}
                                                    {formData?.category?.name}
                                                </div>

                                                <div
                                                    className="uk-padding-small"
                                                    style={{
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <b>Status</b>:{" "}
                                                    <FormatText text={formData?.status} />
                                                </div>
                                                <div
                                                    className="uk-padding-small"
                                                    style={{
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <div>
                                                        <b>Description</b>
                                                    </div>
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
                                                    <b>Image</b>:{" "}
                                                    <img src={formData?.image_url} alt="" />
                                                </div>
                                                <div
                                                    className="uk-padding-small"
                                                    style={{
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <b>Date</b>:{" "} <FormattedDate getDate={formData?.created_at} />
                                                </div>
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
