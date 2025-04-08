import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(header) {
    const alldata = header.header.data;
    const navigation = useNavigate();

    const handleServiceLink = (e) => {
        if (e == 1) {
            navigation("/service-partner-registraton");
        }
        if (e == 2) {
            navigation("/channel-partner-registraton");
        }
    };

    const handleServiceLink1 = (e) => {
        if (e == 1) {
            window.location.replace("/service-partner/login");
        }
        if (e == 2) {
            navigation("/channel-partner-registraton");
        }
    };
    return (
        <>
            {/* <!-- nav bar  --> */}
            <div className="navbar">
                <div className="nav-top main-background uk-padding-small uk-padding-remove-horizontal">
                    <div className="custom-container">
                        <div className="uk-flex uk-flex-center uk-flex-between uk-flex-middle">
                            <p className="color-white uk-flex uk-flex-midile">
                                <span
                                    uk-icon="receiver"
                                    className="icons uk-margin-small-right"
                                ></span>
                                Helpline No :{" "}
                                {alldata?.find(
                                    (item) => item.key === "phone_default"
                                )?.value || "No phone number available"}
                            </p>
                            <p className="color-white uk-flex uk-flex-midile">
                                <span
                                    uk-icon="mail"
                                    className="icons uk-margin-small-right"
                                ></span>
                                E-Mail :{" "}
                                {alldata?.find(
                                    (item) => item.key === "email_default"
                                )?.value || "No Email Address available"}
                            </p>
                            <p className="color-white uk-flex uk-flex-midile">
                                <span
                                    uk-icon="location"
                                    className="icons uk-margin-small-right"
                                ></span>
                                {alldata?.find(
                                    (item) => item.key === "header_address"
                                )?.value || "No Address available"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="nav-midile uk-padding-small uk-padding-remove-horizontal">
                    <div className="custom-container uk-flex uk-flex-between uk-flex-middle">
                        <div className="one">
                            <Link to={'/'}>
                                <img
                                    src={`http://127.0.0.1:8000${
                                        alldata?.find(
                                            (item) => item.key === "main_logo"
                                        )?.value || ""
                                    }`}
                                />
                                </Link>
                        </div>
                        <div className="two">
                            <img
                                src={`http://127.0.0.1:8000${
                                    alldata?.find(
                                        (item) => item.key === "india_logo"
                                    )?.value || ""
                                }`}
                            />
                        </div>
                        <div className="three">
                            <img
                                src={`http://127.0.0.1:8000${
                                    alldata?.find(
                                        (item) => item.key === "racap_logo"
                                    )?.value || ""
                                }`}
                            />
                        </div>
                    </div>
                </div>
                <div className="nav-last uk-box-shadow-medium uk-padding-small uk-padding-remove-horizontal">
                    <div className="custom-container uk-flex uk-flex-between uk-flex-middle">
                        <div className="nav-last-left uk-flex">
                            <a href="/services" className="uk-link-reset">
                                <div className="uk-flex uk-flex-middle uk-margin-large-right">
                                    <img
                                        src="./images/notifications/solutions.png"
                                        className="uk-margin-right"
                                    />
                                    <h5 className="uk-text-bold main-color uk-margin-remove">
                                        Solutions
                                    </h5>
                                </div>
                            </a>
                            <a href="/notification" className="uk-link-reset">
                                <div className="uk-flex uk-flex-middle uk-margin-large-right">
                                    <img
                                        src="./images/notifications/notification.png"
                                        className="uk-margin-right"
                                    />
                                    <h5 className="uk-text-bold main-color uk-margin-remove">
                                        Notification
                                    </h5>
                                </div>
                            </a>
                            <a href="/tutorial" className="uk-link-reset">
                                <div className="uk-flex uk-flex-middle uk-margin-large-right">
                                    <img
                                        src="./images/notifications/tutorials.png"
                                        className="uk-margin-right"
                                    />
                                    <h5 className="uk-text-bold main-color uk-margin-remove">
                                        Tutorials
                                    </h5>
                                </div>
                            </a>
                        </div>
                        <div className="nav-last-right">
                            <ul>
                                <li className="uk-padding-small uk-padding-remove-vertical">
                                    <span
                                        uk-icon="user"
                                        className="main-color"
                                    ></span>
                                    <div uk-form-custom="target: > * > span:first-child">
                                        <select
                                            aria-label="Custom controls"
                                            onChange={(e) =>
                                                handleServiceLink(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Join Us</option>
                                            <option value="1">
                                                Service Partner
                                            </option>
                                            <option value="2">
                                                Channel Partner
                                            </option>
                                        </select>
                                        <button
                                            className="uk-button uk-button-default uk-border-remove"
                                            type="button"
                                            tabIndex="-1"
                                        >
                                            <span></span>
                                            <span uk-icon="icon: chevron-down"></span>
                                        </button>
                                    </div>
                                </li>
                                <li className="uk-padding-small uk-padding-remove-vertical">
                                    <span
                                        uk-icon="lock"
                                        className="main-color"
                                    ></span>
                                    <div uk-form-custom="target: > * > span:first-child">
                                        <select
                                            aria-label="Custom controls"
                                            onChange={(e) =>
                                                handleServiceLink1(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Login</option>
                                            <option value="1">
                                                Service Partner
                                            </option>
                                            <option value="2">
                                                Channel Partner
                                            </option>
                                        </select>
                                        <button
                                            className="uk-button uk-button-default uk-border-remove"
                                            type="button"
                                            tabIndex="-1"
                                        >
                                            <span></span>
                                            <span uk-icon="icon: chevron-down"></span>
                                        </button>
                                    </div>
                                </li>
                                <li className="uk-padding-small uk-padding-remove-vertical">
                                    <span
                                        uk-icon="database"
                                        className="main-color"
                                    ></span>
                                    <h5 className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color">
                                        Query
                                    </h5>
                                </li>
                                <li className="uk-padding-small uk-padding-remove-vertical">
                                    <span
                                        uk-icon="search"
                                        className="main-color"
                                    ></span>
                                    <h5 className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color">
                                        Search
                                    </h5>
                                </li>
                                <li className="uk-padding-small uk-padding-remove-vertical uk-border-remove">
                                    <form>
                                        <div uk-form-custom="target: > * > span:first-child">
                                            <select aria-label="Custom controls">
                                                <option value="">EN</option>
                                                <option value="1">EN</option>
                                                <option value="2">EN</option>
                                                <option value="3">EN</option>
                                                <option value="4">EN</option>
                                            </select>
                                            <button
                                                className="uk-button uk-button-default uk-border-remove"
                                                type="button"
                                                tabIndex="-1"
                                            >
                                                <span></span>
                                                <span uk-icon="icon: chevron-down"></span>
                                            </button>
                                        </div>
                                    </form>
                                    <h5 className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color uk-margin-remove-top">
                                        Lang
                                    </h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
