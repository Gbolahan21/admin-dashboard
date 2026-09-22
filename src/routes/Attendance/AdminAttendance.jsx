import { useCallback, useEffect, useState } from "react";
import {
  CalendarCheck,
  Users,
  UserCheck,
  CalendarX,
  Eye,
  MoreVertical
} from "lucide-react";
import {Button, Modal, Dropdown} from '../../components'

function AdminAttendance({ getAttendance, attendance, level, student, getRegCourses, getLevels }) {
  const { reg_courses } = student;
  const { levels } = level;
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [attendanceViewVisible, setAttendanceViewVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [filterDraft, setFilterDraft] = useState({
    status: "",
    level: "",
    course: "",
    date: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    level: "",
    course: "",
    date: "",
  });

  useEffect(() => {
    document.title = "Attendance | Moh";
  }, []);

  useEffect(() => {
    getAttendance();
    getRegCourses();
    getLevels();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const records = attendance?.attendance || [];

  const filteredRecords = records.filter((record) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
        !searchValue ||
        record.level_name?.toLowerCase().includes(searchValue) ||
        record.course_code?.toLowerCase().includes(searchValue)

    const matchesStatus =
        !appliedFilters.status ||
        record.status?.toLowerCase() === appliedFilters.status.toLowerCase();

    const matchesLevel =
        !appliedFilters.level ||
        record.level_name?.toLowerCase() === appliedFilters.level.toLowerCase();

    const matchesCourse =
        !appliedFilters.course ||
        record.course_code === appliedFilters.course;

    const matchesDate =
        !appliedFilters.date ||
        record.attendance_date?.split("T")[0] === appliedFilters.date;

    return (
        matchesSearch &&
        matchesStatus &&
        matchesLevel &&
        matchesCourse &&
        matchesDate
    );
  });

  const updateFilter = (name, value) => {
    setFilterDraft((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const clearFilters = () => {
    const emptyFilters = {
        status: "",
        level: "",
        course: "",
        date: "",
    };

    setSearch("");
    setFilterDraft(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const applyFilters = () => {
    setAppliedFilters(filterDraft);
    setFilterVisible(false);
  };

  const closeModal = useCallback(() => {
    setFilterVisible(false);
    setFilterDraft(appliedFilters);
  }, [appliedFilters]);

  const openModal = useCallback(() => {
    setFilterVisible(true);
  }, []);

  const openAttendanceView = (record) => {
    setSelectedAttendance(record);
    setAttendanceViewVisible(true);
  };

  const closeAttendanceView = () => {
    setSelectedAttendance(null);
    setAttendanceViewVisible(false);
  };

  const openActionModal = (record) => {
    setSelectedAttendance(record);
    setActionVisible(true);
  };

  const closeActionModal = () => {
    setActionVisible(false);
    setSelectedAttendance(null);
  };

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  const totalRecords = filteredRecords.length;

  const presentRecords = filteredRecords.filter(
    (record) => record.status?.toLowerCase() === "present"
  ).length;

  const absentRecords = filteredRecords.filter(
    (record) => record.status?.toLowerCase() === "absent"
  ).length;

  const attendanceRate =
    totalRecords > 0
      ? Math.round((presentRecords / totalRecords) * 100)
      : 0;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
              value={search}
              onChange={handleSearch}
              placeholder="Search course_code or level"
            />
          </div>

          <button className="attendance-filter-btn" onClick={openModal}>
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="faculty-table-container">
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
            ) : filteredRecords.length === 0 ? (
                <div className="faculty-empty">
                    <div className="attendance-empty">
                        <h3>No matching records</h3>
                        <p>
                            No attendance records match your search or
                            selected filters.
                        </p>

                        <Button
                            title="Clear"
                            type="button"
                            onClick={clearFilters}
                        />
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop */}
                    <table className="faculty-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Matric No</th>
                                <th>Course Code</th>
                                <th>Level</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRecords.map((record, index) => (
                                <tr key={record.id}>

                                    <td>{index + 1}</td>

                                    <td>
                                        {record.matricNo}
                                    </td>

                                    <td>
                                        {record.course_code}
                                    </td>

                                    <td>
                                        {record.level_name}
                                    </td>

                                    <td>
                                        {record.status || "Unknown"}
                                    </td>  

                                    {/* <td>
                                        <button
                                            type="button"
                                            className="faculty-action-button"
                                            onClick={() => openAttendanceView(record)}
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                    </td> */}
                                    <td>
                                        <button
                                            type="button"
                                            className="attendance-action-button"
                                            onClick={() => openActionModal(record)}
                                            aria-label="Attendance actions"
                                        >
                                            <MoreVertical size={19} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile Cards */}
                    <div className="faculty-cards">
                        {filteredRecords.map((record, index) => (
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
                                        <span>Level</span>

                                        <strong>
                                            {record.level_name}
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

                                <div className="faculty-card-actions">
                                    <button
                                        type="button"
                                        className="faculty-action-button"
                                        onClick={() => openAttendanceView(record)}
                                    >
                                        <Eye size={16} />
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
      </div>

      {/* Filter Modal */}
      <Modal
            open={filterVisible}
            onClose={closeModal}
            title="Filter Attendance"
        >
            <div className="faculty-form-group">
                <Dropdown
                    label="Status"
                    placeholder="Select Status"
                    value={filterDraft.status}
                    onSelect={(value) => updateFilter("status", value)}
                    options={[
                        { label: "All", value: "All" },
                        { label: "Present", value: "Present" },
                        { label: "Absent", value: "Absent" },
                    ]}
                />
            </div>

            <div className="faculty-form-group">
                <Dropdown
                    label="Course"
                    placeholder="Select Course"
                    value={filterDraft.course}
                    onSelect={(value) => updateFilter("course", value)}
                    options={reg_courses.map((reg_course) => ({
                        value: String(reg_course.course_code),
                        label: reg_course.course_code,
                    }))}
                />
            </div>

            <div className="faculty-form-group">
                <Dropdown
                    label="Level"
                    placeholder="Select Level"
                    value={filterDraft.level}
                    onSelect={(value) => updateFilter("level", value)}
                    options={levels.map((level) => ({
                        value: String(level.name),
                        label: level.name,
                    }))}
                />
            </div>

           <div className="attendance-filter-date">
                <label htmlFor="attendance-date">
                    Date
                </label>

                <div className="attendance-date-input">
                    <CalendarCheck size={18} />

                    <input
                        id="attendance-date"
                        type="date"
                        value={filterDraft.date}
                        onChange={(e) =>
                            updateFilter("date", e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="faculty-modal-actions">
                <button
                    type="button"
                    className="faculty-cancel-button"
                    onClick={closeModal}
                >
                    Reset
                </button>

                <button
                    type="submit"
                    className="faculty-save-button"
                    onClick={applyFilters}
                >
                    Apply
                </button>
            </div>
      </Modal>

      {/* View Attendance Modal */}
      <Modal
        open={attendanceViewVisible}
        onClose={closeAttendanceView}
        title="Student Details"
      >
        {selectedAttendance && (
            <div className="student-details">
                {/* Student Information */}
                <div className="student-details-section">

                    <h3>Student Information</h3>

                    <div className="student-details-grid">

                        <div className="student-detail">
                            <span>Matric No</span>
                            <strong>
                                {selectedAttendance.matricNo || "N/A"}
                            </strong>
                        </div>

                        <div className="student-detail">
                            <span>Level</span>
                            <strong>
                                {selectedAttendance.level_name || "N/A"}
                            </strong>
                        </div>
                    </div>
                </div>


                {/* Course Information */}
                <div className="student-details-section">

                    <h3>Course Information</h3>

                    <div className="student-details-grid">

                        <div className="student-detail">
                            <span>Course Code</span>
                            <strong>
                                {selectedAttendance.course_code || "N/A"}
                            </strong>
                        </div>

                        <div className="student-detail">
                            <span>Course Title</span>
                            <strong>
                                {selectedAttendance.course_title || "N/A"}
                            </strong>
                        </div>

                        <div className="student-detail">
                            <span>Course Unit</span>
                            <strong>
                                {selectedAttendance.course_unit || "N/A"}
                            </strong>
                        </div>
                    </div>
                </div>


                {/* Attendance Information */}
                <div className="student-details-section">

                    <h3>Attendance Information</h3>

                    <div className="student-details-grid">

                        <div className="student-detail">
                            <span>Status</span>
                            <strong>
                                {selectedAttendance.status || "N/A"}
                            </strong>
                        </div>

                        <div className="student-detail">
                            <span>Check In</span>
                            <strong>
                                {formatTime(selectedAttendance.check_in) || "N/A"}
                            </strong>
                        </div>

                        <div className="student-detail">
                            <span>Check Out</span>
                            <strong>
                                {formatTime(selectedAttendance.check_out) || "N/A"}
                            </strong>
                        </div>

                        <div className="student-detail">
                            <span>Date</span>
                            <strong>
                                {formatDate(selectedAttendance.attendance_date) || "N/A"}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </Modal>

      {/* Action Modal */}
      <Modal
        open={actionVisible}
        onClose={closeActionModal}
        title="Attendance Actions"
      >
        {selectedAttendance && (
            <div className="attendance-action-modal">

            <div className="attendance-action-record">
                <strong>
                {selectedAttendance.matricNo}
                </strong>

                <span>
                {selectedAttendance.course_code} -{" "}
                {selectedAttendance.course_title}
                </span>
            </div>

            <div className="attendance-action-list">

                {/* View */}
                <button
                    type="button"
                    className="attendance-action-item"
                    onClick={() => {
                        closeActionModal();
                        openAttendanceView(selectedAttendance);
                    }}
                >
                <div className="attendance-action-item-icon">
                    <CalendarCheck size={18} />
                </div>

                <div>
                    <strong>View Attendance</strong>

                    <span>
                        View complete attendance details
                    </span>
                </div>
                </button>

                {/* Edit - we'll implement this next */}
                {/* <button
                type="button"
                className="attendance-action-item"
                onClick={() => {
                    closeActionModal();
                    // Edit attendance will be added here
                }}
                >
                <div className="attendance-action-item-icon">
                    <UserCheck size={18} />
                </div>

                <div>
                    <strong>Edit Attendance</strong>

                    <span>
                    Update attendance information
                    </span>
                </div>
                </button> */}
            </div>
            </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminAttendance;