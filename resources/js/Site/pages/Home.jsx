import React, { useEffect, useState } from 'react';
import apiClient from '../frontservices/api';

export default function Home() {

    const [data, setdata] = useState([]);

    useEffect(() => {
        homedata();
    }, []);

    const homedata = () => {
        apiClient.get('/home')
            .then(response => {
                setdata(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }

    console.log(data);

  return (
    <>

      {/* <!-- home banner --> */}

      <div className="homebanner">
        <div className="homebanner-text-div">
          <h1>
            Expert Assistance for <br />
            Seamless Certification Approval
          </h1>
          <h2>Empowering Your Business Growth</h2>
        </div>
      </div>

      {/* <!-- home about section--> */}

      <div className="home-about-main background-second uk-padding uk-padding-remove-horizontal">
          <div className="custom-container">
              <div
              className="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@l" uk-grid="true">
              <div className="home-about-left">
                  <h2 className="uk-margin-small-bottom uk-margin-small-top uk-text-2xlarge uk-text-bold fourth-color font-size1">Ensure The Required Approval</h2>
                  <h3 className="third-color uk-text-bold uk-margin-small-bottom uk-margin-small-top font-size2">Enable your Bussiness</h3>
                  <p>
                  Whole front do of plate heard oh ought. His defective nor
                  convinced residence own. Connection has put impossible own
                  apartments boisterous. At jointure ladyship an insisted so
                  humanity he. Friendly bachelor entrance to on.
                  </p>
                  <ul className="uk-list uk-list-collapse">
                  <li>
                      <img src="./images/icons/target.png" className="uk-margin-right"/>
                      <p>
                      Fermentum dui faucibus in ornare quam viverra orci sagittis
                      eu. Molestie nunc non blandit massa enim nec dui nunc mattis.
                      Fermentum posuere urna nec tincidunt.
                      </p>
                  </li>
                  <li>
                      <img src="./images/icons/target.png" className="uk-margin-right"/>
                      <p>
                      Fermentum dui faucibus in ornare quam viverra orci sagittis
                      eu. Molestie nunc non blandit massa enim nec dui nunc mattis.
                      Fermentum posuere urna nec tincidunt.
                      </p>
                  </li>
                  <li>
                      <img src="./images/icons/target.png" className="uk-margin-right"/>
                      <p>
                      Fermentum dui faucibus in ornare quam viverra orci sagittis
                      eu. Molestie nunc non blandit massa enim nec dui nunc mattis.
                      Fermentum posuere urna nec tincidunt.
                      </p>
                  </li>
                  </ul>
              </div>
              <div className="home-about-right">
                  <div className="uk-container uk-grid-medium uk-child-width-1-2" uk-grid="true">
                      <div  className="uk-flex uk-flex-middle">
                          <div className="uk-padding-small uk-box-shadow-medium">
                              <img src="./images/icons/target.png" />
                          </div>
                          <div className="uk-padding">
                              <h5 className="uk-text-bold uk-margin-remove">Bussiness Solution</h5>
                              <p>Lorem Ipsum has been the industry's </p>
                          </div>
                      </div>
                      <div  className="uk-flex uk-flex-middle">
                          <div className="uk-padding-small uk-box-shadow-medium">
                              <img src="./images/icons/target.png" />
                          </div>
                          <div className="uk-padding">
                              <h5 className="uk-text-bold uk-margin-remove">Bussiness Solution</h5>
                              <p>Lorem Ipsum has been the industry's </p>
                          </div>
                      </div>
                      <div  className="uk-flex uk-flex-middle">
                          <div className="uk-padding-small uk-box-shadow-medium">
                              <img src="./images/icons/target.png" />
                          </div>
                          <div className="uk-padding">
                              <h5 className="uk-text-bold uk-margin-remove">Bussiness Solution</h5>
                              <p>Lorem Ipsum has been the industry's </p>
                          </div>
                      </div>
                      <div  className="uk-flex uk-flex-middle">
                          <div className="uk-padding-small uk-box-shadow-medium">
                              <img src="./images/icons/target.png" />
                          </div>
                          <div className="uk-padding">
                              <h5 className="uk-text-bold uk-margin-remove">Bussiness Solution</h5>
                              <p>Lorem Ipsum has been the industry's </p>
                          </div>
                      </div>
                      <div  className="uk-flex uk-flex-middle">
                          <div className="uk-padding-small uk-box-shadow-medium">
                              <img src="./images/icons/target.png" />
                          </div>
                          <div className="uk-padding">
                              <h5 className="uk-text-bold uk-margin-remove">Bussiness Solution</h5>
                              <p>Lorem Ipsum has been the industry's </p>
                          </div>
                      </div>
                      <div  className="uk-flex uk-flex-middle">
                          <div className="uk-padding-small uk-box-shadow-medium">
                              <img src="./images/icons/target.png" />
                          </div>
                          <div className="uk-padding">
                              <h5 className="uk-text-bold uk-margin-remove">Bussiness Solution</h5>
                              <p>Lorem Ipsum has been the industry's </p>
                          </div>
                      </div>
                  </div>
                  <div className="uk-margin-top uk-text-center">
                      <button className="solid-button uk-text-bold">Read More <i data-lucide="chevrons-right"></i></button>
                  </div>
              </div>
          </div>
          </div>
      </div>

      {/* <!-- query form section --> */}

      <div className="home-query-form uk-padding uk-padding-remove-horizontal">
          <div className="custom-container">
              <div className="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@l uk-flex-bottom" uk-grid="true">
                  <div className="home-query-form-left">
                      <h2 className="uk-margin-small-bottom uk-margin-small-top uk-text-2xlarge uk-text-bold fourth-color font-size1">Get Ready For Your Venture</h2>
                      <h3 className="third-color uk-text-bold uk-margin-small-bottom uk-margin-small-top font-size2">Check Your Preparation</h3>
                      <div className="form-div uk-margin-top uk-flex uk-flex-middle">
                          <form className="background-second uk-padding" style={{width: '70%'}}>
                              <input className="uk-form-large" type="text" placeholder="Name" />
                              <input className="uk-form-large" type="email" placeholder="E-Mail ID" />
                              <select className="uk-select uk-form-large uk-width-1-1">
                                  <option value="option1">Option 1</option>
                                  <option value="option2">Option 2</option>
                                  <option value="option3">Option 3</option>
                              </select>
                              <select className="uk-select uk-form-large uk-width-1-1">
                                  <option value="option1">Option 1</option>
                                  <option value="option2">Option 2</option>
                                  <option value="option3">Option 3</option>
                              </select>
                              <button className="solid-button uk-width-1-1 uk-text-large"> Proceed On <i data-lucide="chevrons-right"></i></button>
                          </form>
                          <div style={{width: '30%', paddingLeft: '30px'}}>
                              <img src="./images/queryformillustration.png" />
                          </div>
                      </div>
                  </div>
                  <div className="home-query-form-right">
                      <ul className="uk-list uk-list-collapse">
                          <li  className="uk-flex uk-flex-top uk-margin-bottom">
                              <i data-lucide="send" className="third-color"></i>
                              <div>
                                  <h5 className="uk-text-bold uk-margin-remove">A great start is a step towards victory :</h5>
                                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                              </div>
                          </li>
                          <li  className="uk-flex uk-flex-top uk-margin-bottom">
                              <i data-lucide="send" className="third-color"></i>
                              <div>
                                  <h5 className="uk-text-bold uk-margin-remove">A great start is a step towards victory :</h5>
                                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                              </div>
                          </li>
                          <li  className="uk-flex uk-flex-top uk-margin-bottom">
                              <i data-lucide="send" className="third-color"></i>
                              <div>
                                  <h5 className="uk-text-bold uk-margin-remove">A great start is a step towards victory :</h5>
                                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                              </div>
                          </li>
                          <li  className="uk-flex uk-flex-top uk-margin-bottom">
                              <i data-lucide="send" className="third-color"></i>
                              <div>
                                  <h5 className="uk-text-bold uk-margin-remove">A great start is a step towards victory :</h5>
                                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      {/* <!-- query banner --> */}

      <div className="home-query-banner">
          <div className="custom-container">
              <div className="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@l uk-flex-bottom" uk-grid="true">
                  <div>
                      <img src="./images/querybanner.png" />
                  </div>
                  <div className="uk-text-center">
                      <h1 className="color-white uk-text-bold">Help For Compliance Solution</h1>
                      <h2 className="uk-margin-remove color-white uk-text-bold">Join Us as a Industry Partner</h2>
                      <img src="./images/icons/phone.png" />
                      <h3 className="color-white uk-text-large uk-margin-remove">CALL US 24/7</h3>
                      <h3 className="uk-margin-small-vertical uk-text-large color-white uk-text-bold">+91-8130615678</h3>
                      <button className="border-button uk-margin-large-bottom"> Contact Us <i data-lucide="chevrons-right"></i></button>
                  </div>
              </div>
          </div>
      </div>

      {/* <!-- tutorial section --> */}

      <div className="home-tutorial-section uk-padding uk-padding-remove-horizontal">
          <div className="custom-container">
              <h2 className="uk-margin-small-bottom uk-margin-large-top uk-text-2xlarge uk-text-bold fourth-color font-size1">Tutorials & Vlogs</h2>
              <h3 className="third-color uk-text-bold uk-margin-medium-bottom uk-margin-small-top font-size2">Guideline & info</h3>
              <div className="uk-grid" uk-grid="true">
                  <div className="uk-width-1-1 uk-width-1-3@m">
                      <div className="tutorial-main uk-card uk-card-default">
                          <div className="uk-position-relative">
                              <img src="./images/tutirialmainthumpnail.png" className="uk-width-1-1"/>
                              <div className="tutorial-play-icon">
                                  <i data-lucide="circle-play" className="color-white uk-width-1-1"></i>
                              </div>
                              <div className="tutorial">
                                  <h4 className="uk-margin-remove uk-text-bold color-white">Tutorial</h4>
                              </div>
                          </div>
                          <div className="uk-padding-small">
                              <h2 className="uk-text-bold fourth-color">What is Lorem Ipsum?</h2>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                          </div>
                      </div>
                  </div>
                  <div className="uk-width-1-1 uk-width-2-3@m">
                      <div className="tutorial-all">
                          <div className="uk-grid-collapse uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="true">

                              <div className="uk-padding-small uk-padding-remove-top">
                                  <div className="tutorial-main uk-card uk-card-default">
                                      <div className="uk-position-relative">
                                          <img src="./images/tutorialall.png" className="uk-width-1-1"/>
                                          <div className="tutorial-play-icon">
                                              <i data-lucide="circle-play" className="color-white uk-width-1-1"></i>
                                          </div>
                                          <div className="tutorial">
                                              <h4 className="uk-margin-remove uk-text-bold color-white">Tutorial</h4>
                                          </div>
                                      </div>
                                      <div className="uk-padding-small">
                                          <h2 className="uk-text-bold fourth-color">What is Lorem Ipsum?</h2>
                                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="uk-padding-small uk-padding-remove-top">
                                  <div className="tutorial-main uk-card uk-card-default">
                                      <div className="uk-position-relative">
                                          <img src="./images/tutorialall.png" className="uk-width-1-1"/>
                                          <div className="tutorial-play-icon">
                                              <i data-lucide="circle-play" className="color-white uk-width-1-1"></i>
                                          </div>
                                          <div className="tutorial">
                                              <h4 className="uk-margin-remove uk-text-bold color-white">Tutorial</h4>
                                          </div>
                                      </div>
                                      <div className="uk-padding-small">
                                          <h2 className="uk-text-bold fourth-color">What is Lorem Ipsum?</h2>
                                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="uk-padding-small uk-padding-remove-top">
                                  <div className="tutorial-main uk-card uk-card-default">
                                      <div className="uk-position-relative">
                                          <img src="./images/tutorialall.png" className="uk-width-1-1"/>
                                          <div className="tutorial-play-icon">
                                              <i data-lucide="circle-play" className="color-white uk-width-1-1"></i>
                                          </div>
                                          <div className="tutorial">
                                              <h4 className="uk-margin-remove uk-text-bold color-white">Tutorial</h4>
                                          </div>
                                      </div>
                                      <div className="uk-padding-small">
                                          <h2 className="uk-text-bold fourth-color">What is Lorem Ipsum?</h2>
                                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="uk-padding-small uk-padding-remove-top">
                                  <div className="tutorial-main uk-card uk-card-default">
                                      <div className="uk-position-relative">
                                          <img src="./images/tutorialall.png" className="uk-width-1-1"/>
                                          <div className="tutorial-play-icon">
                                              <i data-lucide="circle-play" className="color-white uk-width-1-1"></i>
                                          </div>
                                          <div className="tutorial">
                                              <h4 className="uk-margin-remove uk-text-bold color-white">Tutorial</h4>
                                          </div>
                                      </div>
                                      <div className="uk-padding-small">
                                          <h2 className="uk-text-bold fourth-color">What is Lorem Ipsum?</h2>
                                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                      </div>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
              <div className="uk-text-center uk-margin-top">
                  <button className="solid-button"> Explore More <i data-lucide="chevrons-right"></i></button>
              </div>
          </div>
      </div>

      {/* <!-- home blogs section --> */}

      <div className="home-blog-section">
          <div className="custom-container">
              <h2 className="uk-margin-small-bottom uk-margin-small-top uk-text-2xlarge uk-text-bold fourth-color font-size1">Blogs</h2>
              <h3 className="third-color uk-text-bold uk-margin-medium-bottom uk-margin-small-top font-size2">News & Articles</h3>
              <div className="uk-grid uk-grid-medium uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l" uk-child>
                  
                  <div className="uk-padding-small uk-padding-remove-top">
                      <div className="tutorial-main uk-card uk-card-default">
                          <div className="uk-position-relative">
                              <img src="./images/blog.png" className="uk-width-1-1"/>
                              <div className="blog-date">
                                  <h4 className="uk-margin-remove uk-text-bold color-white uk-text-large">23 Sep 2023</h4>
                              </div>
                          </div>
                          <div className="uk-padding-small">
                              <p className="uk-text-bold"><span className="main-color">Business Solution</span> / by David Dolean</p>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil reiciendis possimus nam. Dolore itaque earum fuga non neque vel asperiores!</p>
                              <div className="uk-flex uk-flex-between uk-margin-top">
                                  <button className="border-button"> All Services <i data-lucide="chevrons-right"></i> </button>
                                  <div  className="uk-flex uk-flex-bottom" >
                                      <i data-lucide="message-square-text" className="main-color"></i>
                                      <p className="main-color uk-margin-small-left">20, Comments</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="uk-padding-small uk-padding-remove-top">
                      <div className="tutorial-main uk-card uk-card-default">
                          <div className="uk-position-relative">
                              <img src="./images/blog.png" className="uk-width-1-1"/>
                              <div className="blog-date">
                                  <h4 className="uk-margin-remove uk-text-bold color-white uk-text-large">23 Sep 2023</h4>
                              </div>
                          </div>
                          <div className="uk-padding-small">
                              <p className="uk-text-bold"><span className="main-color">Business Solution</span> / by David Dolean</p>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil reiciendis possimus nam. Dolore itaque earum fuga non neque vel asperiores!</p>
                              <div className="uk-flex uk-flex-between uk-margin-top">
                                  <button className="border-button"> All Services <i data-lucide="chevrons-right"></i> </button>
                                  <div  className="uk-flex uk-flex-bottom" >
                                      <i data-lucide="message-square-text" className="main-color"></i>
                                      <p className="main-color uk-margin-small-left">20, Comments</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="uk-padding-small uk-padding-remove-top">
                      <div className="tutorial-main uk-card uk-card-default">
                          <div className="uk-position-relative">
                              <img src="./images/blog.png" className="uk-width-1-1"/>
                              <div className="blog-date">
                                  <h4 className="uk-margin-remove uk-text-bold color-white uk-text-large">23 Sep 2023</h4>
                              </div>
                          </div>
                          <div className="uk-padding-small">
                              <p className="uk-text-bold"><span className="main-color">Business Solution</span> / by David Dolean</p>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil reiciendis possimus nam. Dolore itaque earum fuga non neque vel asperiores!</p>
                              <div className="uk-flex uk-flex-between uk-margin-top">
                                  <button className="border-button"> All Services <i data-lucide="chevrons-right"></i> </button>
                                  <div  className="uk-flex uk-flex-bottom" >
                                      <i data-lucide="message-square-text" className="main-color"></i>
                                      <p className="main-color uk-margin-small-left">20, Comments</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
              <div className="uk-text-center uk-margin-top uk-margin-bottom">
                  <button className="solid-button"> Explore More <i data-lucide="chevrons-right"></i></button>
              </div>
          </div>
      </div>

    </>
  )
}
