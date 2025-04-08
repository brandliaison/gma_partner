import React, { useEffect, useState } from 'react';
import UIkit from 'uikit';
import apiClient from '../../itdashboardservices/api';

export default function AddStaffManagement() {

    const [allroles, setallroles] = useState();
    const [formData, setFormData] = React.useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        profile_image: null,
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    useEffect(()  => {
        getrolls();
    },[])

    const getrolls = () => {
        apiClient.get('roles')
       .then((response) => {
        setallroles(response.data.data)
       })
       .catch((error) => {
            console.log(error);
       });
    }

    const handleFileChange = (e) => {
        formData({
            ...formData,
            profile_image: e.target.files[0], // Store the first selected file
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("role", formData.role);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("profile_image", formData.profile_image);

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call
        apiClient.post(`it-staff`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        .then((response) => {
            UIkit.notification({
                message: 'Designation added successfully',
                pos: 'top-center',
                status: 'success',
                timeout: 2000,
            });
            setFormData({name: ''});
        })
        .catch((error) => {
            UIkit.notification({
                message: error.response.data.message,
                pos: 'top-center',
                status: 'danger',
                timeout: 2000,
            });
        });
    }

  return (
    <>
    
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Staff</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                        <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Staff Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name="email" onChange={handleChange} value={formData.email} placeholder="Staff Email" data-sc-input />
                                            </div>
                                            <div>
                                                <select className="uk-select uk-margin-bottom" name='role' onChange={handleChange} value={formData.role} style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0px'}}>
                                                    <option value="">Select a category</option>
                                                    {Array.isArray(allroles) && allroles.length > 0 ? (
                                                        allroles.map((value, index) => (
                                                            <option key={index} value={value.role}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No categories available</option>
                                                    )}
                                                </select>
                                                <input className="uk-input uk-margin-bottom" type="number" name="phone" onChange={handleChange} value={formData.phone} placeholder="Staff Phone No." data-sc-input />
                                            </div>
                                        </div>
                                        <input className="uk-input uk-margin-bottom" type="file" name="profile_image" onChange={handleFileChange} value={formData.profile_image} data-sc-input />
                                        <input type='submit' className='sc-button waves-effect waves-button solid-button' value='Submit'></input>
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
