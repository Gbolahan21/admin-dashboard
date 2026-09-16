import { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";

import {
    Pagination,
    Loading,
    Modal,
} from "../../components";

function Student({
    student,
    getStudents,
}) {
    const {
        students = [],
        page = 1,
        totalPages = 1,
    } = student;

    const [search, setSearch] = useState("");
    const [isStudentLoading, setIsStudentLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        document.title = "Student | Moh";
    }, []);

    useEffect(() => {
        const loadStudents = async () => {
            setIsStudentLoading(true);

            const startTime = Date.now();

            try {
                await getStudents(1, 10, "");
            } finally {
                const elapsed = Date.now() - startTime;
                const minimumTime = 1000;
                const remainingTime = minimumTime - elapsed;

                if (remainingTime > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, remainingTime)
                    );
                }

                setIsStudentLoading(false);
            }
        };

        loadStudents();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;

        setSearch(value);

        getStudents(
            1,
            10,
            value
        );
    };

    const handlePageChange = (newPage) => {
        getStudents(
            newPage,
            10,
            search
        );
    };

    const handleViewStudent = (student) => {
        setSelectedStudent(student);
    };

    if (isStudentLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="faculty-page">
            {/* Header */}
            <div className="faculty-header">

                <div>
                    <h1>
                        Student Management
                    </h1>

                    <p>
                        Manage the students in your institution.
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="student-search-container">

                <div className="student-search">

                    <Search size={18} />

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search name or matric number..."
                    />

                </div>

            </div>

            {/* Student Table */}
            <div className="faculty-table-container">
                {students.length === 0 ? (

                    <div className="faculty-empty">
                        <p>
                            No students found.
                        </p>
                    </div>

                ) : (
                    <>
                        {/* Desktop */}
                        <table className="faculty-table">

                            <thead>
                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Matric No
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Faculty
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {students.map(
                                    (student, index) => (

                                        <tr
                                            key={student.id}
                                        >

                                            <td>
                                                {(page - 1) * 10 +
                                                    index +
                                                    1}
                                            </td>

                                            <td>
                                                {student.firstname}{" "}
                                                {student.lastname}
                                            </td>

                                            <td>
                                                {student.matricNo}
                                            </td>

                                            <td>
                                                {student.department}
                                            </td>

                                            <td>
                                                {student.faculty}
                                            </td>

                                            <td>

                                                <div className="faculty-actions">

                                                    <button
                                                        type="button"
                                                        className="faculty-action-button"
                                                        onClick={() => handleViewStudent(student)}
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>

                        {/* Mobile */}
                        <div className="faculty-cards">

                            {students.map(
                                (student, index) => (

                                    <div
                                        className="faculty-card"
                                        key={student.id}
                                    >

                                        <div className="faculty-card-header">

                                            <div className="faculty-card-number">
                                                #
                                                {(page - 1) *
                                                    10 +
                                                    index +
                                                    1}
                                            </div>

                                            <div className="faculty-card-name">
                                                {student.firstname}{" "}
                                                {student.lastname}
                                            </div>

                                        </div>

                                        <div className="faculty-card-details">

                                            <div className="faculty-card-detail">

                                                <span>
                                                    Matric No
                                                </span>

                                                <strong>
                                                    {student.matricNo}
                                                </strong>

                                            </div>

                                            <div className="faculty-card-detail">

                                                <span>
                                                    Department
                                                </span>

                                                <strong>
                                                    {student.department}
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="faculty-card-details">

                                            <div className="faculty-card-detail">

                                                <span>
                                                    Faculty
                                                </span>

                                                <strong>
                                                    {student.faculty}
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="faculty-card-actions">

                                            <button
                                                type="button"
                                                className="faculty-action-button"
                                                onClick={() => handleViewStudent(student)}
                                            >
                                                <Eye size={16} />
                                                View
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Modal
                open={!!selectedStudent}
                onClose={() => setSelectedStudent(null)}
                title="Student Details"
            >
                {selectedStudent && (
                    <div className="student-details">
                        {/* Personal Information */}
                        <div className="student-details-section">

                            <h3>Personal Information</h3>

                            <div className="student-details-grid">

                                <div className="student-detail">
                                    <span>First Name</span>
                                    <strong>
                                        {selectedStudent.firstname || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Last Name</span>
                                    <strong>
                                        {selectedStudent.lastname || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Email</span>
                                    <strong>
                                        {selectedStudent.email || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Matric Number</span>
                                    <strong>
                                        {selectedStudent.matricNo || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Gender</span>
                                    <strong>
                                        {selectedStudent.gender || "N/A"}
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* Academic Information */}
                        <div className="student-details-section">

                            <h3>Academic Information</h3>

                            <div className="student-details-grid">

                                <div className="student-detail">
                                    <span>Faculty</span>
                                    <strong>
                                        {selectedStudent.faculty || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Department</span>
                                    <strong>
                                        {selectedStudent.department || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Level</span>
                                    <strong>
                                        {selectedStudent.level || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Semester</span>
                                    <strong>
                                        {selectedStudent.semester || "N/A"}
                                    </strong>
                                </div>
                            </div>

                        </div>


                        {/* Account Information */}
                        <div className="student-details-section">

                            <h3>Account Information</h3>

                            <div className="student-details-grid">

                                <div className="student-detail">
                                    <span>Student ID</span>
                                    <strong>
                                        {selectedStudent.id || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Status</span>
                                    <strong>
                                        {selectedStudent.status || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Created At</span>
                                    <strong>
                                        {selectedStudent.created_at
                                            ? new Date(
                                                selectedStudent.created_at
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Student;