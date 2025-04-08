import React, { useEffect, useState } from "react";
import apiClient from "../../../services/api";
import UIkit from "uikit";

export default function AddNotificationCategories() {
    const [formData, setformData] = useState({
        name: "",
        description: "",
        title: "",
        slug: "",
        parent_category: "",
    });

    // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("title", formData.title);
        data.append("slug", formData.slug);
        data.append("parent_category", formData.parent_category);

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call (Optional)
        apiClient
            .post(`/notification-categories`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("Success:", response.data);
                UIkit.notification({
                    message: "Category created successfully!",
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                setformData({
                    name: "",
                    description: "",
                    title: "",
                    slug: "",
                });
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

    const [categories, setCategories] = useState();
    const getCategories = () => {
        apiClient
            .get(`/active-notification-categories`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-child-width-1-1@l" data-uk-grid>
                        <div>
                            <div className="uk-card">
                                <div className="uk-card-body">
                                    <h5 className="uk-heading-line">
                                        <span>Add Notification Category</span>
                                    </h5>
                                    <form onSubmit={handleSubmit}>
                                        <fieldset className="uk-fieldset">
                                            <div
                                                className="uk-grid uk-grid-small uk-child-width-1-2@l"
                                                uk-grid="true"
                                            >
                                                <div>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="name"
                                                        onChange={handleChange}
                                                        value={formData.name}
                                                        placeholder="Notification Category Name"
                                                        data-sc-input
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        value={formData.title}
                                                        placeholder="Notification Category Title"
                                                        data-sc-input
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="uk-grid uk-grid-small uk-child-width-1-2@l"
                                                uk-grid="true"
                                            >
                                                <div>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="slug"
                                                        onChange={handleChange}
                                                        value={formData.slug}
                                                        placeholder="Category Slug"
                                                        data-sc-input
                                                    />
                                                </div>
                                                <div>
                                                    <select
                                                        id=""
                                                        name="parent_category"
                                                        className="uk-select"
                                                        onChange={handleChange}
                                                        value={
                                                            formData?.parent_category
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Parent
                                                            Category
                                                        </option>
                                                        {categories?.data
                                                            ?.length > 0
                                                            ? categories?.data?.map(
                                                                  (val, i) => (
                                                                      <option
                                                                          value={
                                                                              val?._id
                                                                          }
                                                                          key={
                                                                              i
                                                                          }
                                                                      >
                                                                          {
                                                                              val.name
                                                                          }
                                                                      </option>
                                                                  )
                                                              )
                                                            : ""}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="uk-margin">
                                                <textarea
                                                    className="uk-textarea"
                                                    rows="5"
                                                    name="description"
                                                    onChange={handleChange}
                                                    value={formData.description}
                                                    placeholder="Discription"
                                                    data-sc-input
                                                ></textarea>
                                            </div>
                                            <div className="uk-margin">
                                                <input
                                                    type="submit"
                                                    className="sc-button waves-effect waves-button solid-button"
                                                    value="Submit"
                                                ></input>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
