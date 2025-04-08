import React, { useState } from "react";
import apiClient from "../../services/api";
import UIkit from "uikit";

export default function Branches({ user, onSubmit }) {

    const [userData, setUserData] = useState(user);
    const [formData, setFormData] = useState(
        {
            team_size: "",
            branch_address: userData?.office_address,
            branch_district: userData?.office_district,
            branch_state: userData?.office_state,
            branch_pincode: userData?.office_pincode,
        },
    );
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [timeframe, setTimeframe] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitAc = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append(
            "user_id",
            `${localStorage.getItem("service_partner_reg")}`
        );
        data.append("team_size", formData.team_size);
        data.append("branch_address", formData.branch_address);
        data.append("branch_district", formData.branch_district);
        data.append("branch_state", formData.branch_state);
        data.append("branch_pincode", formData.branch_pincode);
        data.append("experience_months", selectedMonth);
        data.append("experience_years", selectedYear);
        data.append("su_type", "branch");

        // API Call (Optional)
        apiClient
            .post(`/service-partner-details-save`, data)
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                onSubmit(response?.data?.data);
            })
            .catch((error) => {
                console.error("Error:", error);
                UIkit.notification({
                    message: error?.response?.data?.message,
                    status: "danger",
                    timeout: 2000,
                    pos: "top-center",
                });
            });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

    const months = [
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const handleSelection = (month, year) => {
        if (!month || !year) return;

        const selectedDate = new Date(`${year}-${month}-01`);
        const currentDate = new Date();

        let diffYears = currentDate.getFullYear() - selectedDate.getFullYear();
        let diffMonths = currentDate.getMonth() - selectedDate.getMonth();

        // Adjust months if negative
        if (diffMonths < 0) {
            diffYears -= 1;
            diffMonths += 12;
        }

        setTimeframe(`${diffYears} years and ${diffMonths} months`);
    };

    console.log(formData);

    return (
        <div>
            <h2>Company Details</h2>
            <form className="uk-form-stacked" onSubmit={handleSubmitAc}>
                <div className="uk-form-controls">
                    {userData?.country == "India" ? (
                        <>
                            <div className="uk-margin-top uk-flex uk-flex-wrap gap-2 uk-flex-middle">
                                <label htmlFor="" className="uk-width-1-2">
                                    Team Strength
                                </label>
                                <div className="uk-width-1-2">
                                    <select
                                        className="uk-select"
                                        name="team_size"
                                        value={formData.team_size}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Team Size
                                        </option>
                                        <option value="0-10">0-10</option>
                                        <option value="11-25">11-25</option>
                                        <option value="26-50">26-50</option>
                                        <option value="51-100">51-100</option>
                                        <option value="101-500">101-500</option>
                                        <option value="Above 500">
                                            Above 500
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="uk-margin-top ">
                                <label htmlFor="" className="uk-width-1-2">
                                    <b>Add Branche</b>
                                </label>
                                <div className="uk-flex uk-flex-wrap gap-6 uk-margin-small-top">
                                    <div className="uk-width-1-2">
                                        <label>
                                            Office Address{" "}
                                            <span className="uk-text-danger">
                                                *
                                            </span>
                                            <input
                                                type="text"
                                                className="uk-input"
                                                placeholder="Enter Office Address"
                                                name="branch_address"
                                                onChange={handleChange}
                                                value={formData.branch_address}
                                            />
                                        </label>
                                    </div>

                                    <div className="uk-width-1-2">
                                        <label>
                                            Office District / County
                                            <span className="uk-text-danger">
                                                *
                                            </span>
                                            <input
                                                type="text"
                                                className="uk-input"
                                                placeholder="Enter Office District / County"
                                                name="branch_district"
                                                onChange={handleChange}
                                                value={
                                                    formData.branch_district
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="uk-flex uk-flex-wrap gap-6 uk-margin-small-top">
                                    <div className="uk-width-1-2">
                                        <label>
                                            Office State / Province{" "}
                                            <span className="uk-text-danger">
                                                *
                                            </span>
                                            <input
                                                type="text"
                                                className="uk-input"
                                                placeholder="Enter Office State / Province"
                                                name="branch_state"
                                                onChange={handleChange}
                                                value={
                                                    formData.branch_state
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="uk-width-1-2">
                                        <label>
                                            Office Pincode / Zipcode{" "}
                                            <span className="uk-text-danger">
                                                *
                                            </span>
                                            <input
                                                type="text"
                                                className="uk-input"
                                                placeholder="Office Pincode / Zipcode"
                                                name="branch_pincode"
                                                onChange={handleChange}
                                                value={
                                                    formData.branch_pincode
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>
                                <span className="uk-text-small uk-text-danger">
                                    For Branch In Other Country, Please Select
                                    New Form
                                </span>
                            </div>

                            <div className="uk-margin-top uk-flex uk-flex-wrap gap-2 uk-flex-middle">
                                <label htmlFor="" className="uk-width-1-2">
                                    Year of experience (Working Since)
                                </label>
                                <div className="uk-width-1-5">
                                    <select
                                        className="uk-select"
                                        name="experience_months"
                                        value={selectedMonth}
                                        onChange={(e) => {
                                            setSelectedMonth(e.target.value);
                                            handleSelection(
                                                e.target.value,
                                                selectedYear
                                            );
                                        }}
                                    >
                                        <option value="">Select Month</option>
                                        {months.map((month) => (
                                            <option
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="uk-width-1-5">
                                    <select
                                        className="uk-select"
                                        value={selectedYear}
                                        onChange={(e) => {
                                            setSelectedYear(e.target.value);
                                            handleSelection(
                                                selectedMonth,
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {timeframe && (
                                <p className="uk-alert uk-alert-primary">
                                    <strong>{timeframe}</strong>.
                                </p>
                            )}
                        </>
                    ) : (
                        ""
                    )}

                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
