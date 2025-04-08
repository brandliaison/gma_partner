import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../itdashboardservices/api';
import UIkit from "uikit";

export default function EditRoles() {

    const { id } = useParams();
    const navigate = useNavigate();
  
    const [permissions, setPermissions] = useState([]); // All permissions
    const [selectedPermissions, setSelectedPermissions] = useState([]); // Stores objects {id, name}
    const [formData, setFormData] = useState({
        name: '',
    });
  
    useEffect(() => {
      fetchRoleAndPermissions();
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }
  
    // Fetch Role & Permissions Data Together
    const fetchRoleAndPermissions = async () => {
      try {
        const [roleRes, permissionsRes] = await Promise.all([
          apiClient.get(`/roles/${id}`),   // Get assigned permissions
          apiClient.get("permissions"),    // Get all permissions
        ]);
  
        setFormData(roleRes.data.data)
        const assignedPerms = new Set(roleRes.data.data.permissions.map((perm) => perm._id));
        const allPermissions = permissionsRes.data.data;
  
        // Sort assigned permissions to the top
        const sortedPermissions = [...allPermissions].sort((a, b) => {
          return assignedPerms.has(b._id) - assignedPerms.has(a._id);
        });
  
        setPermissions(sortedPermissions);
  
        // Store selected permissions with both id & name
        const selectedPerms = sortedPermissions
          .filter((perm) => assignedPerms.has(perm._id))
          .map((perm) => ({ id: perm._id, name: perm.name }));
  
        setSelectedPermissions(selectedPerms);
  
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    // Toggle Permission Selection
    const handlePermissionClick = (perm) => {
      setSelectedPermissions((prev) => {
        const exists = prev.find((p) => p.id === perm._id);
        if (exists) {
          return prev.filter((p) => p.id !== perm._id); // Remove if already selected
        } else {
          return [...prev, { id: perm._id, name: perm.name }]; // Add new selection
        }
      });
    };
  
    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        var perNames = [];
        selectedPermissions.forEach((perm) => (
            perNames.push(perm.name)
        ));

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("permissions", JSON.stringify(perNames));
        data.append("_method", 'PUT');

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // Roles API Call
        apiClient.post(`roles/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            UIkit.notification({
                message: res.data.message,
                pos: 'top-center',
                status: 'success',
                timeout: 2000,
            });
            navigate('/it-admin/roles')
        })
        .catch((err) => {
            UIkit.notification({
                message: err.response.data.message,
                pos: 'top-center',
                status: 'danger',
                timeout: 2000,
            });
        })
    };

    console.log(selectedPermissions)
  

  return (
    <>
    
    <div id="sc-page-wrapper">
        <div id="sc-page-content">
            <div className="uk-child-width-1-1@l" data-uk-grid>
                <div>
                    <div className="uk-card">
                            <div className="uk-card-body">
                            <h5 className="uk-heading-line"><span>Edit Role</span></h5>
                            <form>
                                <fieldset className="uk-fieldset">
                                    <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Role Name" data-sc-input />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div class="uk-card uk-margin-top">
                        <h3 class="uk-card-title">	Alignment modifier	</h3>
                            <div class="uk-card-body">
                                <div class="uk-overflow-auto">
                                    <table class="uk-table uk-table-middle uk-table-divider">
                                        <thead>
                                            <tr>
                                                <th class="uk-width-small">	Permission Name	</th>
                                                <th className='uk-text-right'>Add Permission</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permissions.map((perm, i) => {
                                            const isSelected = selectedPermissions.some((p) => p.id === perm._id);

                                            return (
                                                <tr key={perm._id}>
                                                <td>{perm.name}</td>
                                                <td className="uk-text-right">
                                                    <button
                                                    type="button"
                                                    className={`sc-button ${isSelected ? "sc-button-secondary" : "sc-button-outline sc-button-outline-danger"}`}
                                                    style={{
                                                        display: "inline-flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                    onClick={() => handlePermissionClick(perm)}
                                                    >
                                                    <i className={`mdi ${isSelected ? "mdi-check-circle" : "mdi-plus-circle"}`}></i>
                                                    </button>
                                                </td>
                                                </tr>
                                            );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <button className='sc-button waves-effect waves-button solid-button' style={{color: 'White'}} value='Submit' onClick={handleSubmit}>Submit</button>
                            </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    
    </>
  )
}
