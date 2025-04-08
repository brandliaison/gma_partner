import React, { useEffect, useState } from 'react'
import apiClient from '../../services/api';
import UIkit from 'uikit';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBlogs() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [blogcategrydata, setblogcategrydata] = useState([]);
    const [formData, setformData] = useState({
        name: '',
        category: '',
        blogimage: null,
        technical_name: '',
        image_alt: '',
        content: '',
        description: ''
    });

    useEffect(() => {
        editblog()
        getblogcategories()
    }, [id])

    const editblog = () => {
        apiClient.get(`/blogs/${id}`)
        .then((res) => {
            setformData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getblogcategories = () => {
        apiClient.get(`/active-blog-categories/`)
        .then((res) => {
            console.log(res.data)
            setblogcategrydata(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

        // Handle text input changes
        const handleChange = (e) => {
            setformData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        // Handle file input change
        const handleFileChange = (e) => {
            setformData({
                ...formData,
                blogimage: e.target.files[0], // Store the first selected file
            });
        }

        // Handle form submission
        const handleSubmit = (e) => {
            e.preventDefault();

            // Create FormData object
            const data = new FormData();
            data.append("name", formData.name);
            data.append("blog_category_id", formData.category?._id);
            data.append("image_url", formData.blogimage);
            data.append("image_alt", formData.image_alt);
            data.append("description", formData.description);
            data.append("content", formData.content);
            data.append("technical_name", formData.technical_name);
            data.append("_method", 'PUT');

            // Log to console (for debugging)
            console.log("Form Data:", Object.fromEntries(data));

            // API Call (Optional)
            apiClient.post(`/blogs/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                console.log("Success:", response.data);
                navigate(`/service-partner/blogs/`)
                UIkit.notification({
                    message: "Blog created successfully!",
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
            })
            .catch(error => {
                console.error("Error:", error);
                UIkit.notification({
                    message: error?.response?.data?.message,
                    status: "danger",
                    timeout: 2000,
                    pos: "top-center",
                });
            });
        };

        console.log(formData, 'data of a blog')

  return (
    <>
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Edit Blog</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                    <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Blog Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="file" name='blogimage' onChange={handleFileChange} placeholder="Blog Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name='technical_name' onChange={handleChange} value={formData?.technical_name} placeholder="Technical Name" data-sc-input />
                                            </div>
                                            <div>
                                                <select className="uk-select uk-margin-bottom" name='category' onChange={handleChange} value={formData?.category?._id} style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0px'}}>
                                                    <option value="">Select a category</option>
                                                    {Array.isArray(blogcategrydata) && blogcategrydata.length > 0 ? (
                                                        blogcategrydata.map((value, index) => (
                                                            <option key={index} value={value._id}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No categories available</option>
                                                    )}
                                                </select>
                                                <input className="uk-input uk-margin-bottom" type="text" name='image_alt' onChange={handleChange} value={formData.image_alt} placeholder="Image Alt" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name='content' onChange={handleChange} value={formData.content} placeholder="Content" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
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
