import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import axios from "axios";
import UIkit from "uikit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormatText from "../../components/FormatText";

export default function ViewSubmittedPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const [data, setData] = useState();

    const getEntityList = async () => {
        const revData = { entity_id: id };
        try {
            const response = await apiClient.post("/entity-revisions", revData);
            setData(response.data);
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
        getEntityList();
    }, []);

    const [formData, setformData] = useState({
        revision_id: data?.data[0]?._id | "",
        review_status: "",
        review_comment: "",
    });

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddReview = async (e) => {
        e.preventDefault();

        const fdata = new FormData();
        fdata.append("revision_id", data?.data[0]?._id);
        fdata.append("review_status", formData.review_status);
        fdata.append("review_comment", formData.review_comment);

        try {
            const response = await apiClient.post("/add-review", fdata);
            console.log(response);
            if (response.status == 200) {
                UIkit.modal("#review-modal").hide();
            }

            getEntityList();
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

    if (!data?.data > 0) {
        return "Loading...";
    }

    const date = new Date(data?.data[0]?.entity_data?.created_at);
    const formattedDate = date.toLocaleString("en-IN");

    const formatText = (text) => {
        return text
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    };

    return (
        <div id="pageId">
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-flex uk-flex-right"></div>

                <div className="uk-card uk-margin">
                    <div className="uk-flex uk-flex-between uk-flex-middle uk-padding-small">
                        <h3 className="uk-card-title">
                            Post Revision for: {data?.data[0]?.entity_data?.name}
                        </h3>

                        <div>
                            <button
                                className="uk-button uk-button-primary uk-border-pill"
                                uk-toggle="target: #review-modal"
                                type="button"
                            >
                                Add Review
                            </button>
                        </div>
                    </div>

                    <div className="uk-card-body">
                        <div className="uk-overflow-auto">
                            <h2>Latest Post Revision Details</h2>
                            <div className="uk-flex gap-6">
                                <div className="uk-width-2-3">
                                    <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                        <tbody>
                                            <tr>
                                                <td className="uk-width-1-6">Name</td>
                                                <td>{data?.data[0]?.entity_data?.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Slug</td>
                                                <td>{data?.data[0]?.entity_data?.slug}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{data?.data[0]?.entity_data?.description}</td>
                                            </tr>
                                            <tr>
                                                <td>From Platform</td>
                                                <td><FormatText text={data?.data[0]?.from_platform} /></td>
                                            </tr>
                                            <tr>
                                                <td>Approval Status</td>
                                                <td><FormatText text={data?.data[0]?.entity_data?.approval_status} /></td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td><FormatText text={data?.data[0]?.entity_data?.status} /></td>
                                            </tr>
                                            <tr>
                                                <td>Created By</td>
                                                <td>{data?.data[0]?.entity_data?.created_by_user?.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Created Date</td>
                                                <td>{formattedDate}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="uk-width-1-4">
                                    <div><b>Reviews</b></div>
                                    <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                        <tbody>
                                            {data?.data[0]?.reviews?.map((value, index) => {
                                                const date = new Date(value.created_at);
                                                const formattedDate = date.toLocaleString("en-IN");
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>Date</td>
                                                            <td>{formattedDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Comment</td>
                                                            <td>{value.review_comment}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Status</td>
                                                            <td><FormatText text={value.review_status} /></td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="uk-margin-top">
                                <h2>Post Revisions</h2>
                                <div>
                                    {data?.data.length > 0 ? (
                                        data?.data.map((value, index) => {
                                            const date = new Date(value.created_at);
                                            const formattedDate = date.toLocaleString("en-IN");
                                            return (
                                                <div
                                                    key={index}
                                                    className="uk-padding-small uk-margin-bottom"
                                                    style={{ border: "1px solid #ccc" }}
                                                >
                                                    <div className="uk-margin-bottom">
                                                        Date: {formattedDate}
                                                    </div>
                                                    <div className="uk-flex gap-6">
                                                        <div className="uk-width-1-2">
                                                            <b>New Data</b>
                                                            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="uk-width-1-4">Name</td>
                                                                        <td>{value.new_data?.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Slug</td>
                                                                        <td>{value.new_data?.slug}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Description</td>
                                                                        <td>{value.new_data?.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Revised By</td>
                                                                        <td>{value.revised_user?.name}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="uk-width-1-2">
                                                            <b>Old Data</b>
                                                            <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="uk-width-1-4">Name</td>
                                                                        <td>{value.old_data?.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Slug</td>
                                                                        <td>{value.old_data?.slug}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Description</td>
                                                                        <td>{value.old_data?.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Revised By</td>
                                                                        <td>{value.revised_user?.name}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <b>Reviews</b>
                                                    </div>
                                                    <div className="uk-flex gap-6">
                                                            {value?.reviews?.map((val, i) => {
                                                                const date = new Date(val.created_at);
                                                                const fdate = date.toLocaleString("en-IN");
                                                                return (
                                                                    <div class="uk-card uk-card-default uk-card-body uk-width-1-4@m">
                                                                        <p className="uk-text-small uk-remove-padding">Date {fdate}</p>
                                                                        <div>Comment: {val.review_comment}</div>
                                                                        <p className="uk-text-small">Status: <FormatText text={val.review_status} /></p>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        "Data Not Found"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="review-modal" uk-modal="true" container="#pageId">
                    <div className="uk-modal-dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"></button>
                        <div className="uk-modal-header">
                            <h4>Add Review</h4>
                        </div>
                        <form onSubmit={handleAddReview}>
                            <input type="hidden" name="revision_id" value={formData.revision_id} />
                            <div className="uk-modal-body">
                                <h2 className="uk-modal-title">{data?.data[0]?.entity_data?.name}</h2>
                                <select
                                    className="uk-select"
                                    name="review_status"
                                    onChange={handleChange}
                                    value={formData.review_status}
                                >
                                    <option>Select Approval Option</option>
                                    <option value="changes_required">Changes Required</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>

                                <textarea
                                    className="uk-textarea uk-margin-top"
                                    name="review_comment"
                                    placeholder="Add Comments"
                                    onChange={handleChange}
                                    value={formData.review_comment}
                                ></textarea>
                            </div>
                            <div className="uk-modal-footer">
                                <div className="uk-text-right">
                                    <button className="uk-button uk-button-primary uk-button-large">Submit</button>
                                    <button className="uk-modal-close uk-button uk-button-default uk-button-large" type="button">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="approve" uk-modal="true">
                    <div className="uk-modal-dialog uk-modal-body">
                        <h2 className="uk-modal-title"></h2>
                        <button className="uk-modal-close" type="button"></button>
                    </div>
                </div>

                <div id="reject" uk-modal="true">
                    <div className="uk-modal-dialog uk-modal-body">
                        <h2 className="uk-modal-title"></h2>
                        <button className="uk-modal-close" type="button"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
