import React, { useState } from "react";
import apiClient from "../../services/api";
import UIkit from "uikit";

export default function Academic({ user, onSubmit }) {
    const [courses, setCourses] = useState([
        {
            id: Date.now(),
            course: "",
            course_name: "",
            subject: "",
            passing_year: "",
            remarks: "",
        },
    ]);

    const [userData, setUserData] = useState(user);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [timeframe, setTimeframe] = useState("");

    // Add new course field
    const addCourse = () => {
        setCourses([
            ...courses,
            {
                id: Date.now(),
                course: "",
                course_name: "",
                subject: "",
                passing_year: "",
                remarks: "",
            },
        ]);
    };
    // Remove course field
    const removeCourse = (id) => {
        setCourses(courses.filter((course) => course.id !== id));
    };

    const handleChangeAc = (id, event) => {
        const { name, value } = event.target;
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === id ? { ...course, [name]: value } : course
            )
        );
    };

    const handleSubmitAc = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append(
            "user_id",
            `${localStorage.getItem("service_partner_reg")}`
        );
        data.append("academic_details", JSON.stringify(courses));
        data.append("experience_months", selectedMonth);
        data.append("experience_years", selectedYear);
        data.append("su_type", "academic");

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
                onSubmit(response?.data?.data)
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
    return (
        <div>
            <h2>Academic Details</h2>
            <form className="uk-form-stacked" onSubmit={handleSubmitAc}>
                <div className="uk-form-controls">
                    {userData?.country == "India" ? (
                        <>
                            {courses.map((course, index) => (
                                <>
                                    <div
                                        key={course.id}
                                        className="uk-flex uk-flex-wrap gap-2 "
                                    >
                                        {user?.user?.country == "India" ? (
                                            <div className="uk-width-1-4">
                                                <label>
                                                    Select Course{" "}
                                                    <span className="uk-text-danger">
                                                        *
                                                    </span>
                                                    <select
                                                        name="course"
                                                        className="uk-select"
                                                        value={course.course}
                                                        onChange={(e) =>
                                                            handleChangeAc(
                                                                course.id,
                                                                e
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Course
                                                        </option>
                                                        <option value="12">
                                                            12th
                                                        </option>
                                                        <option value="ug">
                                                            UG Graduation
                                                        </option>
                                                        <option value="pg">
                                                            PG Graduation
                                                        </option>
                                                        <option value="diploma">
                                                            Diploma
                                                        </option>
                                                        <option value="certification">
                                                            Certification
                                                        </option>
                                                        <option value="training">
                                                            Training
                                                        </option>
                                                    </select>
                                                </label>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="uk-width-1-4">
                                            <label>
                                                Course Name{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Course Name"
                                                    name="course_name"
                                                    value={course.course_name}
                                                    onChange={(e) =>
                                                        handleChangeAc(
                                                            course.id,
                                                            e
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="uk-width-1-4">
                                            <label>
                                                Subject{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Subject"
                                                    name="subject"
                                                    value={course.subject}
                                                    onChange={(e) =>
                                                        handleChangeAc(
                                                            course.id,
                                                            e
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="uk-width-1-4">
                                            <label>
                                                Passing Year{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    type="text"
                                                    className="uk-input"
                                                    placeholder="Passing Year"
                                                    name="passing_year"
                                                    value={course.passing_year}
                                                    onChange={(e) =>
                                                        handleChangeAc(
                                                            course.id,
                                                            e
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="">
                                            <label>
                                                Remarks{" "}
                                                <span className="uk-text-danger">
                                                    *
                                                </span>
                                                <input
                                                    className="uk-textarea"
                                                    rows="2"
                                                    placeholder="Remarks"
                                                    name="remarks"
                                                    value={course.remarks}
                                                    onChange={(e) =>
                                                        handleChangeAc(
                                                            course.id,
                                                            e
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                        {index > 0 && (
                                            <button
                                                className="uk-button uk-button-danger uk-margin-top"
                                                onClick={() =>
                                                    removeCourse(course.id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <hr />
                                </>
                            ))}

                            <button
                                className="uk-button uk-button-default uk-button-small"
                                onClick={addCourse}
                            >
                                Add More
                            </button>

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
