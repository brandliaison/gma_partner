import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import FormattedDate from "../../components/FormattedDate";
import FormatText from "../../components/FormatText";
import { Link } from "react-router-dom";
import UIkit from "uikit";

export default function ServicePartners() {
    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await apiClient.get("/service-partners");
            setData(response.data.data);
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
        getData();
    }, []);
    console.log(data);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right"></div>

                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-padding-small">
                            <h3 className="uk-card-title">Service Partners123</h3>

                            <div>

                            </div>
                        </div>

                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Date Of Registration</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((val, i) => (
                                            <tr key={i}>
                                                <td>{val?.reg_type}</td>
                                                <td>{val?.name}</td>
                                                <td>{val?.email}</td>
                                                <td>{val?.mobile}</td>
                                                <td>
                                                    <FormattedDate
                                                        getDate={
                                                            val?.created_at
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <FormatText
                                                        text={val?.status}
                                                    />
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/op-admin/service-partner-details/${val._id}`}
                                                        className="sc-button sc-button-primary sc-js-button-wave-light"
                                                    >
                                                        <i className="mdi mdi-eye"></i>{" "}
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
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
