import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    Building2,
    Layers,
    CalendarDays,
    BookOpen,
    ClipboardCheck,
    FileText,
    Settings,
    X,
    LogOut,
} from "lucide-react";
import moh from "../assets/images/moh.png";

function SidebarMenu({ navigate, sidebarOpen, closeSidebar, openLogoutModal }) {
    const location = useLocation();
    const role = useSelector((state) => state.admin?.role);
    const isAdmin = role === "admin";
    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <aside className={`dashboard-sidebar ${
            sidebarOpen ? "sidebar-open" : ""
        }`}>

            {/* Logo */}
            <div className="sidebar-header">

                <div className="sidebar-logo">
                    <img
                        src={moh}
                        alt="MOH"
                        className="dashboard-logo"
                    />
                    <h2>MOH</h2>
                </div>

                <button
                    type="button"
                    className="mobile-sidebar-close"
                    onClick={closeSidebar}
                >
                    <X size={20} />
                </button>

            </div>


            {/* Navigation */}
            <nav className="sidebar-nav">

                <div className="sidebar-section">
                    <p className="sidebar-section-title">
                        Main Menu
                    </p>

                    <button
                        type="button"
                        className={`sidebar-item ${
                            isActive("/dashboard") ? "active" : ""
                        }`}
                        onClick={() => navigate("/dashboard")}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </button>


                    <button
                        type="button"
                        className={`sidebar-item ${
                            isActive("/student") ? "active" : ""
                        }`}
                        onClick={() => navigate("/student")}
                    >
                        <Users size={20} />
                        <span>Students</span>
                    </button>
                </div>


                {/* Academic Management */}
                {isAdmin && (
                    <div className="sidebar-section">
                        <p className="sidebar-section-title">
                            Academic Management
                        </p>
                        <button
                            type="button"
                            className={`sidebar-item ${
                                isActive("/faculty") ? "active" : ""
                            }`}
                            onClick={() => navigate("/faculty")}
                        >
                            <GraduationCap size={20} />
                            <span>Faculty</span>
                        </button>


                        <button
                            type="button"
                            className={`sidebar-item ${
                                isActive("/department") ? "active" : ""
                            }`}
                            onClick={() => navigate("/department")}
                        >
                            <Building2 size={20} />
                            <span>Department</span>
                        </button>


                        <button
                            type="button"
                            className={`sidebar-item ${
                                isActive("/level") ? "active" : ""
                            }`}
                            onClick={() => navigate("/level")}
                        >
                            <Layers size={20} />
                            <span>Level</span>
                        </button>


                        <button
                            type="button"
                            className={`sidebar-item ${
                                isActive("/semester") ? "active" : ""
                            }`}
                            onClick={() => navigate("/semester")}
                        >
                            <CalendarDays size={20} />
                            <span>Semester</span>
                        </button>


                        <button
                            type="button"
                            className={`sidebar-item ${
                                isActive("/course") ? "active" : ""
                            }`}
                            onClick={() => navigate("/course")}
                        >
                            <BookOpen size={20} />
                            <span>Courses</span>
                        </button>
                    </div>
                )}


                <div className="sidebar-section">

                    <p className="sidebar-section-title">
                        Quick Action
                    </p>
                    <button
                        type="button"
                        className={`sidebar-item ${
                            isActive("/attendance") ? "active" : ""
                        }`}
                        onClick={() => navigate("/attendance")}
                    >
                        <ClipboardCheck size={20} />
                        <span>Attendance</span>
                    </button>


                    <button
                        type="button"
                        className={`sidebar-item ${
                            isActive("/report") ? "active" : ""
                        }`}
                        onClick={() => navigate("/report")}
                    >
                        <FileText size={20} />
                        <span>Reports</span>
                    </button>


                    <button
                        type="button"
                        className={`sidebar-item ${
                            isActive("/setting") ? "active" : ""
                        }`}
                        onClick={() => navigate("/setting")}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </div>

                <div className="sidebar-footer">
                    <button
                        type="button"
                        className="sidebar-item sidebar-logout"
                        onClick={() => {
                            closeSidebar();
                            openLogoutModal();
                        }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
}

export default SidebarMenu;