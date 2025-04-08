import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RevisionList from "../../../components/RevisionList";
import apiClient from "../../../services/api";

export default function ViewNotificationCategories() {
    const { id } = useParams();
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
            .get(`/notification-categories/${id}`)
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
                                    <h2>{formData.name}</h2>
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
