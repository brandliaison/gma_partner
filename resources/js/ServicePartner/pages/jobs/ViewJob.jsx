import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import { Link, useParams } from "react-router-dom";
import UIkit from "uikit";
import FormatText from "../../components/FormatText";

export default function ViewJob() {
    const { id } = useParams();

    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await apiClient.get(`/careers/${id}`);
            setData(response.data.data);
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
    console.log(data);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-padding-small">
                            <h3 className="uk-card-title">Jobs Details</h3>
                            <div>
                                <Link
                                    to={"/service-partner/add-job"}
                                    className="uk-button uk-button-primary"
                                >
                                    Add Job
                                </Link>
                            </div>
                        </div>
                        <div className="uk-card-body">
                            <div>
                                <p>
                                    <b>Job Title</b>
                                </p>
                                <p>{data?.title}</p>
                            </div>

                            <div className="uk-margin-small-top">
                                <p>
                                    <b>Job Type</b>
                                </p>
                                <p>
                                    <FormatText text={data?.job_type} />
                                </p>
                            </div>

                            <div className="uk-margin-small-top">
                                <p>
                                    <b>Positions</b>
                                </p>
                                <p>
                                    <FormatText text={data?.positions} />
                                </p>
                            </div>

                            <div className="uk-margin-small-top">
                                <p>
                                    <b>Description</b>
                                </p>
                                <p>
                                    <FormatText text={data?.description} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
