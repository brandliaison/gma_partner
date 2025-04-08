import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "uikit/dist/css/uikit.min.css"; // Import UIkit CSS
import "./../../assets/css/themes/themes_combined.min.css";
import "./../../assets/css/main.min.css";
import "@mdi/font/css/materialdesignicons.min.css";
import UIkit from "uikit"; // Import UIkit JS
import Icons from "uikit/dist/js/uikit-icons"; // Import UIkit icons
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/home/Home";
import Login from "./auth/login/login";
import Designation from "./pages/designation/Designation";
import AddDesignation from "./pages/designation/AddDesignation";
import EditDesignation from "./pages/designation/EditDesignation";
import Roles from "./pages/roles/Roles";
import AddRoles from "./pages/roles/AddRoles";
import EditRoles from "./pages/roles/EditRoles";
import StaffManagement from "./pages/staffmanagement/StaffManagement";
import AddStaffManagement from "./pages/staffmanagement/AddStaffManagement";
import EditStaffManagement from "./pages/staffmanagement/EditStaffManagement";

// Load UIkit icons (optional)
UIkit.use(Icons);

export default function App() {
    return (
        <>
            <React.StrictMode>
                <React.Fragment>
                <Router>
                  <Routes>
                      {/* Public Routes */}
                      <Route path="/it-admin/login" element={<Login />} />

                      {/* Protected Routes (Only for Authenticated Users) */}
                      <Route path="/it-admin/*" element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="dashboard" element={<Home />} />
                            <Route path="designation" element={<Designation />} />
                            <Route path="add-designation" element={<AddDesignation />} />
                            <Route path="edit-designation/:id" element={<EditDesignation />} />
                            <Route path="roles" element={<Roles />} />
                            <Route path="add-roles" element={<AddRoles />} />
                            <Route path="edit-roles/:id" element={<EditRoles />} />
                            <Route path="staffmanagement" element={<StaffManagement />} />
                            <Route path="add-staffmanagement" element={<AddStaffManagement />} />
                            <Route path="edit-staffmanagement/:id" element={<EditStaffManagement />} />
                        </Route>
                      </Route>
                  </Routes>
                </Router>

                </React.Fragment>
            </React.StrictMode>
        </>
    );
}

// export default App
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
