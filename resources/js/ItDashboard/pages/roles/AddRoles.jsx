import React from 'react';
import apiClient from '../../itdashboardservices/api';
import UIkit from 'uikit';

export default function AddRoles() {

    const [formData, setFormData] = React.useState({
        name: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.post('roles', formData)
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
                                <h5 className="uk-heading-line"><span>Add Role</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                        <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Role Name" data-sc-input />
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
