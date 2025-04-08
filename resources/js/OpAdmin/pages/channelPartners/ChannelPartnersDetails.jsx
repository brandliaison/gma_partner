import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import FormattedDate from "../../components/FormattedDate";
import FormatText from "../../components/FormatText";
import { Link, useParams } from "react-router-dom";
import UIkit from "uikit";

export default function ChannelPartnersDetails() {
    const { id } = useParams();

    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await apiClient.get(
                `/channel-partner-details/${id}`
            );
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

    const handleApproval = async () => {
        try {
            const response = await apiClient.get(
                `/channel-partner-details/${id}/approve`
            );
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

    const handleReject = async () => {
        try {
            const response = await apiClient.get(
                `/channel-partner-details/${id}/reject`
            );
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

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right"></div>

                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-padding-small">
                            <h3 className="uk-card-title">
                                Channel Partner Details
                            </h3>
                            <div>
                                {data?.status == "pending" ? (
                                    <div class="uk-alert-warning uk-padding-small uk-padding-remove-vertical">
                                        Pending
                                    </div>
                                ) : (
                                    ""
                                )}

                                {data?.status == "Sent For Approval" ? (
                                    <div class="uk-alert-warning uk-padding-small uk-padding-remove-vertical">
                                        Sent For Approval
                                    </div>
                                ) : (
                                    ""
                                )}

                                {data?.status == "Approved" ? (
                                    <div class="uk-alert-success uk-padding-small uk-padding-remove-vertical">
                                        Approved
                                    </div>
                                ) : (
                                    ""
                                )}

                                {data?.status == "Rejected" ? (
                                    <div class="uk-alert-danger uk-padding-small uk-padding-remove-vertical">
                                        Rejected
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="uk-card-body">
                            <div>
                                <div className="uk-flex gap-6">
                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Basic Details</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Person Name
                                                    </td>
                                                    <td>{data?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Email
                                                    </td>
                                                    <td>{data?.email}</td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Mobile
                                                    </td>
                                                    <td>{data?.mobile}</td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Alternative Mobile
                                                    </td>
                                                    <td>{data?.alt_mobile}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Location Details</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        District
                                                    </td>
                                                    <td>{data?.district}</td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        State
                                                    </td>
                                                    <td>{data?.state}</td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Country
                                                    </td>
                                                    <td>{data?.country}</td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Pincode
                                                    </td>
                                                    <td>{data?.pincode}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Verification Details</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Aadhar Number
                                                    </td>
                                                    <td>
                                                        {data?.aadhar_number}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Aadhar Verified
                                                    </td>
                                                    <td>
                                                        {data?.aadhar_verified}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Aadhar Details
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="sc-button sc-button-small sc-button-primary sc-js-button-wave-light"
                                                            uk-toggle="target: #my-id"
                                                            type="button"
                                                        >
                                                            <i className="mdi mdi-eye"></i>{" "}
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Date Of Birth
                                                    </td>
                                                    <td>{data?.dob}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="uk-flex gap-6 uk-margin-top">
                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Office Address</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Address
                                                    </td>
                                                    <td>
                                                        {data?.office_address}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        District
                                                    </td>
                                                    <td>
                                                        {data?.office_district}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Pincode
                                                    </td>
                                                    <td>
                                                        {data?.office_pincode}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        State
                                                    </td>
                                                    <td>
                                                        {data?.office_state}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Academic Details</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <b>Course Name</b>
                                                    </td>
                                                    <td>
                                                        <b>Subject</b>
                                                    </td>
                                                    <td>
                                                        <b>Passing Year</b>
                                                    </td>
                                                    <td>
                                                        <b>Remarks</b>
                                                    </td>
                                                </tr>
                                                {data?.academic_details?.map(
                                                    (val, i) => (
                                                        <tr key={i}>
                                                            <td className="uk-width-1-2">
                                                                {
                                                                    val?.course_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {val?.subject}
                                                            </td>
                                                            <td>
                                                                {
                                                                    val?.passing_year
                                                                }
                                                            </td>
                                                            <td>
                                                                {val?.remarks}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Skills</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <b>Service</b>
                                                    </td>
                                                    <td>
                                                        <b>Remarks</b>
                                                    </td>
                                                </tr>
                                                {data?.skills?.map((val, i) => (
                                                    <tr>
                                                        <td className="uk-width-1-2">
                                                            {
                                                                val
                                                                    ?.service_details
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td>{val?.remarks}</td>
                                                    </tr>
                                                ))}

                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="uk-flex gap-6 uk-margin-top">
                                    <div className="uk-width-1-3">
                                        <p>
                                            <b>Business Details</b>
                                        </p>
                                        <table class="uk-table uk-table-striped">
                                            <tbody>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Business Title
                                                    </td>
                                                    <td>
                                                        {data?.business_title}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="uk-width-1-2">
                                                        Business Description
                                                    </td>
                                                    <td>
                                                        {
                                                            data?.business_description
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {data?.status !== "Approved" &&
                                data?.status !== "Rejected" ? (
                                    <div className="uk-margin-top">
                                        <button
                                            class="uk-button uk-button-primary"
                                            onClick={handleApproval}
                                        >
                                            {data?.status == "Sent For Approval"
                                                ? "Approve"
                                                : "Send For Approval"}
                                        </button>

                                        <button
                                            class="uk-button uk-button-danger"
                                            onClick={handleReject}
                                        >
                                            Reject Application
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {data?.reg_type == "Company" ? (
                <div id="my-id" uk-modal="true">
                    <div class="uk-modal-dialog uk-modal-body">
                        <h2 class="uk-modal-title">GST Details</h2>

                        <div className="uk-flex gap-6">
                            <table class="uk-table uk-table-striped">
                                <tbody>
                                    <tr>
                                        <td className="uk-width-1-2">GSTIN</td>
                                        <td>{data?.gst_details?.gstin}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Business Name
                                        </td>
                                        <td>
                                            {data?.gst_details?.business_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Legal Name
                                        </td>
                                        <td>{data?.gst_details?.legal_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Pan Number
                                        </td>
                                        <td>{data?.gst_details?.pan_number}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Address
                                        </td>
                                        <td>{data?.gst_details?.address}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Aadhaar Validation
                                        </td>
                                        <td>
                                            {
                                                data?.gst_details
                                                    ?.aadhaar_validation
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Constitution Of Business
                                        </td>
                                        <td>
                                            {
                                                data?.gst_details
                                                    ?.constitution_of_business
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Taxpayer Type
                                        </td>
                                        <td>
                                            {data?.gst_details?.taxpayer_type}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            GSTIN Status
                                        </td>
                                        <td>
                                            {data?.gst_details?.gstin_status}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button class="uk-modal-close" type="button"></button>
                    </div>
                </div>
            ) : (
                <div id="my-id" uk-modal="true">
                    <div class="uk-modal-dialog uk-modal-body">
                        <h2 class="uk-modal-title">Aadhar Details</h2>

                        <div className="uk-flex gap-6">
                            <div className="uk-width-1-4">
                                <img
                                    src={`data:image/png;base64,${data?.aadhar_details?.profile_image}`}
                                    alt=""
                                />
                            </div>
                            <table class="uk-table uk-table-striped">
                                <tbody>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Aadhar Number
                                        </td>
                                        <td>{data?.aadhar_number}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Full Name
                                        </td>
                                        <td>
                                            {data?.aadhar_details?.full_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Date Of Birth
                                        </td>
                                        <td>{data?.aadhar_details?.dob}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">Gender</td>
                                        <td>{data?.aadhar_details?.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Address
                                        </td>
                                        <td>
                                            {
                                                data?.aadhar_details?.address
                                                    ?.house
                                            }
                                            ,{" "}
                                            {
                                                data?.aadhar_details?.address
                                                    ?.street
                                            }
                                            ,{" "}
                                            {data?.aadhar_details?.address?.vtc}
                                            ,{" "}
                                            {
                                                data?.aadhar_details?.address
                                                    ?.dist
                                            }
                                            ,{" "}
                                            {
                                                data?.aadhar_details?.address
                                                    ?.state
                                            }
                                            ,{" "}
                                            {
                                                data?.aadhar_details?.address
                                                    ?.dist
                                            }
                                            ,{" "}
                                            {
                                                data?.aadhar_details?.address
                                                    ?.country
                                            }
                                            , {data?.aadhar_details?.zip}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="uk-width-1-2">
                                            Care of
                                        </td>
                                        <td>{data?.aadhar_details?.care_of}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button class="uk-modal-close" type="button"></button>
                    </div>
                </div>
            )}
        </>
    );
}
