import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import { Link, useParams } from "react-router-dom";
import UIkit from "uikit";
import FormatText from "../../components/FormatText";

export default function Job() {
    const { id } = useParams();

    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await apiClient.get(`/careers`);
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

    const deleteJob = (id) => {
        apiClient
            .delete(`/careers/${id}`)
            .then((res) => {
                UIkit.notification({
                    message:
                        res.data.message || "Job deleted successfully!",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                getData();
            })
            .catch((err) => {
                console.log(err);

                UIkit.notification({
                    message: "Failed to delete job!",
                    status: "danger",
                    timeout: 1000,
                    pos: "top-center",
                });
            });
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
                            <h3 className="uk-card-title">Jobs List</h3>
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
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    className="uk-checkbox sc-main-checkbox"
                                                    type="checkbox"
                                                    data-sc-icheck
                                                    data-group=".sc-js-table-checkbox"
                                                />
                                            </th>
                                            <th>Title</th>
                                            <th>Job Type</th>
                                            <th>Positions</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0 ? (
                                            data?.map((value, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            className="uk-checkbox sc-js-table-checkbox"
                                                            type="checkbox"
                                                            data-sc-icheck
                                                        />
                                                    </td>
                                                    <td>{value.title}</td>
                                                    <td>
                                                        <FormatText
                                                            text={
                                                                value.job_type
                                                            }
                                                        />
                                                    </td>
                                                    <td>{value.positions}</td>
                                                    <td>
                                                        {value.is_active == true
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </td>
                                                    <td>
                                                        <div className="uk-flex gap-2">
                                                            <div>
                                                                <Link
                                                                    to={`/service-partner/view-job/${value._id}`}
                                                                    className="sc-button sc-button-primary sc-js-button-wave-light"
                                                                >
                                                                    <i className="mdi mdi-eye"></i>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Link
                                                                    to={`/service-partner/update-job/${value._id}`}
                                                                    className="sc-button sc-button-warning sc-js-button-wave-light"
                                                                >
                                                                    <i className="mdi mdi-file-edit"></i>
                                                                </Link>
                                                            </div>
                                                            <div
                                                                onClick={(e) =>
                                                                    deleteJob(
                                                                        value._id
                                                                    )
                                                                }
                                                            >
                                                                <a
                                                                    className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-trash-can-outline"></i>
                                                                </a>
                                                            </div>
                                                        </div>
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
