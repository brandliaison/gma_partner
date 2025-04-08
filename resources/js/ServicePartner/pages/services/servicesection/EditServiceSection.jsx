import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UIkit from 'uikit';
import apiClient from '../../../services/api';

export default function EditServiceSection() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [tutorialcategrydata, settutorialcategrydata] = useState([]);
    const [formData, setformData] = useState({
        name: '',
        service_id: '',
        slug: '',
        content: '',
    });

    const edittutorial = () => {
        apiClient.get(`/services-sections/${id}`)
        .then((res) => {
            setformData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        gettutorialcategories();
        edittutorial()
    }, [])

    const gettutorialcategories = () => {
        apiClient.get(`/services/`)
        .then((res) => {
            settutorialcategrydata(res.data.data)
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
    // const handleFileChange = (e) => {
    //     console.log(e.target.files[0])
    //     setformData({
    //         ...formData,
    //         image_url: e.target.files[0], // Store the first selected file
    //     });
    // }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("service_category_id", formData.service_category_id);
        data.append("image_url", formData.image_url);
        data.append("image_alt", formData.image_alt);
        data.append("description", formData.description);
        data.append("compliance_header", formData.compliance_header);
        data.append("_method", 'PUT');

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call (Optional)
        apiClient.post(`/services-sections/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log("Success:", response.data);
            navigate('/service-partner/service-section')
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

    console.log(formData)

  return (
    <>

        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Edit Service</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Service Name" data-sc-input />
                                            </div>
                                            <div>
                                            <select className="uk-select uk-margin-bottom" name='service_id' onChange={handleChange} value={formData.service_id} style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0px'}}>
                                                    <option value="">Select a category</option>
                                                    {Array.isArray(tutorialcategrydata) && tutorialcategrydata.length > 0 ? (
                                                        tutorialcategrydata.map((value, index) => (
                                                            <option key={index} value={value._id}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No categories available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <input className="uk-input uk-margin-bottom" type="text" name='slug' onChange={handleChange} value={formData.slug} placeholder="Compliance Header" data-sc-input />
                                                <textarea className="uk-textarea" rows="5" name='content' onChange={handleChange} value={formData.content} placeholder="Discription" data-sc-input></textarea>
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
