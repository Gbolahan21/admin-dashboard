import { useEffect, useState, useCallback } from "react";
import { Eye, Search } from "lucide-react";

import { Pagination, Loading, Modal } from "../../components";

function Lecturer({lecturer, getLecturers}) {
    const {lecturers = [], page = 1, totalPages = 1} = lecturer;

    const [search, setSearch] = useState("");
    const [isLecturerLoading, setIsLecturerLoading] = useState(true);
    const [selectedLecturer, setSelectedLecturer] = useState(null);

    useEffect(() => {
        document.title = "Lecturer | Moh";
    }, []);

    useEffect(() => {
        const loadLecturers = async () => {
            setIsLecturerLoading(true);

            const startTime = Date.now();

            try {
                await getLecturers(1, 10, "");
            } finally {
                const elapsed = Date.now() - startTime;
                const minimumTime = 1000;
                const remainingTime = minimumTime - elapsed;

                if (remainingTime > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, remainingTime)
                    );
                }

                setIsLecturerLoading(false);
            }
        };

        loadLecturers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = useCallback(
        (event) => {
            const value = event.target.value;

            setSearch(value);

            getLecturers(1, 10, value);
        },
        [getLecturers]
    );

    const handlePageChange = useCallback(
        (newPage) => {
            getLecturers(newPage, 10, search);
        },
        [getLecturers, search]
    );

    const handleViewLecturer = useCallback((lecturer) => {
        setSelectedLecturer(lecturer);
    }, []);

    if (isLecturerLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="faculty-page">
            {/* Header */}
            <div className="faculty-header">

                <div>
                    <h1>
                        Lecturer Management
                    </h1>

                    <p>
                        Manage the lecturers in your institution.
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
                        placeholder="Search name or staff ID..."
                    />

                </div>

            </div>

            {/* Lecturer Table */}
            <div className="faculty-table-container">
                {lecturers.length === 0 ? (

                    <div className="faculty-empty">
                        <p>
                            No lecturer found.
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
                                        Staff ID
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {lecturers.map(
                                    (lecturer, index) => (

                                        <tr
                                            key={lecturer.id}
                                        >

                                            <td>
                                                {(page - 1) * 10 +
                                                    index +
                                                    1}
                                            </td>

                                            <td>
                                                {lecturer.firstname}{" "}
                                                {lecturer.lastname}
                                            </td>

                                            <td>
                                                {lecturer.staff_id}
                                            </td>

                                            <td>
                                                {lecturer.email}
                                            </td>

                                            <td>

                                                <div className="faculty-actions">

                                                    <button
                                                        type="button"
                                                        className="faculty-action-button"
                                                        onClick={() => handleViewLecturer(lecturer)}
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

                            {lecturers.map(
                                (lecturer, index) => (

                                    <div
                                        className="faculty-card"
                                        key={lecturer.id}
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
                                                {lecturer.firstname}{" "}
                                                {lecturer.lastname}
                                            </div>

                                        </div>

                                        <div className="faculty-card-details">

                                            <div className="faculty-card-detail">

                                                <span>
                                                    Staff ID
                                                </span>

                                                <strong>
                                                    {lecturer.staff_id}
                                                </strong>

                                            </div>

                                            <div className="faculty-card-detail">

                                                <span>
                                                    Email
                                                </span>

                                                <strong>
                                                    {lecturer.email}
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="faculty-card-actions">

                                            <button
                                                type="button"
                                                className="faculty-action-button"
                                                onClick={() => handleViewLecturer(lecturer)}
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
                open={!!selectedLecturer}
                onClose={() => setSelectedLecturer(null)}
                title="Lecturer Details"
            >
                {selectedLecturer && (
                    <div className="student-details">
                        {/* Personal Information */}
                        <div className="student-details-section">

                            <h3>Personal Information</h3>

                            <div className="student-details-grid">

                                <div className="student-detail">
                                    <span>First Name</span>
                                    <strong>
                                        {selectedLecturer.firstname || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Last Name</span>
                                    <strong>
                                        {selectedLecturer.lastname || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Staff ID</span>
                                    <strong>
                                        {selectedLecturer.staff_id || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Email</span>
                                    <strong>
                                        {selectedLecturer.email || "N/A"}
                                    </strong>
                                </div>
                            </div>

                        </div>

                        {/* Account Information */}
                        <div className="student-details-section">

                            <h3>Account Information</h3>

                            <div className="student-details-grid">

                                <div className="student-detail">
                                    <span>Lecturer ID</span>
                                    <strong>
                                        {selectedLecturer.id || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Status</span>
                                    <strong>
                                        {selectedLecturer.status || "N/A"}
                                    </strong>
                                </div>

                                <div className="student-detail">
                                    <span>Created At</span>
                                    <strong>
                                        {selectedLecturer.created_at
                                            ? new Date(
                                                selectedLecturer.created_at
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

export default Lecturer;