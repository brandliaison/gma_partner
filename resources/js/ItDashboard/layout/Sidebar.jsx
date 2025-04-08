import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (menu) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

  return (
    <>
    
            <aside id="sc-sidebar-main" className="sc-sidebar-info-fixed">
                <div className="uk-offcanvas-bar">
                    <div
                        className="sc-sidebar-main-scrollable"
                        data-sc-scrollbar="visible-y"
                    >
                        <ul className="sc-sidebar-menu uk-nav">
                            <li className="sc-sidebar-menu-heading">
                                <span>Pages</span>
                            </li>

                            <li title="Chat">
                                <Link to="/it-admin/dashboard">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-home"></i>
                                    </span>
                                    <span className="uk-nav-title">Home</span>
                                </Link>
                            </li>

                            <li
                                className={`sc-has-submenu ${
                                    openDropdowns.designation ? "uk-open" : ""
                                }`}
                            >
                                <a
                                    href="#"
                                    onClick={() => toggleDropdown("designation")}
                                >
                                    <div className="uk-flex uk-flex-middle uk-width-1-1">
                                        <div className="uk-flex uk-flex-middle uk-width-1-1">
                                            <span className="uk-nav-icon">
                                                <i className="mdi mdi-file-certificate"></i>
                                            </span>
                                            <span className="uk-nav-title">
                                                Staff Managment
                                            </span>
                                        </div>
                                        <i
                                            className={`mdi ${
                                                openDropdowns.designation
                                                    ? "mdi-chevron-up"
                                                    : "mdi-chevron-down"
                                            }`}
                                        ></i>
                                    </div>
                                </a>

                                <ul
                                    className="sc-sidebar-menu-sub"
                                    style={{
                                        display: openDropdowns.designation
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <li>
                                        <Link to="/it-admin/designation">
                                            <span className="uk-nav-title">
                                                Designation
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/it-admin/roles">
                                            <span className="uk-nav-title">
                                                Roles
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/it-admin/staffmanagement">
                                            <span className="uk-nav-title">
                                                Staff Management
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                    <div className="sc-sidebar-info">
                        © 2025 Brand Liaison. All rights reserved.
                    </div>
                </div>
            </aside>
    
    </>
  )
}
