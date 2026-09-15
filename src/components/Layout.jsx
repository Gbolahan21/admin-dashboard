import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

import SidebarMenu from "./SidebarMenu";
import Modal from "./Modal";
import Button from "./Button";

function Layout() {
    const navigate = useNavigate();
    const [logoutVisible, setLogoutVisible] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const openLogoutModal = () => {
        setLogoutVisible(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/signin");
    };

    return (
        <div className="admin-layout">

            <SidebarMenu
                navigate={navigate}
                sidebarOpen={sidebarOpen}
                closeSidebar={closeSidebar}
                openLogoutModal={openLogoutModal}
            />

            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            <div className="admin-layout-content">

                <div className="mobile-header">
                    <button
                        type="button"
                        className="mobile-menu-button"
                        onClick={openSidebar}
                        aria-label="Open sidebar"
                    >
                        <Menu size={22} />
                    </button>
                </div>

                <Outlet />

            </div>
            <Modal
                open={logoutVisible}
                onClose={() => setLogoutVisible(false)}
                title="Log Out?"
            >
                <p className="logout-message">
                    Are you sure you want to log out?
                </p>

                <div className="logout-actions">
                    <Button
                        title="Stay Logged In"
                        onClick={() => setLogoutVisible(false)}
                        className="logout-cancel"
                    />

                    <Button
                        title="Log Out"
                        onClick={handleLogout}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default Layout;