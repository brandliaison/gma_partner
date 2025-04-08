import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import { Link, useParams } from "react-router-dom";
import UIkit from "uikit";
import FormatText from "../../components/FormatText";

export default function JobApplication() {
    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await apiClient.get(`/job-applications`);
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
                            <h3 className="uk-card-title">Jobs Applications</h3>
                            <div>
                                <Link
                                    to={"/op-admin/add-job"}
                                    className="uk-button uk-button-primary"
                                >
                                    Add Job
                                </Link>
                            </div>
                        </div>
                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Job Title</th>
                                            <th>Job Type</th>
                                            <th>Applicant Name</th>
                                            <th>Applicant Email</th>
                                            <th>Applicant Mobile</th>
                                            <th>Applicant City</th>
                                            <th>Applicant Resume</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0 ? (
                                            data?.map((value, index) => (
                                                <tr key={index}>
                                                    <td>{value?.job?.title}</td>
                                                    <td>
                                                        <FormatText
                                                            text={
                                                                value?.job
                                                                    .job_type
                                                            }
                                                        />
                                                    </td>
                                                    <td>{value.name}</td>
                                                    <td>{value.email}</td>
                                                    <td>{value.mobile}</td>
                                                    <td>{value.city}</td>
                                                    <td>
                                                        <a href={value.cv} download={true} className="uk-button uk-button-primary uk-button-small">
                                                            Download
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <p>No data available.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
