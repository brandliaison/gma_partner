import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import axios from "axios";
import UIkit from "uikit";
import { Link, useNavigate } from "react-router-dom";

export default function NewSubmittedPosts() {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [entityList, setEntityList] = useState();
    const [entityData, setEntityData] = useState([]);

    const getEntityList = async () => {
        try {
            const response = await apiClient.get("/entity-list");
            setEntityList(response.data);
        } catch (error) {
            console.log(err);

            UIkit.notification({
                message: "Failed to load data!",
                status: "danger",
                timeout: 1000,
                pos: "top-center",
            });
        }
    };

    useEffect(() => {
        getEntityList();
        handelEntityChange();
    }, []);

    const handelEntityChange = async (val) => {
        var valData = val ? val : "Blog";
        const entity_type = { entity_type: valData };
        setData(valData)

        try {
            const response = await apiClient.post(
                "/entity-data-list",
                entity_type
            );
            setEntityData(response.data);
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

    if (entityList == null) {
        return "Loading...";
    }

    const entityArray = Object.entries(entityList?.data);

    const handleView = (id) => {
        navigate(`/op-admin/submitted-post-view/${id}`); // Redirect to second page with blog ID in URL
    };

    console.log(data);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right"></div>

                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-padding-small">
                            <h3 className="uk-card-title">
                                New Submitted Posts
                            </h3>

                            <div>
                                <select
                                    name=""
                                    id=""
                                    className="uk-select"
                                    onChange={(e) =>
                                        handelEntityChange(e.target.value)
                                    }
                                >
                                    {entityArray?.length > 0
                                        ? entityArray.map(([value, index]) => (
                                              <option value={value} key={index}>
                                                  {index}
                                              </option>
                                          ))
                                        : "Data Not Found"}
                                </select>
                            </div>
                        </div>

                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>From Platform</th>
                                            <th>Created By</th>
                                            <th>Approval Status</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entityData?.length > 0 ? (
                                            entityData?.map((value, index) => {
                                                const date = new Date(
                                                    value.created_at
                                                );

                                                // Example: Simple readable format
                                                const formattedDate =
                                                    date.toLocaleString(
                                                        "en-IN"
                                                    );
                                                return (
                                                    <tr key={index}>
                                                        <td>{value.name}</td>
                                                        <td>{value.slug}</td>
                                                        <td>
                                                            {
                                                                value.from_platform
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                value
                                                                    ?.created_by_user
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                value.approval_status
                                                            }
                                                        </td>
                                                        <td>{value.status}</td>
                                                        <td>{formattedDate}</td>
                                                        <td>
                                                            <div className="uk-flex gap-2">
                                                                <div
                                                                    onClick={() =>
                                                                        handleView(
                                                                            value._id
                                                                        )
                                                                    }
                                                                >
                                                                    <Link
                                                                        to={`/op-admin/submitted-post-view/${value._id}`}
                                                                        className="sc-button sc-button-primary sc-js-button-wave-light">
                                                                        <i className="mdi mdi-eye"></i>{" "}
                                                                        View
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td>"Data Not Found"</td>
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
