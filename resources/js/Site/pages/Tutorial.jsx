import React from 'react'

export default function Tutorial() {
  return (
    <>
    
    {/* <!-- turorial top banner section --> */}

    <div class="services-top-banner uk-position-relative">
      <img src="./images/servicebanner.png" class="uk-width-1-1"/>
      <div class="inner-page-banner">
        <h2>Tutorials</h2>
      </div>
    </div>

    {/* <!-- turorial main section --> */}

    <div class="services-main uk-padding-large uk-padding-remove-horizontal">
      <div class="custom-container">
        <div class="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l" uk-grid>
 
        </div>
      </div>
    </div>

    {/* <!-- query banner --> */}

    <div class="home-query-banner">
        <div class="custom-container">
              <div class="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@l uk-flex-bottom" uk-grid>
                  <div>
                      <img src="./images/querybanner.png" />
                  </div>
                  <div class="uk-text-center">
                      <h1 class="color-white uk-text-bold">Help For Compliance Solution</h1>
                      <h2 class="uk-margin-remove color-white uk-text-bold">Join Us as a Industry Partner</h2>
                      <img src="./images/icons/phone.png" />
                      <h3 class="color-white uk-text-large uk-margin-remove">CALL US 24/7</h3>
                      <h3 class="uk-margin-small-vertical uk-text-large color-white uk-text-bold">+91-8130615678</h3>
                      <button class="border-button uk-margin-large-bottom"> Contact Us <i data-lucide="chevrons-right"></i></button>
                  </div>
              </div>
        </div>
    </div>

    </>
  )
}
