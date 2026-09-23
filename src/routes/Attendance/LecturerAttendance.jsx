import { useEffect, useState } from "react";
import {
    CalendarCheck,
    Clock,
    Play,
    Users,
    CheckCircle2,
    Square,
} from "lucide-react";

import { Button, Dropdown, Loading } from "../../components";

function LecturerAttendance({
    lecturer,
    lecturerAttendance,
    getMyCourses,
    startAttendance,
    closeAttendance,
    getActiveAttendance,
}) {
    const { myCourses = [] } = lecturer || {};

    const {
        activeSession = null,
        error = null,
    } = lecturerAttendance || {};

    const [selectedCourse, setSelectedCourse] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [closing, setClosing] = useState(false);
    const [duration, setDuration] = useState(5);
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    useEffect(() => {
        document.title = "Attendance | Moh";

        const loadAttendance = async () => {
            setIsLoading(true);

            try {
                await getMyCourses();
                await getActiveAttendance();
            } finally {
                setIsLoading(false);
            }
        };

        loadAttendance();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!activeSession?.expires_at) {
            return;
        }

        const expiresAt = new Date(
            activeSession.expires_at
        ).getTime();

        const updateCountdown = () => {
            const difference = Math.max(
                0,
                Math.floor(
                    (expiresAt - Date.now()) / 1000
                )
            );

            setRemainingSeconds(difference);
        };

        updateCountdown();

        const timer = setInterval(
            updateCountdown,
            1000
        );

        return () => clearInterval(timer);
    }, [activeSession?.expires_at]);

    useEffect(() => {
        if (!activeSession?.id) {
            return;
        }

        const interval = setInterval(() => {
            getActiveAttendance();
        }, 5000);

        return () => clearInterval(interval);
    }, [
        activeSession?.id,
        getActiveAttendance,
    ]);

    const durationOptions = [
        {
            label: "5 minutes",
            value: 5,
        },
        {
            label: "10 minutes",
            value: 10,
        },
        {
            label: "15 minutes",
            value: 15,
        },
        {
            label: "20 minutes",
            value: 20,
        },
        {
            label: "30 minutes",
            value: 30,
        },
    ];

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(minutes).padStart(
            2,
            "0"
        )}:${String(secs).padStart(2, "0")}`;
    };

    const handleCourseSelect = (courseId) => {
        setSelectedCourse(courseId);
    };

    const handleStartAttendance = () => {
        if (!selectedCourse) {
            return;
        }

        setStarting(true);

        startAttendance(
            {
                course_id: Number(selectedCourse),
                duration: duration,
            },
            () => {
                setStarting(false);
            },
            () => {
                setStarting(false);
                getActiveAttendance();
            }
        );
    };

    const handleCloseAttendance = () => {
        if (!activeSession?.id) {
            return;
        }

        setClosing(true);

        closeAttendance(
            activeSession.id,
            () => {
                setClosing(false);
            },
            () => {
                setClosing(false);
                getActiveAttendance();
            }
        );
    };

    const courseOptions = myCourses.map(
        (course) => ({
            label: `${course.course_code} - ${course.course_title}`,
            value: course.course_id,
        })
    );

    if (isLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="lecturer-attendance-container">

            {/* Header */}
            <div className="lecturer-attendance-header">

                <div className="attendance-header-content">

                    <div className="attendance-header-icon">
                        <CalendarCheck size={24} />
                    </div>

                    <div>
                        <h1>Attendance</h1>

                        <p>
                            Manage attendance sessions for
                            your registered courses.
                        </p>
                    </div>

                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="attendance-error">
                    <span>{error}</span>
                </div>
            )}

            {!activeSession ? (
                <div className="attendance-start-card">

                    <div className="attendance-start-top">

                        <div className="attendance-start-icon">
                            <Play size={22} />
                        </div>

                        <div>
                            <h2>
                                Start Attendance
                            </h2>

                            <p>
                                Select a course and open a
                                temporary attendance session
                                for your students.
                            </p>
                        </div>

                    </div>

                    <div className="attendance-form">

                        <Dropdown
                            label="Attendance Course"
                            placeholder="Select a course"
                            value={
                                courseOptions.find(
                                    (course) =>
                                        String(
                                            course.value
                                        ) ===
                                        String(
                                            selectedCourse
                                        )
                                )?.label || ""
                            }
                            options={courseOptions}
                            onSelect={
                                handleCourseSelect
                            }
                        />

                        <Dropdown
                            label="Attendance Duration"
                            placeholder="Select duration"
                            value={
                                durationOptions.find(
                                    (item) =>
                                        item.value === duration
                                )?.label || ""
                            }
                            options={durationOptions}
                            onSelect={(value) =>
                                setDuration(Number(value))
                            }
                        />

                        <div className="attendance-session-info">

                            <div className="session-info-item">
                                <Clock size={18} />

                                <div>
                                    <span>
                                        Session Duration
                                    </span>

                                    <strong>
                                        {duration} minutes
                                    </strong>
                                </div>
                            </div>

                            <div className="session-info-item">
                                <CheckCircle2 size={18} />

                                <div>
                                    <span>
                                        Attendance Method
                                    </span>

                                    <strong>
                                        Temporary Code
                                    </strong>
                                </div>
                            </div>

                        </div>

                        {!activeSession && (
                            <div className="attendance-start-action">
                                <Button
                                    type="button"
                                    disabled={!selectedCourse || starting}
                                    onClick={handleStartAttendance}
                                    title={
                                        starting
                                            ? "Starting..."
                                            : "Start Attendance"
                                    }
                                    iconLeft={<Play size={17} color="white" />}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (

                <div className="attendance-active-card">

                    {/* Active Header */}
                    <div className="active-attendance-header">

                        <div className="active-course-info">

                            <div className="active-status">
                                <span className="active-status-dot"></span>

                                Attendance is Open
                            </div>

                            <h2>
                                {activeSession.course_code}
                            </h2>

                            <p>
                                {
                                    activeSession.course_title
                                }
                            </p>

                        </div>

                        <div className="active-course-icon">
                            <CalendarCheck size={28} />
                        </div>

                    </div>

                    {/* Code */}
                    <div className="attendance-code-section">

                        <span className="attendance-code-label">
                            Attendance Code
                        </span>

                        <div className="attendance-code">
                            {activeSession.session_code
                                ?.split("")
                                .map(
                                    (
                                        digit,
                                        index
                                    ) => (
                                        <span
                                            key={
                                                index
                                            }
                                        >
                                            {digit}
                                        </span>
                                    )
                                )}
                        </div>

                        <p className="attendance-code-help">
                            Students should enter this
                            code on their phones to mark
                            their attendance.
                        </p>

                    </div>

                    {/* Stats */}
                    <div className="attendance-info-grid">

                        <div className="attendance-stat-card">

                            <div className="attendance-stat-icon">
                                <Clock size={20} />
                            </div>

                            <div>
                                <span>
                                    Expires In
                                </span>

                                <strong
                                    className={
                                        remainingSeconds <=
                                        60
                                            ? "attendance-time-warning"
                                            : ""
                                    }
                                >
                                    {formatTime(
                                        remainingSeconds
                                    )}
                                </strong>
                            </div>

                        </div>

                        <div className="attendance-stat-card">

                            <div className="attendance-stat-icon">
                                <Users size={20} />
                            </div>

                            <div>
                                <span>
                                    Present
                                </span>

                                <strong>
                                    {activeSession?.present_count || 0}
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/* Close */}
                    <div className="attendance-close-action">

                        <Button
                            type="button"
                            disabled={closing}
                            onClick={
                                handleCloseAttendance
                            }
                            title={closing ? "Closing..." : "Close Attendance"}
                            iconLeft={<Square size={17} color="white" />}
                        />

                    </div>

                </div>
            )}

            {/* Empty courses */}
            {!activeSession &&
                myCourses.length === 0 && (
                    <div className="attendance-empty">

                        <div className="attendance-empty-icon">
                            <Users size={25} />
                        </div>

                        <h3>
                            No Registered Courses
                        </h3>

                        <p>
                            You need to register a course
                            before you can take attendance.
                        </p>

                    </div>
                )}

        </div>
    );
}

export default LecturerAttendance;