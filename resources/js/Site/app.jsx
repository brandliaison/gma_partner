import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'uikit/dist/css/uikit.min.css'; // Import UIkit CSS
import UIkit from 'uikit'; // Import UIkit JS
import Icons from 'uikit/dist/js/uikit-icons'; // Import UIkit icons
import About from './pages/About';
import Home from './pages/Home';
import Header from './layout/header/Header';
import './../../../resources/css/style.css'; // my default styles of fornt end
import Footer from './layout/footer/Footer';
import Services from './pages/Services';
import Notification from './pages/Notification';
import Tutorial from './pages/Tutorial';
import apiClient from './frontservices/api';
import ServicePartnerForm from './pages/Forms/ServicePartnerForm';
import ServicePartnerOtp from './pages/Forms/ServicePartnerOtp';
import ServicePartnerDetails from './pages/Forms/ServicePartnerDetails';
import ChannelPartnerForm from './pages/Forms/ChannelPartnerForm';
import ChannelPartnerOtp from './pages/Forms/ChannelPartnerOtp';
import ChannelPartnerDetails from './pages/Forms/ChannelPartnerDetails';
import Career from './pages/Career';

// Load UIkit icons (optional)
UIkit.use(Icons);

function App() {

  const [layoutdata, sdetlayoutdata] = useState([]);

  useEffect(() => {
    layoutcall();
  }, []);

  const layoutcall = () => {
    apiClient.get('/header-footer').then((response) => {
      sdetlayoutdata(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Router>
      <Header header={layoutdata}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/tutorial" element={<Tutorial />} />

        {/* Service Partner Forms */}
        <Route path="/service-partner-registraton" element={<ServicePartnerForm />} />
        <Route path="/service-verify-otp" element={<ServicePartnerOtp />} />
        <Route path="/service-partner-details" element={<ServicePartnerDetails />} />

        {/* Channel Partner Forms */}
        <Route path="/channel-partner-registraton" element={<ChannelPartnerForm />} />
        <Route path="/channel-verify-otp" element={<ChannelPartnerOtp />} />
        <Route path="/channel-partner-details" element={<ChannelPartnerDetails />} />

        {/* Career */}

        <Route path="/career" element={<Career />} />
      </Routes>
      <Footer footer={layoutdata}/>
    </Router>
  )
}

// export default App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
