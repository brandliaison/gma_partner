import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import UIkit from 'uikit';

export default function AddServices() {

    const [tutorialcategrydata, settutorialcategrydata] = useState([]);
    const [formData, setformData] = useState({
        name: '',
        service_category_id: '',
        image_url: null,
        image_alt: '',
        description: '',
        compliance_header: '',
    });

    useEffect(() => {
        gettutorialcategories();
    }, [])

    const gettutorialcategories = () => {
        apiClient.get(`/active-service-categories/`)
        .then((res) => {
            settutorialcategrydata(res.data)
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
        console.log(e.target.files[0])
        setformData({
            ...formData,
            image_url: e.target.files[0], // Store the first selected file
        });
    }

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

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call (Optional)
        apiClient.post(`/services`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log("Success:", response.data);
            UIkit.notification({
                message: "Data created successfully!",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });
            setformData({
                name: '',
                service_category_id: '',
                image_url: null,
                image_alt: '',
                description: '',
                compliance_header: '',
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


  return (
    <>

        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Service</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Service Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="file" name="image_url" onChange={handleFileChange} data-sc-input />
                                            </div>
                                            <div>
                                            <select className="uk-select uk-margin-bottom" name='service_category_id' onChange={handleChange} value={formData.service_category_id} style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0px'}}>
                                                    <option value="">Select a category</option>
                                                    {Array.isArray(tutorialcategrydata?.data) && tutorialcategrydata?.data.length > 0 ? (
                                                        tutorialcategrydata?.data.map((value, index) => (
                                                            <option key={index} value={value._id}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No categories available</option>
                                                    )}
                                                </select>
                                                <input className="uk-input uk-margin-bottom" type="text" name='image_alt' onChange={handleChange} value={formData.image_alt} placeholder="Service Image Alt" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <input className="uk-input uk-margin-bottom" type="text" name='compliance_header' onChange={handleChange} value={formData.compliance_header} placeholder="Compliance Header" data-sc-input />
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
