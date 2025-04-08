import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../itdashboardservices/api';
import UIkit from 'uikit';

export default function EditDesignation() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [formdata, setFormData] = React.useState({
        name: '',
        _method: 'PUT'
    });

    const handleChange = (e) => {
        setFormData({...formdata, [e.target.name]: e.target.value });
    }

    useEffect (() => {
        getsingledata();
    },[])

    const getsingledata = () => {
        apiClient.get(`designation/${id}`)
        .then((res) => {
            setFormData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create FormData object
        const data = new FormData();
        data.append("name", formdata.name);
        data.append("_method", 'PUT');

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call
        apiClient.post(`designation/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        .then((response) => {
            UIkit.notification({
                message: 'Designation added successfully',
                pos: 'top-center',
                status: 'success',
                timeout: 2000,
            });
            navigate('/it-admin/designation')
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
                                <h5 className="uk-heading-line"><span>Eidt Designation</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                        <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formdata.name} placeholder="Designation Name" data-sc-input />
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
