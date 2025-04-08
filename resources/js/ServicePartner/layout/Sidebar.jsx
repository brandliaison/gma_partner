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
                                <Link to="/service-partner/dashboard">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-home"></i>
                                    </span>
                                    <span className="uk-nav-title">Home</span>
                                </Link>
                            </li>

                            <li
                                className={`sc-has-submenu ${
                                    openDropdowns.services ? "uk-open" : ""
                                }`}
                            >
                                <a
                                    href="#"
                                    onClick={() => toggleDropdown("services")}
                                >
                                    <div className="uk-flex uk-flex-middle uk-width-1-1">
                                        <div className="uk-flex uk-flex-middle uk-width-1-1">
                                            <span className="uk-nav-icon">
                                                <i className="mdi mdi-file-certificate"></i>
                                            </span>
                                            <span className="uk-nav-title">
                                                Services
                                            </span>
                                        </div>
                                        <i
                                            className={`mdi ${
                                                openDropdowns.services
                                                    ? "mdi-chevron-up"
                                                    : "mdi-chevron-down"
                                            }`}
                                        ></i>
                                    </div>
                                </a>

                                <ul
                                    className="sc-sidebar-menu-sub"
                                    style={{
                                        display: openDropdowns.services
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <li>
                                        <Link to="/service-partner/services">
                                            <span className="uk-nav-title">
                                                Services
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-partner/service-categories">
                                            <span className="uk-nav-title">
                                                Service Categories
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-partner/service-section">
                                            <span className="uk-nav-title">
                                                Service Section
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className={`sc-has-submenu ${
                                    openDropdowns.product ? "uk-open" : ""
                                }`}
                            >
                                <a
                                    href="#"
                                    onClick={() => toggleDropdown("product")}
                                >
                                    <div className="uk-flex uk-flex-middle uk-width-1-1">
                                        <div className="uk-flex uk-flex-middle uk-width-1-1">
                                            <span className="uk-nav-icon">
                                                <i className="mdi mdi-package-variant-remove"></i>
                                            </span>
                                            <span className="uk-nav-title">
                                                Product
                                            </span>
                                        </div>
                                        <i
                                            className={`mdi ${
                                                openDropdowns.product
                                                    ? "mdi-chevron-up"
                                                    : "mdi-chevron-down"
                                            }`}
                                        ></i>
                                    </div>
                                </a>

                                <ul
                                    className="sc-sidebar-menu-sub"
                                    style={{
                                        display: openDropdowns.product
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <li>
                                        <Link to="/service-partner/products">
                                            <span className="uk-nav-title">
                                                Products
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-partner/product-categories">
                                            <span className="uk-nav-title">
                                                Product Categories
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className={`sc-has-submenu ${
                                    openDropdowns.notification ? "uk-open" : ""
                                }`}
                            >
                                <a
                                    href="#"
                                    onClick={() =>
                                        toggleDropdown("notification")
                                    }
                                >
                                    <div className="uk-flex uk-flex-middle uk-width-1-1">
                                        <div className="uk-flex uk-flex-middle uk-width-1-1">
                                            <span className="uk-nav-icon">
                                                <i className="mdi mdi-bell"></i>
                                            </span>
                                            <span className="uk-nav-title">
                                                Notification
                                            </span>
                                        </div>
                                        <i
                                            className={`mdi ${
                                                openDropdowns.notification
                                                    ? "mdi-chevron-up"
                                                    : "mdi-chevron-down"
                                            }`}
                                        ></i>
                                    </div>
                                </a>

                                <ul
                                    className="sc-sidebar-menu-sub"
                                    style={{
                                        display: openDropdowns.notification
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <li>
                                        <Link to="/service-partner/notifications">
                                            <span className="uk-nav-title">
                                                Notifications
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-partner/notification-categories">
                                            <span className="uk-nav-title">
                                                Notification Categories
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className={`sc-has-submenu ${
                                    openDropdowns.blogs ? "uk-open" : ""
                                }`}
                            >
                                <a
                                    href="#"
                                    onClick={() => toggleDropdown("blogs")}
                                >
                                    <div className="uk-flex uk-flex-middle uk-width-1-1">
                                        <div className="uk-flex uk-flex-middle uk-width-1-1">
                                            <span className="uk-nav-icon">
                                                <i className="mdi mdi-post-outline"></i>
                                            </span>
                                            <span className="uk-nav-title">
                                                Blogs
                                            </span>
                                        </div>
                                        <i
                                            className={`mdi ${
                                                openDropdowns.blogs
                                                    ? "mdi-chevron-up"
                                                    : "mdi-chevron-down"
                                            }`}
                                        ></i>
                                    </div>
                                </a>

                                <ul
                                    className="sc-sidebar-menu-sub"
                                    style={{
                                        display: openDropdowns.blogs
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    <li>
                                        <Link to="/service-partner/blogs">
                                            <span className="uk-nav-title">
                                                Blogs
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/service-partner/blog-categories">
                                            <span className="uk-nav-title">
                                                Blog Categories
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
    );
}
