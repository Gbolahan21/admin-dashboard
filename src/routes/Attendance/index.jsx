import { useEffect } from "react";
import {
  CalendarCheck,
  Users,
  UserCheck,
  CalendarX,
} from "lucide-react";

function Attendance({ getAttendance, attendance }) {
  useEffect(() => {
    document.title = "Attendance | Moh";
  }, []);

  useEffect(() => {
    getAttendance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Your attendance prop is:
  // { attendance: [...] }
  const records = attendance?.attendance || [];

  // =========================
  // Statistics
  // =========================

  const totalRecords = records.length;

  const presentRecords = records.filter(
    (record) => record.status?.toLowerCase() === "present"
  ).length;

  const absentRecords = records.filter(
    (record) => record.status?.toLowerCase() === "absent"
  ).length;

  const attendanceRate =
    totalRecords > 0
      ? Math.round((presentRecords / totalRecords) * 100)
      : 0;

  // =========================
  // Format Date
  // =========================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // =========================
  // Format Time
  // =========================

  const formatTime = (time) => {
    if (!time) return "-";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="attendance-page">

      {/* Page Header */}
      <div className="attendance-header">
        <div>
          <h1>Attendance</h1>

          <p>
            Monitor and manage student attendance records.
          </p>
        </div>

        <div className="attendance-header-icon">
          <CalendarCheck />
        </div>
      </div>

      {/* Statistics */}
      <div className="attendance-stats">

        {/* Total Records */}
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon total">
            <Users />
          </div>

          <div>
            <span>Total Records</span>
            <strong>{totalRecords}</strong>
          </div>
        </div>

        {/* Present */}
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon present">
            <UserCheck />
          </div>

          <div>
            <span>Present</span>
            <strong>{presentRecords}</strong>
          </div>
        </div>

        {/* Absent */}
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon absent">
            <CalendarX />
          </div>

          <div>
            <span>Absent</span>
            <strong>{absentRecords}</strong>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon rate">
            <CalendarCheck />
          </div>

          <div>
            <span>Attendance Rate</span>
            <strong>{attendanceRate}%</strong>
          </div>
        </div>

      </div>

      {/* Attendance Records */}
      <div className="attendance-section">
        <div className="attendance-section-header">
          <div>
            <h2>Attendance Records</h2>

            <p>
              View student attendance and check-in activity.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="attendance-toolbar">

          <div className="attendance-search">
            <input
              type="text"
              placeholder="Search student or course..."
            />
          </div>

          <button className="attendance-filter-btn">
            Filter
          </button>

        </div>

        {/* Table */}
        <div className="attendance-table-wrapper">
            {records.length === 0 ? (
                <div className="faculty-empty">
                    <div className="attendance-empty">
                        <CalendarCheck />
                        <h3>
                            No attendance records
                        </h3>
                        <p>
                            Attendance records will appear here
                            when students begin checking in.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop */}
                    <table className="attendance-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Matric No</th>
                            <th>Course Code</th>
                            <th>Course Title</th>
                            <th>Course Unit</th>
                            <th>Level</th>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                            {records.map((record, index) => (
                                <tr key={record.id}>

                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="attendance-student">
                                            <div>
                                            <strong>
                                                {record.matricNo}
                                            </strong>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="attendance-course">
                                            <strong>
                                                {record.course_code}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="attendance-course">
                                            <span>
                                                {record.course_title}
                                            </span>
                                        </div>
                                    </td>

                                        <td>
                                        <div className="attendance-course" style={{textAlign: "center"}}>
                                            <span>
                                                {record.course_unit}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="attendance-course">
                                            <span>
                                                {record.level_name}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        {formatDate(record.attendance_date)}
                                    </td>

                                    <td>
                                        {formatTime(record.check_in)}
                                    </td>

                                    <td>
                                        {formatTime(record.check_out)}
                                    </td>

                                    <td>
                                        <span
                                            className={`attendance-status ${
                                                record.status?.toLowerCase() || ""
                                            }`}
                                        >
                                            {record.status || "Unknown"}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile Cards */}
                    <div className="faculty-cards">
                        {records.map((record, index) => (
                            <div
                                className="faculty-card"
                                key={record.id}
                            >
                                <div className="faculty-card-header">
                                    <div className="faculty-card-number">
                                        #{index + 1}
                                    </div>

                                    <div className="faculty-card-name">
                                        {record.matricNo}
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Course Code</span>

                                        <strong>
                                            {record.course_code}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Course Title</span>

                                        <strong>
                                            {record.course_title}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Course Unit</span>

                                        <strong>
                                            {record.course_unit}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Level</span>

                                        <strong>
                                            {record.level_name}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Date</span>

                                        <strong>
                                            {formatDate(record.attendance_date)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Check In</span>

                                        <strong>
                                            {formatTime(record.check_in)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Check Out</span>

                                        <strong>
                                            {formatTime(record.check_out)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="faculty-card-details">
                                    <div className="faculty-card-detail">
                                        <span>Status</span>

                                        <strong>
                                            {record.status}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;