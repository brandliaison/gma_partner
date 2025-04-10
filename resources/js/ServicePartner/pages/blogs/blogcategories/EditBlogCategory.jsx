import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../../services/api';
import UIkit from 'uikit';

export default function EditBlogCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setformData] = useState({
        name: '',
        description: '',
        title: '',
        slug: '',
        parent_category: '',
    });

        // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        editblogcategory()
    }, [])

    const editblogcategory = () => {
        apiClient.get(`/blog-categories/${id}`)
        .then((res) => {
            setformData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("title", formData.title);
        data.append("slug", formData.slug);
        data.append("parent_category", formData.parent_category);
        data.append("_method", 'PUT');

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call
        apiClient.post(`/blog-categories/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log("Success:", response.data);

            // Show success notification
            UIkit.notification({
                message: "Blog Category created successfully!",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });

            // navigate to blog categories
            navigate('/service-partner/blog-categories')
        })
        .catch(error => {
            console.error("Error:", error);

            // Show error notification
            UIkit.notification({
                message: error?.response?.data?.message || "An error occurred",
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
        });
    };

  return (
    <>
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Blog Category</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                    <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Blog Category Name" data-sc-input />
                                            </div>
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name='title' onChange={handleChange} value={formData.title} placeholder="Blog Category Title" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <input className="uk-input uk-margin-bottom" type="text" name='slug' onChange={handleChange} value={formData.slug} placeholder="Blog Category Slug" data-sc-input />
                                                <textarea className="uk-textarea" rows="5" name='description' onChange={handleChange} value={formData.description} placeholder="Discription" data-sc-input></textarea>
                                        </div>
                                        <div className="uk-margin">
                                            <input type='submit' className='sc-button waves-effect waves-button solid-button' value='Submit'></input>
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
  )
}
