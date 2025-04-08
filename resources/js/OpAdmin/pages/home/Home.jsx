import React from 'react';

export default function Home() {
  return (
    <>
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-4@xl uk-child-width-1-2@s" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <a href="plugins-data_grid.html" className="uk-card-body sc-padding sc-padding-medium-ends uk-flex uk-flex-middle">
                                <div className="uk-flex-1">
                                    <h3 className="uk-card-title">Data Grid</h3>
                                    <p className="sc-color-secondary uk-margin-remove uk-text-medium">Display and Edit Data</p>
                                </div>
                                <div className="md-bg-amber-600 uk-flex uk-flex-middle sc-padding-medium sc-padding-small-ends sc-round">
                                    <i className="mdi mdi-grid md-color-white"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card">
                            <a href="pages-mailbox.html" className="uk-card-body sc-padding sc-padding-medium-ends uk-flex uk-flex-middle">
                                <div className="uk-flex-1">
                                    <h3 className="uk-card-title">Mailbox</h3>
                                    <p className="sc-color-secondary uk-margin-remove uk-text-medium">Check Your Mail</p>
                                </div>
                                <div className="md-bg-green-600 uk-flex uk-flex-middle sc-padding-medium sc-padding-small-ends sc-round">
                                    <i className="mdi mdi-email-outline md-color-white"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card">
                            <a href="pages-task_board.html" className="uk-card-body sc-padding sc-padding-medium-ends uk-flex uk-flex-middle">
                                <div className="uk-flex-1">
                                    <h3 className="uk-card-title">Task Board</h3>
                                    <p className="sc-color-secondary uk-margin-remove uk-text-medium">Get Things Done</p>
                                </div>
                                <div className="md-bg-red-600 uk-flex uk-flex-middle sc-padding-medium sc-padding-small-ends sc-round">
                                    <i className="mdi mdi-bug md-color-white"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card">
                            <a href="pages-chat.html" className="uk-card-body sc-padding sc-padding-medium-ends uk-flex uk-flex-middle">
                                <div className="uk-flex-1">
                                    <h3 className="uk-card-title">Chat</h3>
                                    <p className="sc-color-secondary uk-margin-remove uk-text-medium">Get in Touch with Friends</p>
                                </div>
                                <div className="md-bg-deep-purple-600 uk-flex uk-flex-middle sc-padding-medium sc-padding-small-ends sc-round">
                                    <i className="mdi mdi-message-outline md-color-white"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="uk-child-width-1-3@l uk-child-width-1-2@m" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <h3 className="uk-card-title">Revenue</h3>
                            <div className="uk-card-body">
                                <div className="sc-chart uk-flex uk-flex-center" id="sc-js-chart-revenue">
                                    <div className="uk-flex uk-flex-middle uk-height-1-1 uk-flex-center">
                                        <div className="sc-spinner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card">
                            <h3 className="uk-card-title">Email Subscribers</h3>
                            <div className="uk-card-body">
                                <div className="sc-chart uk-flex uk-flex-center" id="sc-js-chart-email-subscribers">
                                    <div className="uk-flex uk-flex-middle uk-height-1-1 uk-flex-center">
                                        <div className="sc-spinner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card">
                            <h3 className="uk-card-title">Returns</h3>
                            <div className="uk-card-body">
                                <div className="sc-chart uk-flex uk-flex-center" id="sc-js-chart-returns">
                                    <div className="uk-flex uk-flex-middle uk-height-1-1 uk-flex-center">
                                        <div className="sc-spinner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-uk-grid>
                    <div className="uk-width-2-3@l">
                        <div className="uk-card">
                            <h3 className="uk-card-title">Sales report</h3>
                            <div className="sc-padding sc-padding-medium-ends md-bg-grey-100">
                                <div className=" uk-flex-middle uk-grid-small" data-uk-grid>
                                    <div className="uk-flex-1">
                                        <div className="uk-button-group sc-button-group-outline">
                                            <button className="sc-button sc-button-default sc-button-outline sc-button-small sc-js-chart-view" data-view="hours">Hours</button>
                                            <button className="sc-button sc-button-default sc-button-outline sc-button-small sc-js-chart-view" data-view="week">Week</button>
                                            <button className="sc-button sc-button-default sc-button-outline uk-active sc-button-small sc-js-chart-view" data-view="months">Months</button>
                                            <button className="sc-button sc-button-default sc-button-outline sc-button-small sc-js-chart-view" data-view="years">Years</button>
                                        </div>
                                    </div>
                                    <div className="uk-flex uk-width-auto@s">
                                        <a href="#" id="sc-chart-reload"><i className="mdi sc-icon-square mdi-reload sc-color-secondary"></i></a>
                                        <a href="#" id="sc-chart-save-image"><i className="mdi sc-icon-square mdi-floppy sc-color-secondary"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="sc-card-content">
                                <div className="sc-padding-medium" dir="ltr">
                                    <div className="sc-chart-large uk-flex uk-flex-center" id="sc-js-chart-sales-report">
                                        <div className="uk-flex uk-flex-middle uk-height-1-1 uk-flex-center">
                                            <div className="sc-spinner"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-1-3@l">
                        <div className="uk-card">
                            <h3 className="uk-card-title">Top Referals</h3>
                            <div className="uk-card-body">
                                <div className="sc-chart uk-flex uk-flex-center" id="sc-js-chart-referrals" dir="ltr">
                                    <div className="uk-flex uk-flex-middle uk-height-1-1 uk-flex-center">
                                        <div className="sc-spinner"></div>
                                    </div>
                                </div>
                                <table className="uk-table uk-table-small uk-table-divider">
                                    <thead>
                                    <tr>
                                        <th className="uk-table-shrink">Rank</th>
                                        <th>Referral</th>
                                        <th>Visits</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="uk-text-center">1</td>
                                        <td>Google</td>
                                        <td>125234</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-text-center">2</td>
                                        <td>Bookmarks</td>
                                        <td>104234</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-text-center">3</td>
                                        <td>Facebook</td>
                                        <td>78342</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-text-center">4</td>
                                        <td>Envato</td>
                                        <td>41895</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-text-center">5</td>
                                        <td>Twitter</td>
                                        <td>23619</td>
                                    </tr>
                                    <tr>
                                        <td className="uk-text-center">6</td>
                                        <td>Bing</td>
                                        <td>4268</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uk-card uk-margin-top">
                    <h3 className="uk-card-title">Latest Orders</h3>
                    <div className="uk-card-body">
                        <div className="uk-overflow-auto">
                            <table className="uk-table uk-table-striped uk-table-hover uk-table-middle">
                                <thead>
                                <tr>
                                    <th className="uk-table-shrink"></th>
                                    <th>Product</th>
                                    <th>Customer</th>
                                    <th>Order ID</th>
                                    <th className="uk-text-center">Quantity</th>
                                    <th className="uk-text-right">Price</th>
                                    <th className="uk-table-shrink">Status</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                                                                                                <tr>
                                        <td className="uk-text-right">1</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Samsung 128GB 100MB/s (U3) MicroSD</a></td>
                                        <td className="uk-text-nowrap">Savanna Thiel</td>
                                        <td>#RoLAOSmtIC</td>
                                        <td className="uk-text-center">1</td>
                                        <td className="uk-text-right">$19.99</td>
                                        <td><span className="uk-label uk-label-default">on hold</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">2</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Nintendo Switch – Neon Red and Neon Blue Joy-Con</a></td>
                                        <td className="uk-text-nowrap">Madalyn Graham</td>
                                        <td>#c7EgQlUhPr</td>
                                        <td className="uk-text-center">2</td>
                                        <td className="uk-text-right">$299.00</td>
                                        <td><span className="uk-label uk-label-default">on hold</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">3</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Oral-B Black Pro 1000 Power Rechargeable Electric Toothbrush</a></td>
                                        <td className="uk-text-nowrap">Mariane Nienow</td>
                                        <td>#L0qcaHuxOw</td>
                                        <td className="uk-text-center">3</td>
                                        <td className="uk-text-right">$39.94</td>
                                        <td><span className="uk-label uk-label-warning">pending</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">4</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">iRobot Roomba 960 Robot Vacuum with Wi-Fi Connectivity</a></td>
                                        <td className="uk-text-nowrap">Kristy Gleason</td>
                                        <td>#tlndw28xCo</td>
                                        <td className="uk-text-center">2</td>
                                        <td className="uk-text-right">$314.30</td>
                                        <td><span className="uk-label uk-label-warning">pending</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">5</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Fujitsu ScanSnap iX500 Color Duplex Desk Scanner for Mac and PC</a></td>
                                        <td className="uk-text-nowrap">Vince Denesik</td>
                                        <td>#t38vN1DlFJ</td>
                                        <td className="uk-text-center">2</td>
                                        <td className="uk-text-right">$404.95</td>
                                        <td><span className="uk-label uk-label-danger">canceled</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">6</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Samsung Galaxy Watch (46mm) Silver (Bluetooth)</a></td>
                                        <td className="uk-text-nowrap">Leonie Okuneva</td>
                                        <td>#PbNnzAxojM</td>
                                        <td className="uk-text-center">2</td>
                                        <td className="uk-text-right">$349.99</td>
                                        <td><span className="uk-label uk-label-default">on hold</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">7</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Sonos Play:1 – Compact Wireless Home Smart Speaker for Streaming Music</a></td>
                                        <td className="uk-text-nowrap">Kristina Hodkiewicz</td>
                                        <td>#rW8ZSjvAQD</td>
                                        <td className="uk-text-center">1</td>
                                        <td className="uk-text-right">$149.00</td>
                                        <td><span className="uk-label uk-label-default">on hold</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">8</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Fitbit Charge 3 Fitness Activity Tracker</a></td>
                                        <td className="uk-text-nowrap">Flossie Smith</td>
                                        <td>#QPKMFsfdm9</td>
                                        <td className="uk-text-center">1</td>
                                        <td className="uk-text-right">$149.95</td>
                                        <td><span className="uk-label uk-label-success">sent</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">9</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Dyson Cyclone V10 Absolute Lightweight Cordless Stick Vacuum Cleaner</a></td>
                                        <td className="uk-text-nowrap">Nikko Prosacco</td>
                                        <td>#tdDCFNHXMW</td>
                                        <td className="uk-text-center">2</td>
                                        <td className="uk-text-right">$527.94</td>
                                        <td><span className="uk-label uk-label-default">on hold</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
                                                                                        <tr>
                                        <td className="uk-text-right">10</td>
                                        <td className="uk-text-nowrap"><a href="#" className="sc-text-semibold">Logitech Harmony Elite Remote Control</a></td>
                                        <td className="uk-text-nowrap">Joel Stracke</td>
                                        <td>#8CzGPvquZO</td>
                                        <td className="uk-text-center">2</td>
                                        <td className="uk-text-right">$184.99</td>
                                        <td><span className="uk-label uk-label-danger">canceled</span></td>
                                        <td><a href="#" className="mdi mdi-file-outline sc-icon-square"></a></td>
                                    </tr>
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
