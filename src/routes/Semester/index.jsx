import { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

import { Modal, Pagination, Loading } from "../../components";

function Semester({
    semester,
    getSemesters,
    createSemester,
    updateSemester,
    deleteSemester,
}) {
    const { semesters } = semester;

    const [modalVisible, setModalVisible] = useState(false);
    const [isSemesterLoading, setIsSemesterLoading] = useState(true);
    const [semesterName, setSemesterName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingSemester, setEditingSemester] = useState(null);
    const [deletingSemester, setDeletingSemester] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "Semester | Moh";
    }, []);

    useEffect(() => {
        const loadSemester = async () => {
            setIsSemesterLoading(true);

            const startTime = Date.now();

            try {
                await getSemesters();
            } finally {
                const elapsed = Date.now() - startTime;
                const minimumTime = 1000;

                const remainingTime = minimumTime - elapsed;

                if (remainingTime > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, remainingTime)
                    );
                }

                setIsSemesterLoading(false);
            }
        };

        loadSemester();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const openEditModal = (semester) => {
        setEditingSemester(semester);
        setSemesterName(semester.name);
        setModalVisible(true);
    };

    const openAddModal = () => {
        setEditingSemester(null);
        setSemesterName("");
        setModalVisible(true);
    };

    const closeModal = () => {
        if (isSubmitting) return;

        setModalVisible(false);
        setSemesterName("");
        setEditingSemester(null);
    };

    const openDeleteModal = (semester) => {
        setDeletingSemester(semester);
    };

    const closeDeleteModal = () => {
        if (isSubmitting) return;

        setDeletingSemester(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = semesterName.trim();

        if (!name) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingSemester) {
                await updateSemester(
                    editingSemester.id,
                    name,
                    (error) => {
                        console.error(
                            "Update semester error:",
                            error
                        );
                    },
                    () => {
                        setModalVisible(false);
                        setSemesterName("");
                        setEditingSemester(null);
                    }
                );
            } else {
                await createSemester(
                    name,
                    (error) => {
                        console.error(
                            "Create semester error:",
                            error
                        );
                    },
                    () => {
                        setModalVisible(false);
                        setSemesterName("");
                    }
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingSemester) return;

        setIsSubmitting(true);

        try {
            await deleteSemester(
                deletingSemester.id,
                (error) => {
                    console.error("Delete semester error:", error);
                },
                () => {
                    setDeletingSemester(null);
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPages = Math.ceil(
        semesters.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedSemesters = semesters.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (isSemesterLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="faculty-page">

            {/* Header */}
            <div className="faculty-header">
                <div>
                    <h1>Semester Management</h1>

                    <p>
                        Manage the semesters in your institution.
                    </p>
                </div>

                <button
                    type="button"
                    className="faculty-add-button"
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    <span>Add Semester</span>
                </button>
            </div>

            {/* Faculty Table */}
            <div className="faculty-table-container">
                {semesters.length === 0 ? (
                    <div className="faculty-empty">
                        <p>No semester found.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Semester</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedSemesters.map((semester, index) => (
                                    <tr key={semester.id}>
                                        <td>{index + 1}</td>

                                        <td>{semester.name}</td>

                                        <td>
                                            {new Date(
                                                semester.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="faculty-actions">
                                                <button
                                                    type="button"
                                                    className="faculty-action-button"
                                                    onClick={() =>
                                                        openEditModal(semester)
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="faculty-action-button delete"
                                                    onClick={() =>
                                                        openDeleteModal(semester)
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
                            {paginatedSemesters.map((semester, index) => (
                                <div
                                    className="faculty-card"
                                    key={semester.id}
                                >
                                    <div className="faculty-card-header">
                                        <div className="faculty-card-number">
                                            #{index + 1}
                                        </div>

                                        <div className="faculty-card-name">
                                            {semester.name}
                                        </div>
                                    </div>

                                    <div className="faculty-card-details">
                                        <div className="faculty-card-detail">
                                            <span>Created</span>

                                            <strong>
                                                {new Date(
                                                    semester.created_at
                                                ).toLocaleDateString()}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="faculty-card-actions">
                                        <button
                                            type="button"
                                            className="faculty-action-button"
                                            onClick={() =>
                                                openEditModal(semester)
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="faculty-action-button delete"
                                            onClick={() =>
                                                openDeleteModal(semester)
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

            {/* Add and Edit Semester Modal */}
            <Modal
                open={modalVisible}
                onClose={closeModal}
                title={editingSemester ? "Edit Semester" : "Add Semester"}
            >
                <form
                    onSubmit={handleSubmit}
                    className="faculty-form"
                >
                    <div className="faculty-form-group">
                        <label htmlFor="semesterName">
                            Semester
                        </label>

                        <input
                            id="semesterName"
                            type="text"
                            value={semesterName}
                            onChange={(event) =>
                                setSemesterName(event.target.value)
                            }
                            placeholder="Enter semester name"
                            autoFocus
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
                                !semesterName.trim()
                            }
                        >
                            {isSubmitting
                                ? "Saving..."
                                : editingSemester
                                    ? "Update Semester"
                                    : "Save Semester"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={Boolean(deletingSemester)}
                onClose={closeDeleteModal}
                title="Delete Semester?"
            >
                <p className="logout-message">
                    Are you sure you want to delete{" "}
                    <strong>{deletingSemester?.name}</strong>?
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
                        {isSubmitting ? "Deleting..." : "Delete Semester"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Semester;