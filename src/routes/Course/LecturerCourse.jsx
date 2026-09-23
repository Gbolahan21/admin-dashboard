import { useEffect, useState } from "react";
import { Trash2, BookOpen } from "lucide-react";
import { Button, Modal, Dropdown } from "../../components";


function LecturerCourse({
    getCurrentSemester,
    getLecturerFaculties,
    getDepartmentsByFaculty,
    getLecturerLevels,
    getAvailableCourses,
    getMyCourses,
    registerCourses,
    removeCourseRegistration,
    currentSemester,
    faculties,
    departments,
    levels,
    availableCourses,
    myCourses,
}) {

    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    console.log(showRemoveModal)

    useEffect(() => {
      document.title = 'Lecturer | Moh';
    }, []);

    useEffect(() => {
        getCurrentSemester();
        getLecturerFaculties();
        getLecturerLevels();
        getMyCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFacultySelect = (facultyId) => {
        setSelectedFaculty(facultyId);
        setSelectedDepartment("");
        setSelectedLevel("");
        setSelectedCourses([]);

        if (facultyId) {
            getDepartmentsByFaculty(facultyId);
        }
    };

    const handleDepartmentSelect = (departmentId) => {
        setSelectedDepartment(departmentId);
        setSelectedLevel("");
        setSelectedCourses([]);
    };

    const handleLevelSelect = (levelId) => {
        setSelectedLevel(levelId);
        setSelectedCourses([]);

        if (!selectedFaculty || !selectedDepartment || !levelId) {
            return;
        }

        getAvailableCourses(
            {
                faculty_id: Number(selectedFaculty),
                department_id: Number(selectedDepartment),
                level_id: Number(levelId),
            },
            (error) => {
                console.error("Available courses error:", error);
            }
        );
    };

    const handleCourseSelect = (courseId) => {
        setSelectedCourses((prev) => {
            if (prev.includes(courseId)) {
                return prev.filter((id) => id !== courseId);
            }

            return [...prev, courseId];
        });
    };

    const handleRegisterCourses = () => {
        if (!selectedCourses.length) {
            return;
        }

        registerCourses(
            {
                faculty_id: selectedFaculty,
                department_id: selectedDepartment,
                level_id: selectedLevel,
                course_ids: selectedCourses,
            },
            () => {},
            () => {
                setSelectedCourses([]);
                getMyCourses();
                getAvailableCourses({
                    faculty_id: Number(selectedFaculty),
                    department_id: Number(selectedDepartment),
                    level_id: Number(selectedLevel),
                });
            }
        );
    };

    const handleOpenRemoveModal = (course) => {
        setSelectedCourse(course);
        setShowRemoveModal(true);
    };

    const handleRemoveCourse = () => {
        if (!selectedCourse) {
            return;
        }

        removeCourseRegistration(
            selectedCourse.registration_id,
            () => {},
            () => {
                setShowRemoveModal(false);
                setSelectedCourse(null);
                getMyCourses();
            }
        );
    };

    const facultyOptions = faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
    }));

    const departmentOptions = departments.map((department) => ({
        label: department.name,
        value: department.id,
    }));

    const levelOptions = levels.map((level) => ({
        label: level.name,
        value: level.id,
    }));

    const selectedFacultyName =
        faculties.find(
            (faculty) =>
                Number(faculty.id) === Number(selectedFaculty)
        )?.name || "";

    const selectedDepartmentName =
        departments.find(
            (department) =>
                Number(department.id) === Number(selectedDepartment)
        )?.name || "";

    const selectedLevelName =
        levels.find(
            (level) =>
                Number(level.id) === Number(selectedLevel)
        )?.name || "";

    return (
        <div className="faculty-page lecturer-course-page">

            {/* Header */}
            <div className="page-header">
                <div>
                    <h2>My Courses</h2>
                    <p>
                        Register and manage the courses you teach.
                    </p>
                </div>
            </div>

            {/* Current Semester */}
            <div className="course-semester-card">
                <div className="course-semester-icon">
                    <BookOpen size={22} />
                </div>

                <div>
                    <span>Current Semester</span>

                    <strong>
                        {currentSemester?.name ||
                            "No current semester set"}
                    </strong>
                </div>
            </div>

            {/* Course Registration */}
            <div className="course-registration-card">

                <div className="section-header">
                    <div>
                        <h3>Register Courses</h3>
                        <p>
                            Select your faculty, department and level
                            to view available courses.
                        </p>
                    </div>
                </div>

                <div className="course-filter-grid">

                    {/* Faculty */}
                    <Dropdown
                        label="Faculty"
                        placeholder="Select faculty"
                        value={selectedFacultyName}
                        options={facultyOptions}
                        onSelect={handleFacultySelect}
                    />

                    {/* Department */}
                    <Dropdown
                        label="Department"
                        placeholder="Select department"
                        value={selectedDepartmentName}
                        options={departmentOptions}
                        onSelect={handleDepartmentSelect}
                    />

                    {/* Level */}
                    <Dropdown
                        label="Level"
                        placeholder="Select level"
                        value={selectedLevelName}
                        options={levelOptions}
                        onSelect={handleLevelSelect}
                    />

                </div>

                {/* Available Courses */}
                {selectedFaculty &&
                    selectedDepartment &&
                    selectedLevel && (
                        <div className="available-courses-section">

                            <div className="section-title-row">
                                <div>
                                    <h4>Available Courses</h4>

                                    <span>
                                        {selectedCourses.length} selected
                                    </span>
                                </div>
                            </div>

                            {availableCourses.length === 0 ? (
                                <div className="empty-courses">
                                    <BookOpen size={28} />

                                    <p>
                                        No courses are available for
                                        this selection.
                                    </p>
                                </div>
                            ) : (
                                <div className="available-course-list">

                                    {availableCourses.map((course) => {
                                        const isSelected =
                                            selectedCourses.includes(
                                                Number(course.id)
                                            );

                                        return (
                                            <div
                                                key={course.id}
                                                className={`available-course-item ${
                                                    isSelected
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleCourseSelect(
                                                        Number(course.id)
                                                    )
                                                }
                                            >
                                                <div className="course-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            handleCourseSelect(
                                                                Number(course.id)
                                                            )
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    />
                                                </div>

                                                <div className="course-info">
                                                    <strong>
                                                        {
                                                            course.course_code
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            course.course_title
                                                        }
                                                    </span>
                                                </div>

                                                <div className="course-unit">
                                                    {course.course_unit}{" "}
                                                    Unit
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Register Button */}
                            {availableCourses.length > 0 && (
                                <div className="register-course-actions">
                                    <Button
                                        type="button"
                                        disabled={
                                            selectedCourses.length === 0
                                        }
                                        onClick={
                                            handleRegisterCourses
                                        }
                                        title="Register Selected Courses"
                                    />
                                </div>
                            )}

                        </div>
                    )}
            </div>

            {/* My Registered Courses */}
            <div className="my-courses-card">

                <div className="section-header">
                    <div>
                        <h3>My Registered Courses</h3>
                        <p>
                            Courses you have registered for in the
                            current semester.
                        </p>
                    </div>

                    <span className="course-count">
                        {myCourses.length}{" "}
                        {myCourses.length === 1
                            ? "Course"
                            : "Courses"}
                    </span>
                </div>

                {myCourses.length === 0 ? (
                    <div className="empty-courses">
                        <BookOpen size={28} />

                        <p>
                            You have not registered any courses yet.
                        </p>
                    </div>
                ) : (
                    <div className="my-course-table-wrapper">

                        <table className="my-course-table">

                            <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Course Title</th>
                                    <th>Unit</th>
                                    <th>Faculty</th>
                                    <th>Department</th>
                                    <th>Level</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {myCourses.map((course) => (
                                    <tr key={course.registration_id}>

                                        <td>
                                            <strong>
                                                {
                                                    course.course_code
                                                }
                                            </strong>
                                        </td>

                                        <td>
                                            {
                                                course.course_title
                                            }
                                        </td>

                                        <td>
                                            {
                                                course.course_unit
                                            }
                                        </td>

                                        <td>
                                            {
                                                course.faculty_name
                                            }
                                        </td>

                                        <td>
                                            {
                                                course.department_name
                                            }
                                        </td>

                                        <td>
                                            {
                                                course.level_name
                                            }
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="remove-course-btn"
                                                onClick={() =>
                                                    handleOpenRemoveModal(
                                                        course
                                                    )
                                                }
                                            >
                                                <Trash2
                                                    size={17}
                                                />
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* Remove Course Modal */}
            <Modal
                open={showRemoveModal}
                onClose={() => {
                    setShowRemoveModal(false);
                    setSelectedCourse(null);
                }}
                title="Remove Course"
            >
                <div className="remove-course-modal">

                    <p>
                        Are you sure you want to remove{" "}
                        <strong>
                            {selectedCourse?.course_code}
                        </strong>{" "}
                        from your registered courses?
                    </p>

                    <div className="remove-course-modal-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setShowRemoveModal(false);
                                setSelectedCourse(null);
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="confirm-remove-btn"
                            onClick={handleRemoveCourse}
                        >
                            <Trash2 size={16} />
                            Remove Course
                        </button>

                    </div>

                </div>
            </Modal>

        </div>
    );
}

export default LecturerCourse;