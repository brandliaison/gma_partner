import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            {/* <!-- footer section --> */}

            <div className="footer-main gray-background uk-padding-large uk-padding-remove-horizontal uk-padding-remove-bottom">
                <div className="custom-container">
                    <div
                        className="uk-grid-collapse uk-grid uk-grid-medium uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-4@l"
                        uk-child
                    >
                        <div className="footer-about">
                            <img
                                src="./images/logos/footerlogo.png"
                                className="uk-margin-bottom"
                            />
                            <p>
                                Non pulvinar neque laoreet spendisse. nectus et
                                netus et malesuada fames ac. Diam donec
                                adipiscing tristique us nec feugiat. Amet natis
                                urna rsus eget nunc scelerisque. dimentumae
                                sapien pellentesque habitant morbi tristique
                                senectus et.
                            </p>
                        </div>
                        <div className="footer-menu">
                            <h4 className="uk-margin-remove uk-text-bold">
                                Join us
                            </h4>
                            <ul className="uk-list uk-margin-medium-top">
                                <li>
                                    <Link to={"/service-partner-registraton"}>
                                        Service Partner
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/channel-partner-registraton"}>
                                        Channel Partner
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/career"}>
                                        Career
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-menu">
                            <h4 className="uk-margin-remove uk-text-bold">
                                Quick Links
                            </h4>
                            <ul className="uk-list uk-margin-medium-top">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">About us</a>
                                </li>
                                <li>
                                    <a href="#">Downloads</a>
                                </li>
                                <li>
                                    <a href="#">Blogs</a>
                                </li>
                                <li>
                                    <a href="#">Media Coverage</a>
                                </li>
                                <li>
                                    <a href="#">Gallery</a>
                                </li>
                                <li>
                                    <a href="#">Industry Notifications</a>
                                </li>
                                <li>
                                    <a href="#">Holiday List</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-menu">
                            <h4 className="uk-margin-remove uk-text-bold">
                                Contact Information
                            </h4>
                            <ul className="uk-list uk-margin-medium-top">
                                <li className="uk-flex">
                                    <span
                                        uk-icon="location"
                                        className="icons uk-flex uk-flex-center uk-margin-small-right"
                                    ></span>
                                    <p className="text-bold">
                                        RACAP Foundation205, Sharma ComplexA-2,
                                        Guru Nanak Pura, Laxmi NagarDelhi -
                                        110092, India
                                    </p>
                                </li>
                                <li className="uk-flex">
                                    <span
                                        uk-icon="receiver"
                                        className="icons uk-flex uk-flex-center uk-margin-small-right"
                                    ></span>
                                    <p className="text-bold">+91-9810363988</p>
                                </li>
                                <li className="uk-flex">
                                    <span
                                        uk-icon="mail"
                                        className="icons uk-flex uk-flex-center uk-margin-small-right"
                                    ></span>
                                    <p className="text-bold">info@gmaone.com</p>
                                </li>
                                <li className="uk-flex">
                                    <span
                                        uk-icon="clock"
                                        className="icons uk-flex uk-flex-center uk-margin-small-right"
                                    ></span>
                                    <p className="text-bold">
                                        Mon – Fri: 10 Am – 6.30 Pm,Sat
                                        ,Sun: CLOSED
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footersocial-media uk-margin-large-top">
                        <div>
                            <span uk-icon="facebook" className="icons"></span>
                        </div>
                        <div>
                            <span uk-icon="x"></span>
                        </div>
                        <div>
                            <span uk-icon="linkedin"></span>
                        </div>
                        <div>
                            <span uk-icon="youtube"></span>
                        </div>
                        <div>
                            <span uk-icon="whatsapp"></span>
                        </div>
                        <div>
                            <span uk-icon="social"></span>
                        </div>
                    </div>
                </div>
                <div className="footerlast-rights-reserve uk-text-center">
                    <p className="color-white text-bold uk-text-small uk-padding-small uk-padding-remove-horizontal">
                        Copyright © 2023 Brand Liaison India Pvt Ltd.
                    </p>
                </div>
            </div>
        </>
    );
}
