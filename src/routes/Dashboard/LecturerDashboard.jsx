import { useEffect, useState } from "react";
import {
    BookOpen,
    Users,
    CalendarCheck,
    TrendingUp,
} from "lucide-react";

import { Loading } from "../../components";

function LecturerDashboard({
    admin,
    lecturerDashboard,
    getLecturerDashboardStats,
}) {
    const [isDashboardLoading, setIsDashboardLoading] =
        useState(true);

    const { firstname } = admin;

    const {
        stats,
        error,
    } = lecturerDashboard || {};

    useEffect(() => {
        document.title = "Lecturer Dashboard | Moh";
    }, []);

    useEffect(() => {
        const loadDashboard = async () => {
            setIsDashboardLoading(true);

            const startTime = Date.now();

            try {
                await getLecturerDashboardStats();
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
                        Welcome back, {firstname}
                    </p>

                    {error && (
                        <div className="dashboard-error">
                            {error}
                        </div>
                    )}

                    {/* Statistics */}
                    <div className="summary-container">

                        {/* My Courses */}
                        <div className="summary-card">
                            <div className="summary-icon">
                                <BookOpen size={22} />
                            </div>

                            <div>
                                <p className="summary-title">
                                    My Courses
                                </p>

                                <h2 className="summary-value">
                                    {stats?.totalCourses || 0}
                                </h2>
                            </div>
                        </div>

                        {/* Students */}
                        <div className="summary-card">
                            <div className="summary-icon">
                                <Users size={22} />
                            </div>

                            <div>
                                <p className="summary-title">
                                    Students
                                </p>

                                <h2 className="summary-value">
                                    {stats?.totalStudents || 0}
                                </h2>
                            </div>
                        </div>

                        {/* Present Today */}
                        <div className="summary-card">
                            <div className="summary-icon">
                                <CalendarCheck size={22} />
                            </div>

                            <div>
                                <p className="summary-title">
                                    Present Today
                                </p>

                                <h2 className="summary-value">
                                    {stats?.presentToday || 0}
                                </h2>
                            </div>
                        </div>

                        {/* Attendance Rate */}
                        <div className="summary-card">
                            <div className="summary-icon">
                                <TrendingUp size={22} />
                            </div>

                            <div>
                                <p className="summary-title">
                                    Attendance Rate
                                </p>

                                <h2 className="summary-value">
                                    {`${stats?.attendanceRate || 0}%`}
                                </h2>
                            </div>
                        </div>

                    </div>

                    {/* My Courses */}
                    <div className="dashboard-section">

                        <div className="dashboard-section-header">
                            <div>
                                <h2>My Courses</h2>

                                <p>
                                    Courses you are currently teaching.
                                </p>
                            </div>

                            <span>
                                {stats?.totalCourses || 0}{" "}
                                {stats?.totalCourses === 1
                                    ? "Course"
                                    : "Courses"}
                            </span>
                        </div>

                        {stats?.courses?.length > 0 ? (
                            <div className="dashboard-table-wrapper">

                                <table className="dashboard-table">

                                    <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Title</th>
                                            <th>Unit</th>
                                            <th>Department</th>
                                            <th>Level</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {stats.courses.map((course) => (
                                            <tr key={course.registration_id}>
                                                <td>
                                                    <strong>
                                                        {course.course_code}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {course.course_title}
                                                </td>

                                                <td>
                                                    {course.course_unit}
                                                </td>

                                                <td>
                                                    {course.department_name}
                                                </td>

                                                <td>
                                                    {course.level_name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>

                            </div>
                        ) : (
                            <div className="dashboard-empty">
                                <BookOpen size={28} />

                                <p>
                                    You have not registered any courses
                                    yet.
                                </p>
                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}

export default LecturerDashboard;