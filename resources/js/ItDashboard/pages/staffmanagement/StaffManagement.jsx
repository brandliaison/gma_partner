import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../itdashboardservices/api';
import UIkit from 'uikit';

export default function StaffManagement() {

    const navigate = useNavigate();
    const [data, setdata] = useState([]);

    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        await
        apiClient.get('it-staff')
            .then((response) => {
                setdata(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data', error);
            });
    }

    const deletedata = async (id) => {
        apiClient.delete(`it-staff/${id}`)
           .then((res) => {
                UIkit.notification({
                    message: res.data.message || "Deleted successfully",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                getdata();
            })
           .catch((error) => {
                UIkit.notification({
                    message: "Failed to delete",
                    status: "danger",
                    timeout: 1000,
                    pos: "top-center",
                });
            });
    }

    const handleView = (id) => {
        navigate(`/it-admin/edit-staffmanagement/${id}`); // Redirect to second page with blog ID in URL
    };

  return (
    <>
    
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-between uk-flex-middle">
                        <h3>Staff Management</h3>
                        <Link to="/it-admin/add-staffmanagement">
                            <button className="sc-fab sc-fab-text sc-fab-success solid-button">
                                <i className="mdi mdi-plus"></i>Create
                            </button>
                        </Link>
                    </div>

                    <form
                        className="uk-search uk-search-default uk-width-1-1 uk-background-default uk-border-rounded uk-flex uk-flex-middle uk-margin-top"
                        style={{ padding: "10px 15px" }}
                    >
                        <span
                            style={{
                                color: "gray",
                                fontSize: "24px",
                                padding: "5px",
                            }}
                        >
                            <i className="mdi mdi-magnify"></i>
                        </span>
                        <input
                            className="uk-search-input uk-width-1-1 uk-background-default uk-border-none"
                            type="search"
                            placeholder="Search..."
                            style={{ border: "none" }}
                        />
                    </form>

                    <div className="uk-card uk-margin">
                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    className="uk-checkbox sc-main-checkbox"
                                                    type="checkbox"
                                                    data-sc-icheck
                                                    data-group=".sc-js-table-checkbox"
                                                />
                                            </th>
                                            <th>Profile Image</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone No.</th>
                                            <th>Position</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0 ? (
                                            data?.map(
                                                (value, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                className="uk-checkbox sc-js-table-checkbox"
                                                                type="checkbox"
                                                                data-sc-icheck
                                                            />
                                                        </td>
                                                        <th><img src={`http://192.168.1.13:8000/${value.profile_image}`} /></th>
                                                        <th>{value.name}</th>
                                                        <th>{value.email}</th>
                                                        <th>{value.phone}</th>
                                                        <th>{value.role}</th>
                                                        <td>
                                                            <div className='uk-flex'>
                                                                <div className='uk-margin-right' onClick={() => handleView(value._id)}>
                                                                    <a className="sc-button sc-button-danger sc-js-button-wave-light" href="#">
                                                                        <i className="mdi mdi-file-edit"></i>
                                                                    </a>
                                                                </div>
                                                                <div className="uk-flex uk-flex-right gap-2">
                                                                    <div onClick={(e) => deletedata(value._id)}>
                                                                        <a className="sc-button sc-button-secondary sc-js-button-wave-light" href="#">
                                                                            <i className="mdi mdi-trash-can-outline"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td>
                                                    <p>No data available.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    </>
  )
}
