import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api";
import RevisionList from "../../components/RevisionList";

export default function ViewTutorial() {

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
            .get(`/tutorial-videos/${id}`)
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
                                        <div className="uk-margin">
                                            <div>
                                                <b>Slug</b>
                                            </div>
                                            {formData.name}
                                        </div>
                                        <div className="uk-margin">
                                            <div>
                                                <b>Category</b>
                                            </div>
                                            {formData?.category?.name}
                                        </div>
                                        <div className="uk-margin">
                                            <div>
                                                <b>Description</b>
                                            </div>
                                            {formData.description}
                                        </div>
                                        <div className="uk-margin"></div>
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
  )
}
