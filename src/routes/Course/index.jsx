import { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

import { Modal, Pagination, Dropdown, Loading } from "../../components";

function Course({
    level,
    department,
    semester,
    course,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getDepartments,
    getLevels,
    getSemesters,
}) {
    const { levels } = level;
    const { semesters } = semester;
    const { courses } = course;
    const { departments } = department;

    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [courseCode, setCourseCode] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [courseUnit, setCourseUnit] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isCourseLoading, setIsCourseLoading] = useState(true);
    const [editingCourse, setEditingCourse] = useState(null);
    const [deletingCourse, setDeletingCourse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "Course | Moh";
    }, []);

    useEffect(() => {
        const loadCourse = async () => {
            setIsCourseLoading(true);

            const startTime = Date.now();

            try {
                await getLevels();
                await getSemesters();
                await getCourses();
                await getDepartments();
            } finally {
                const elapsed = Date.now() - startTime;
                const minimumTime = 1000;

                const remainingTime = minimumTime - elapsed;

                if (remainingTime > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, remainingTime)
                    );
                }

                setIsCourseLoading(false);
            }
        };

        loadCourse();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   const openEditModal = (course) => {
        setEditingCourse(course);
        setCourseCode(course.course_code);
        setCourseTitle(course.course_title);
        setCourseUnit(String(course.course_unit ?? ""));
        setSelectedLevel(String(course.level_id));
        setSelectedDepartment(String(course.department_id));
        setSelectedSemester(String(course.semester_id));
        setModalVisible(true);
    };

    const openAddModal = () => {
        setEditingCourse(null);
        setCourseCode("");
        setCourseTitle("");
        setCourseUnit("");
        setSelectedLevel("");
        setSelectedDepartment("");
        setSelectedSemester("");
        setModalVisible(true);
    };

    const closeModal = () => {
        if (isSubmitting) return;

        setModalVisible(false);
        setCourseCode("");
        setCourseTitle("");
        setCourseUnit("");
        setSelectedLevel("");
        setSelectedDepartment("");
        setSelectedSemester("");
        setEditingCourse(null);
    };

    const openDeleteModal = (course) => {
        setDeletingCourse(course);
    };

    const closeDeleteModal = () => {
        if (isSubmitting) return;

        setDeletingCourse(null);
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const code = courseCode.trim();
        const title = courseTitle.trim();
        const unit = Number(courseUnit);

        if (!code || !title || !courseUnit || unit < 1 || unit > 6 || !selectedLevel || !selectedDepartment || !selectedSemester) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingCourse) {
                await updateCourse(
                    editingCourse.id,
                    code,
                    title,
                    unit,
                    Number(selectedDepartment),
                    Number(selectedLevel),
                    Number(selectedSemester),
                    (error) => {
                        console.error(
                            "Update course error:",
                            error
                        );
                    },
                    () => {
                        closeModal();
                    }
                );
            } else {
                await createCourse(
                    code,
                    title,
                    unit,
                    Number(selectedDepartment),
                    Number(selectedLevel),
                    Number(selectedSemester),
                    (error) => {
                        console.error(
                            "Create course error:",
                            error
                        );
                    },
                    () => {
                        closeModal();
                    }
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingCourse) return;

        setIsSubmitting(true);

        try {
            await deleteCourse(
                deletingCourse.id,
                (error) => {
                    console.error("Delete course error:", error);
                },
                () => {
                    setDeletingCourse(null);
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPages = Math.ceil(
        courses.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedCourses = courses.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (isCourseLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="faculty-page">

            {/* Header */}
            <div className="faculty-header">
                <div>
                    <h1>Course Management</h1>

                    <p>
                        Manage the courses in your institution.
                    </p>
                </div>

                <button
                    type="button"
                    className="faculty-add-button"
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    <span>Add Course</span>
                </button>
            </div>

            {/* Faculty Table */}
            <div className="faculty-table-container">
                {courses.length === 0 ? (
                    <div className="faculty-empty">
                        <p>No courses found.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Course Code</th>
                                    <th>Course Title</th>
                                    <th>Course Unit</th>
                                    <th>Department</th>
                                    <th>Level</th>
                                    <th>Semester</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedCourses.map((course, index) => (
                                    <tr key={course.id}>

                                        <td>
                                            {startIndex + index + 1}
                                        </td>

                                        <td>
                                            {course.course_code}
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

                                        <td>
                                            {course.semester_name}
                                        </td>

                                        <td>
                                            {new Date(
                                                course.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="faculty-actions">
                                                <button
                                                    type="button"
                                                    className="faculty-action-button"
                                                    onClick={() =>
                                                        openEditModal(course)
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="faculty-action-button delete"
                                                    onClick={() =>
                                                        openDeleteModal(course)
                                                    }
                                                >
                                                    <Trash size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Cards */}
                        <div className="faculty-cards">
                            {paginatedCourses.map((course, index) => (
                                <div
                                    className="faculty-card"
                                    key={course.id}
                                >
                                    <div className="faculty-card-header">

                                        <div className="faculty-card-number">
                                            #{startIndex + index + 1}
                                        </div>

                                        <div className="faculty-card-name">
                                            {course.course_code}
                                        </div>

                                    </div>

                                    <div className="faculty-card-details">

                                        <div className="faculty-card-detail">
                                            <span>Course Title</span>

                                            <strong>
                                                {course.course_title}
                                            </strong>
                                        </div>

                                        <div className="faculty-card-detail">
                                            <span>Course Unit</span>

                                            <strong>
                                                {course.course_unit}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="faculty-card-details">
                                        <div className="faculty-card-detail">
                                            <span>Department</span>

                                            <strong>
                                                {course.department_name}
                                            </strong>
                                        </div>

                                        <div className="faculty-card-detail">
                                            <span>Level</span>

                                            <strong>
                                                {course.level_name}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="faculty-card-details">
                                        <div className="faculty-card-detail">
                                            <span>Semester</span>

                                            <strong>
                                                {course.semester_name}
                                            </strong>
                                        </div>

                                        <div className="faculty-card-detail">
                                            <span>Created</span>

                                            <strong>
                                                {new Date(
                                                    course.created_at
                                                ).toLocaleDateString()}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="faculty-card-actions">
                                        <button
                                            type="button"
                                            className="faculty-action-button"
                                            onClick={() =>
                                                openEditModal(course)
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="faculty-action-button delete"
                                            onClick={() =>
                                                openDeleteModal(course)
                                            }
                                        >
                                            <Trash size={16} />
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Add and Edit Faculty Modal */}
           <Modal
                open={modalVisible}
                onClose={closeModal}
                title={
                    editingCourse
                        ? "Edit Course"
                        : "Add Course"
                }
            >
                <form
                    onSubmit={handleSubmit}
                    className="faculty-form"
                >

                    <div className="faculty-form-group">
                        <Dropdown
                            label="Department"
                            placeholder="Select Department"
                            value={selectedDepartment}
                            onSelect={setSelectedDepartment}
                            options={departments.map((department) => ({
                                value: String(department.id),
                                label: department.name,
                            }))}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="faculty-form-group">
                        <Dropdown
                            label="Level"
                            placeholder="Select Level"
                            value={selectedLevel}
                            onSelect={setSelectedLevel}
                            options={levels.map((level) => ({
                                value: String(level.id),
                                label: level.name,
                            }))}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="faculty-form-group">
                        <Dropdown
                            label="Semester"
                            placeholder="Select Semester"
                            value={selectedSemester}
                            onSelect={setSelectedSemester}
                            options={semesters.map((semester) => ({
                                value: String(semester.id),
                                label: semester.name,
                            }))}
                            disabled={isSubmitting}
                        />
                    </div>


                    <div className="faculty-form-group">
                        <label htmlFor="courseCode">
                            Course Code
                        </label>

                        <input
                            id="courseCode"
                            type="text"
                            value={courseCode}
                            onChange={(event) =>
                                setCourseCode(event.target.value)
                            }
                            placeholder="Enter course code"
                            disabled={isSubmitting}
                            style={{marginBottom: '20px'}}
                        />
                    </div>

                    <div className="faculty-form-group">
                        <label htmlFor="courseTitle">
                            Course Title
                        </label>

                        <input
                            id="courseTitle"
                            type="text"
                            value={courseTitle}
                            onChange={(event) =>
                                setCourseTitle(event.target.value)
                            }
                            placeholder="Enter course title"
                            disabled={isSubmitting}
                            style={{marginBottom: '20px'}}
                        />
                    </div>

                    <div className="faculty-form-group">
                        <label htmlFor="courseUnit">
                            Course Unit
                        </label>

                        <input
                            id="courseUnit"
                            type="number"
                            min="1"
                            max="6"
                            value={courseUnit}
                            onChange={(event) =>
                                setCourseUnit(event.target.value)
                            }
                            placeholder="Enter course unit"
                            disabled={isSubmitting}
                        />
                    </div>


                    <div className="faculty-modal-actions">
                        <button
                            type="button"
                            className="faculty-cancel-button"
                            onClick={closeModal}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="faculty-save-button"
                            disabled={
                                isSubmitting ||
                                !courseCode.trim() ||
                                !courseTitle.trim() ||
                                !courseUnit ||
                                !selectedDepartment ||
                                !selectedLevel ||
                                !selectedSemester
                            }
                        >
                            {isSubmitting
                                ? "Saving..."
                                : editingCourse
                                    ? "Update Course"
                                    : "Save Course"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={Boolean(deletingCourse)}
                onClose={closeDeleteModal}
                title="Delete Course?"
            >
                <p className="logout-message">
                    Are you sure you want to delete{" "}
                    <strong>{deletingCourse?.course_code}</strong>?
                </p>

                <div className="faculty-modal-actions">
                    <button
                        type="button"
                        className="faculty-cancel-button"
                        onClick={closeDeleteModal}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="faculty-delete-button"
                        onClick={handleDelete}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Deleting..." : "Delete Course"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Course;