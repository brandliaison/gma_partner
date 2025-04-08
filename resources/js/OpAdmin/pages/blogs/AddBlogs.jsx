import React, { useEffect, useState } from 'react'
import apiClient from '../../services/api';
import UIkit from 'uikit';

export default function AddBlogs() {

    const [blogcategrydata, setblogcategrydata] = useState([]);
    const [formData, setformData] = useState({
        blogname: '',
        blogcategory: '',
        blogimage: null,
        blogimagealt: '',
        blogtechnicalname: '',
        blogcontent: '',
        blogdiscription: ''
    });

    useEffect(() => {
        getblogcategories();
    }, [])

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
        data.append("name", formData.blogname);
        data.append("blog_category_id", formData.blogcategory);
        data.append("image_url", formData.blogimage);
        data.append("image_alt", formData.blogimagealt);
        data.append("description", formData.blogdiscription);
        data.append("content", formData.blogcontent);
        data.append("technical_name", formData.blogtechnicalname);

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call (Optional)
        apiClient.post(`/blogs`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log("Success:", response.data);
            UIkit.notification({
                message: "Blog created successfully!",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });
            setformData({
                blogname: '',
                blogcategory: '',
                blogimage: null,
                blogimagealt: '',
                blogtechnicalname: '',
                blogcontent: '',
                blogdiscription: ''
            })
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

    console.log(formData)

  return (
    <>
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Blog</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                    <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="blogname" onChange={handleChange} value={formData.blogname} placeholder="Blog Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="file" name='blogimage' onChange={handleFileChange} placeholder="Blog Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name='blogtechnicalname' onChange={handleChange} value={formData.blogtechnicalname} placeholder="Technical Name" data-sc-input />
                                            </div>
                                            <div>
                                                <select className="uk-select uk-margin-bottom" name='blogcategory' onChange={handleChange} value={formData.blogcategory} style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0px'}}>
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
                                                <input className="uk-input uk-margin-bottom" type="text" name='blogimagealt' onChange={handleChange} value={formData.blogimagealt} placeholder="Image Alt" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name='blogcontent' onChange={handleChange} value={formData.blogcontent} placeholder="Content" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <textarea className="uk-textarea" rows="5" name='blogdiscription' onChange={handleChange} value={formData.blogdiscription} placeholder="Discription" data-sc-input></textarea>
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
