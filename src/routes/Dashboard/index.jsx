import { useEffect, useState } from "react";
import {
    Users,
    CalendarCheck,
    CalendarX,
    TrendingUp,
} from "lucide-react";

import {Button, Modal, Loading} from "../../components";

function Dashboard({ dashboard, getDashboardStats, navigate, admin }) {
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [isDashboardLoading, setIsDashboardLoading] = useState(true);
    const { firstname, title } = admin;

    const { stats, error } = dashboard;

    useEffect(() => {
      document.title = 'Dashboard | Moh';
    }, []);

    useEffect(() => {
        const loadDashboard = async () => {
            setIsDashboardLoading(true);

            const startTime = Date.now();

            try {
                await getDashboardStats();
            } finally {
                const elapsed = Date.now() - startTime;
                const minimumTime = 1000;

                const remainingTime = minimumTime - elapsed;

                if (remainingTime > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, remainingTime)
                    );
                }

                setIsDashboardLoading(false);
            }
        };

        loadDashboard();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate('/signin');
    };

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 16) return "Good Afternoon";

        return "Good Evening";
    };

    if (isDashboardLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="dashboard-container">

            <div className="dashboard-main">
                <header className="dashboard-navbar">
                    <div className="dashboard-header">
                        <div>
                            <h1>
                                {getGreeting()} 👋
                            </h1>
                        </div>
                    </div>
                </header>


                <main className="dashboard-content">
                    <p>
                        Welcome back, {title} {firstname}
                    </p>

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
                </main>
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

export default Dashboard;
