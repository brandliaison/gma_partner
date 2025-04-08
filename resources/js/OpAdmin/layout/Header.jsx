import React from 'react'

export default function Header() {
  return (
    <>
        <header id="sc-header">
            <nav className="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
                <div className="uk-navbar-left nav-overlay-small uk-margin-right uk-navbar-aside">
                                <a href="#" id="sc-sidebar-main-toggle"><i className="mdi mdi-backburger sc-menu-close"></i><i className="mdi mdi-menu sc-menu-open"></i></a>
                                <div className="sc-brand uk-visible@s">
                        <a href="dashboard-v1.html"><img src="assets/img/logo.png" alt="" /></a>
                    </div>
                </div>
                    <div className="uk-navbar-left nav-overlay uk-margin-right uk-visible@m">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a href="javascript:void(0)" className="md-color-white sc-padding-remove-left"><i className="mdi mdi-view-grid"></i></a>
                            <div className="uk-navbar-dropdown sc-padding-medium">
                                <div className="uk-child-width-1-2 uk-child-width-1-3@s uk-grid uk-grid-small" data-uk-grid>
                                    <div>
                                        <a href="pages-mailbox.html" className="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
                                            <i className="mdi mdi-email-outline sc-icon-32 sc-text-lh-1 md-color-green-700"></i>
                                            <span className="uk-text-medium sc-color-primary">Mailbox</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="pages-poi_listing.html" className="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
                                            <i className="mdi mdi-map-marker sc-icon-32 sc-text-lh-1 md-color-red-700"></i>
                                            <span className="uk-text-medium sc-color-primary">POI</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="pages-chat.html" className="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
                                            <i className="mdi mdi-message-outline sc-icon-32 sc-text-lh-1 md-color-purple-700"></i>
                                            <span className="uk-text-medium sc-color-primary">Chat</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="plugins-calendar.html" className="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
                                            <i className="mdi mdi-calendar sc-icon-32 sc-text-lh-1 md-color-light-blue-700"></i>
                                            <span className="uk-text-medium sc-color-primary">Calendar</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="pages-user_profile.html" className="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
                                            <i className="mdi mdi-account sc-icon-32 sc-text-lh-1 md-color-blue-grey-700"></i>
                                            <span className="uk-text-medium sc-color-primary">Profile</span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="plugins-charts.html" className="uk-flex uk-flex-column uk-flex-middle uk-box-shadow-hover-small sc-round sc-padding-small">
                                            <i className="mdi mdi-chart-multiline sc-icon-32 sc-text-lh-1 md-color-amber-700"></i>
                                            <span className="uk-text-medium sc-color-primary">Charts</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                    <div className="nav-overlay nav-overlay-small uk-navbar-right uk-flex-1" hidden>
                    <a className="uk-navbar-toggle uk-visible@m" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top" href="#">
                        <i className="mdi mdi-close sc-icon-24"></i>
                    </a>
                    <a className="uk-navbar-toggle uk-hidden@m uk-padding-remove-left" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top" href="#">
                        <i className="mdi mdi-close sc-icon-24"></i>
                    </a>
                    <div className="uk-navbar-item uk-width-expand uk-padding-remove-right">
                        <form className="uk-search uk-search-navbar uk-width-1-1 uk-flex">
                            <div className="uk-flex-1 uk-position-relative">
                                <a className="uk-form-icon uk-form-icon-flip" href="javascript:void(0)" data-uk-icon="icon: close" data-sc-clear-input></a>
                                <input className="uk-search-input" type="search" placeholder="Search..." />
                            </div>
                            <button className="sc-button sc-button-default sc-button-small sc-button-icon sc-button-flat uk-margin-small-left" type="button"><i className="mdi mdi-magnify sc-icon-24 md-color-white"></i></button>
                        </form>
                    </div>
                </div>
                <div className="nav-overlay nav-overlay-small uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        <li>
                            <a className="uk-navbar-toggle uk-visible@m" href="#" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top"><i className="mdi mdi-magnify"></i></a>
                            <a className="uk-navbar-toggle uk-hidden@m" href="#" id="sc-search-main-toggle-mobile" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top"><i className="mdi mdi-magnify"></i></a>
                        </li>
                        <li className="uk-visible@l">
                            <a href="#" id="sc-js-fullscreen-toggle"><i className="mdi mdi-fullscreen sc-js-el-hide"></i><i className="mdi mdi-fullscreen-exit sc-js-el-show"></i></a>
                        </li>
                        <li className="uk-visible@s">
                            <a href="#" className="sc-text-semibold">
                                EN
                            </a>
                            <div className="uk-navbar-dropdown uk-dropdown-small">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li><a href="#">Deutsch</a></li>
                                    <li><a href="#">Español</a></li>
                                    <li><a href="#">Français</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#">
                                <span className="mdi mdi-email"></span>
                            </a>
                            <div className="uk-navbar-dropdown sc-padding-remove">
                                <div className="uk-panel uk-panel-scrollable uk-height-medium">
                                    <ul className="uk-list uk-list-divider sc-js-edge-fix">
                                        <li className="sc-list-group">
                                            <div className="sc-list-addon">
                                                <span className="sc-avatar-initials md-color-white md-bg-red-500" title="ablock">MO</span>
                                            </div>
                                            <a href="#" className="sc-list-body uk-display-block">
                                                <span className="uk-text-small uk-text-muted uk-width-expand">08:42 AM</span>
                                                <span className="uk-display-block uk-text-truncate">Vel fugiat consequatur et quas id est ut.</span>
                                            </a>
                                        </li>
                                        <li className="sc-list-group">
                                            <div className="sc-list-addon">
                                                <img src="assets/img/avatars/avatar_05_sm.png" className="sc-avatar " alt="kessler.aron"/>
                                            </div>
                                            <a href="#" className="sc-list-body uk-display-block">
                                                <div className="uk-text-small uk-text-muted uk-width-expand">Jun 19, 2021</div>
                                                <span className="uk-display-block uk-text-truncate">Sint debitis autem a tenetur exercitationem illo architecto iste et cumque.</span>
                                            </a>
                                        </li>
                                        <li className="sc-list-group">
                                            <div className="sc-list-addon">
                                                <span className="sc-avatar-initials md-color-white md-bg-light-green-500" title="kris.august">KS</span>
                                            </div>
                                            <a href="#" className="sc-list-body uk-display-block">
                                                <span className="uk-text-small uk-text-muted uk-width-expand">06:42 AM</span>
                                                <span className="uk-display-block uk-text-truncate">Rerum et ab provident voluptatibus ea incidunt doloribus dolorem qui at.</span>
                                            </a>
                                        </li>
                                        <li className="sc-list-group">
                                            <div className="sc-list-addon">
                                                <img src="assets/img/avatars/avatar_06_sm.png" className="sc-avatar " alt="qolson"/>
                                            </div>
                                            <a href="#" className="sc-list-body uk-display-block">
                                                <span className="uk-text-small uk-text-muted uk-width-expand">Jun 18, 2021</span>
                                                <span className="uk-display-block uk-text-truncate">In laborum pariatur nam autem qui quam adipisci debitis.</span>
                                            </a>
                                        </li>
                                        <li className="sc-list-group">
                                            <div className="sc-list-addon">
                                                <img src="assets/img/avatars/avatar_02_sm.png" className="sc-avatar " alt="watsica.jazmin"/>
                                            </div>
                                            <a href="#" className="sc-list-body uk-display-block">
                                                <span className="uk-text-small uk-text-muted uk-width-expand">Jun 16, 2021</span>
                                                <span className="uk-display-block uk-text-truncate">Excepturi impedit dolores doloremque et voluptatem cupiditate et saepe delectus.</span>
                                            </a>
                                        </li>
                                        <li className="sc-list-group">
                                            <div className="sc-list-addon">
                                                <span className="sc-avatar-initials md-color-white md-bg-purple-500" title="hmaggio">FA</span>
                                            </div>
                                            <a href="#" className="sc-list-body uk-display-block">
                                                <span className="uk-text-small uk-text-muted uk-width-expand">Jun 14, 2021</span>
                                                <span className="uk-display-block uk-text-truncate">Vel eos excepturi sed dolores omnis vitae architecto magni cupiditate dolor.</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <a href="pages-mailbox.html" className="uk-flex uk-text-small sc-padding-small-ends sc-padding-medium">Show all in mailbox</a>
                            </div>
                        </li>
                        <li className="uk-visible@s">
                            <a href="#">
                                <span className="mdi mdi-bell uk-display-inline-block">
                                    <span className="sc-indicator md-bg-color-red-600"></span>
                                </span>
                            </a>
                            <div className="uk-navbar-dropdown md-bg-grey-100">
                                <div className="sc-padding-medium sc-padding-small-ends">
                                    <div className="uk-text-right uk-margin-medium-bottom">
                                        <button className="sc-button sc-button-default sc-button-outline sc-button-mini sc-js-clear-alerts">Clear all</button>
                                    </div>
                                    <ul className="uk-list uk-margin-remove" id="sc-header-alerts">
                                        <li className="sc-border sc-round md-bg-white">
                                            <div className="uk-margin-right uk-margin-small-left"><i className="mdi mdi-alert-outline md-color-red-600"></i></div>
                                            <div className="uk-flex-1 uk-text-small">
                                                Information Page Not Found!
                                            </div>
                                        </li>
                                        <li className="uk-margin-small-top sc-border sc-round md-bg-white">
                                            <div className="uk-margin-right uk-margin-small-left"><i className="mdi mdi-email-check-outline md-color-blue-600"></i></div>
                                            <div className="uk-flex-1 uk-text-small">
                                                A new password has been sent to your e-mail address.
                                            </div>
                                        </li>
                                        <li className="uk-margin-small-top sc-border sc-round md-bg-white">
                                            <div className="uk-margin-right uk-margin-small-left"><i className="mdi mdi-alert-outline md-color-red-600"></i></div>
                                            <div className="uk-flex-1 uk-text-small">
                                                You do not have permission to access the API!
                                            </div>
                                        </li>
                                        <li className="uk-margin-small-top sc-border sc-round md-bg-white">
                                            <div className="uk-margin-right uk-margin-small-left"><i className="mdi mdi-check-all md-color-light-green-600"></i></div>
                                            <div className="uk-flex-1 uk-text-small">
                                                Your enquiry has been successfully sent.
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="uk-text-medium uk-text-center sc-js-empty-message sc-text-semibold sc-padding-ends" style={{display: 'none'}}>No alerts!</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="#"><img src="assets/img/avatars/avatar_default_sm.png" alt="" /></a>
                            <div className="uk-navbar-dropdown uk-dropdown-small">
                                <ul className="uk-nav uk-nav-navbar">
                                    <li><a href="pages-user_profile.html">Profile</a></li>
                                    <li><a href="pages-settings.html">Settings</a></li>
                                    <li><a href="login_page.html">Log Out</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <a href="#" className="sc-js-offcanvas-toggle md-color-white uk-margin-left uk-hidden@l">
                        <i className="mdi mdi-menu sc-offcanvas-open"></i>
                        <i className="mdi mdi-arrow-right sc-offcanvas-close"></i>
                    </a>
                </div>
            </nav>
        </header>
    </>
  )
}
