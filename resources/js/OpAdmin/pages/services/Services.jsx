import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/api";
import UIkit from "uikit";
import FormattedDate from "../../components/FormattedDate";
import FormatText from "../../components/FormatText";

export default function Services() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState();

    const getCategories = () => {
        apiClient
            .get(`/services`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteCategory = (id) => {
        apiClient
            .delete(`/services/${id}`)
            .then((res) => {
                UIkit.notification({
                    message:
                        res.data.message || "Category deleted successfully!",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                getCategories();
            })
            .catch((err) => {
                console.log(err);

                UIkit.notification({
                    message: "Failed to delete blog!",
                    status: "danger",
                    timeout: 1000,
                    pos: "top-center",
                });
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    console.log(categories);

    const handleViewService = (id) => {
        navigate(`/op-admin/editservices/${id}`); // Redirect to second page with blog ID in URL
    };

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right">
                        <Link to="/op-admin/addservices">
                            <button className="sc-fab sc-fab-text sc-fab-success solid-button">
                                <i className="mdi mdi-plus"></i>Create
                            </button>
                        </Link>
                    </div>

                    <form
                        className="uk-search uk-search-default uk-width-1-1 uk-background-default uk-border-rounded uk-flex uk-flex-middle uk-margin-top"
                        style={{ padding: "10px 15px" }}
                    >
                        <span
                            style={{
                                color: "gray",
                                fontSize: "24px",
                                padding: "5px",
                            }}
                        >
                            <i className="mdi mdi-magnify"></i>
                        </span>
                        <input
                            className="uk-search-input uk-width-1-1 uk-background-default uk-border-none"
                            type="search"
                            placeholder="Search..."
                            style={{ border: "none" }}
                        />
                    </form>

                    <div className="uk-card uk-margin">
                        <h3 className="uk-card-title">Services</h3>
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
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Approval Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.length > 0 ? (
                                            categories?.map((value, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            className="uk-checkbox sc-js-table-checkbox"
                                                            type="checkbox"
                                                            data-sc-icheck
                                                        />
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={value.image_url}
                                                            className="sc-avatar uk-preserve-width"
                                                            alt={
                                                                value.image_alt
                                                            }
                                                            style={{
                                                                borderRadius:
                                                                    "5px",
                                                                maxWidth:
                                                                    "150px",
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{value.name}</td>
                                                    <td>
                                                        {
                                                            value.compliance_header
                                                        }
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        <FormatText text={value.status} />
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        <FormatText text={value.approval_status} />
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        <FormattedDate getDate={value.created_at} />
                                                    </td>
                                                    <td>
                                                        <div className="uk-flex gap-2">
                                                            <div>
                                                                <Link
                                                                    to={`/op-admin/view-service/${value._id}`}
                                                                    className="sc-button sc-button-primary sc-js-button-wave-light"
                                                                >
                                                                    <i className="mdi mdi-eye"></i>
                                                                </Link>
                                                            </div>
                                                            <div
                                                                onClick={() =>
                                                                    handleViewService(
                                                                        value._id
                                                                    )
                                                                }
                                                            >
                                                                <a
                                                                    className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-file-edit">
                                                                        {" "}
                                                                    </i>
                                                                </a>
                                                            </div>
                                                            <div
                                                                onClick={(e) =>
                                                                    deleteCategory(
                                                                        value._id
                                                                    )
                                                                }
                                                            >
                                                                <a
                                                                    className="sc-button sc-button-danger sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-trash-can-outline"></i>{" "}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>
                                                    <p>No blogs available.</p>
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
