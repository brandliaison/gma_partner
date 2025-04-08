import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

export default function AdminLayout() {
    return (
        <>
            <Header />
            <div className="admin-layout">
                <Sidebar />
                <div className="content">
                    <Outlet /> {/* This renders child pages */}
                </div>
            </div>
        </>
    );
}
