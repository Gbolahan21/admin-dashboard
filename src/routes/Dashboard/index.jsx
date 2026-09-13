import { useEffect, useState } from "react";
import {
    Users,
    CalendarCheck,
    CalendarX,
    TrendingUp,
    ArrowRight,
    Download,
    LogOut,
} from "lucide-react";

import {Button, Modal, Loading} from "../../components";

import moh from "../../assets/images/moh.png";

function Dashboard({ dashboard, getDashboardStats, navigate, admin }) {
    const [logoutVisible, setLogoutVisible] = useState(false);
    const { firstname, title } = admin;

    const { stats, loading, error } = dashboard;
    const isLoading = loading.includes("/admin/dashboard");

    useEffect(() => {
      document.title = 'Dashboard | Moh';
    }, []);

    useEffect(() => {
        getDashboardStats();
    }, [getDashboardStats]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student");

        navigate('/signin');
    };

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 16) return "Good Afternoon";

        return "Good Evening";
    };

    if (isLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="dashboard-container">

            {/* Navbar */}
            <header className="dashboard-navbar">

                <img
                    src={moh}
                    alt="MOH"
                    className="dashboard-logo"
                />

                <button
                    type="button"
                    className="logout-button"
                    onClick={() => setLogoutVisible(true)}
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>

            </header>


            {/* Content */}
            <main className="dashboard-content">

                <div className="dashboard-header">

                    <div>
                        <h1>
                            {getGreeting()} 👋
                        </h1>

                        <p>
                            Welcome back, {title} {firstname}
                        </p>
                    </div>

                </div>


                {/* Error */}
                {error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}


                {/* Statistics */}
                <div className="summary-container">

                    <div className="summary-card">

                        <div className="summary-icon">
                            <Users size={22} />
                        </div>

                        <div>
                            <p className="summary-title">
                                Students
                            </p>

                            <h2 className="summary-value">
                                {stats.totalStudents}
                            </h2>
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon">
                            <CalendarCheck size={22} />
                        </div>

                        <div>
                            <p className="summary-title">
                                Present Today
                            </p>

                            <h2 className="summary-value">
                                {stats.presentToday}
                            </h2>
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon">
                            <CalendarX size={22} />
                        </div>

                        <div>
                            <p className="summary-title">
                                Absent Today
                            </p>

                            <h2 className="summary-value">
                                {stats.absentToday}
                            </h2>
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon">
                            <TrendingUp size={22} />
                        </div>

                        <div>
                            <p className="summary-title">
                                Attendance Rate
                            </p>

                            <h2 className="summary-value">
                                {`${stats.attendanceRate}%`}
                            </h2>
                        </div>

                    </div>

                </div>


                {/* Quick Actions */}
                <section className="quick-actions">

                    <h2 className="section-title">
                        Quick Actions
                    </h2>


                    <div className="actions-grid">

                        <Button
                            title="View Students"
                            iconRight={
                                <ArrowRight size={18} color="white" />
                            }
                            onClick={() =>
                                navigate("/student")
                            }
                        />


                        <Button
                            title="Today's Attendance"
                            iconRight={
                                <ArrowRight size={18} color="white" />
                            }
                            onClick={() =>
                                navigate("/attendance/today")
                            }
                        />


                        <Button
                            title="Attendance Analytics"
                            iconRight={
                                <ArrowRight size={18} color="white" />
                            }
                            onClick={() =>
                                navigate("/attendance/analytics")
                            }
                        />


                        <Button
                            title="Export Reports"
                            iconRight={
                                <Download size={18} color="white" />
                            }
                            onClick={() =>
                                navigate("/report")
                            }
                        />

                    </div>

                </section>

            </main>

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

export default Dashboard;
