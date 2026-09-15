import { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

import { Modal, Pagination } from "../../components";

function Faculty({
    faculty,
    getFaculties,
    createFaculty,
    updateFaculty,
    deleteFaculty,
}) {
    const { faculties } = faculty;

    const [modalVisible, setModalVisible] = useState(false);
    const [facultyName, setFacultyName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState(null);
    const [deletingFaculty, setDeletingFaculty] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "Faculty | Moh";
    }, []);

    useEffect(() => {
        getFaculties();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openEditModal = (faculty) => {
        setEditingFaculty(faculty);
        setFacultyName(faculty.name);
        setModalVisible(true);
    };

    const openAddModal = () => {
        setEditingFaculty(null);
        setFacultyName("");
        setModalVisible(true);
    };

    const closeModal = () => {
        if (isSubmitting) return;

        setModalVisible(false);
        setFacultyName("");
        setEditingFaculty(null);
    };

    const openDeleteModal = (faculty) => {
        setDeletingFaculty(faculty);
    };

    const closeDeleteModal = () => {
        if (isSubmitting) return;

        setDeletingFaculty(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = facultyName.trim();

        if (!name) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingFaculty) {
                await updateFaculty(
                    editingFaculty.id,
                    name,
                    (error) => {
                        console.error(
                            "Update faculty error:",
                            error
                        );
                    },
                    () => {
                        setModalVisible(false);
                        setFacultyName("");
                        setEditingFaculty(null);
                    }
                );
            } else {
                await createFaculty(
                    name,
                    (error) => {
                        console.error(
                            "Create faculty error:",
                            error
                        );
                    },
                    () => {
                        setModalVisible(false);
                        setFacultyName("");
                    }
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingFaculty) return;

        setIsSubmitting(true);

        try {
            await deleteFaculty(
                deletingFaculty.id,
                (error) => {
                    console.error("Delete faculty error:", error);
                },
                () => {
                    setDeletingFaculty(null);
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPages = Math.ceil(
        faculties.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedFaculties = faculties.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="faculty-page">

            {/* Header */}
            <div className="faculty-header">
                <div>
                    <h1>Faculty Management</h1>

                    <p>
                        Manage the faculties in your institution.
                    </p>
                </div>

                <button
                    type="button"
                    className="faculty-add-button"
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    <span>Add Faculty</span>
                </button>
            </div>

            {/* Faculty Table */}
            <div className="faculty-table-container">
                {faculties.length === 0 ? (
                    <div className="faculty-empty">
                        <p>No faculties found.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Faculty Name</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedFaculties.map((faculty, index) => (
                                    <tr key={faculty.id}>
                                        <td>{index + 1}</td>

                                        <td>{faculty.name}</td>

                                        <td>
                                            {new Date(
                                                faculty.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="faculty-actions">
                                                <button
                                                    type="button"
                                                    className="faculty-action-button"
                                                    onClick={() =>
                                                        openEditModal(faculty)
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="faculty-action-button delete"
                                                    onClick={() =>
                                                        openDeleteModal(faculty)
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
                            {paginatedFaculties.map((faculty, index) => (
                                <div
                                    className="faculty-card"
                                    key={faculty.id}
                                >
                                    <div className="faculty-card-header">
                                        <div className="faculty-card-number">
                                            #{index + 1}
                                        </div>

                                        <div className="faculty-card-name">
                                            {faculty.name}
                                        </div>
                                    </div>

                                    <div className="faculty-card-details">
                                        <div className="faculty-card-detail">
                                            <span>Created</span>

                                            <strong>
                                                {new Date(
                                                    faculty.created_at
                                                ).toLocaleDateString()}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="faculty-card-actions">
                                        <button
                                            type="button"
                                            className="faculty-action-button"
                                            onClick={() =>
                                                openEditModal(faculty)
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="faculty-action-button delete"
                                            onClick={() =>
                                                openDeleteModal(faculty)
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
                title={editingFaculty ? "Edit Faculty" : "Add Faculty"}
            >
                <form
                    onSubmit={handleSubmit}
                    className="faculty-form"
                >
                    <div className="faculty-form-group">
                        <label htmlFor="facultyName">
                            Faculty Name
                        </label>

                        <input
                            id="facultyName"
                            type="text"
                            value={facultyName}
                            onChange={(event) =>
                                setFacultyName(event.target.value)
                            }
                            placeholder="Enter faculty name"
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
                                !facultyName.trim()
                            }
                        >
                            {isSubmitting
                                ? "Saving..."
                                : editingFaculty
                                    ? "Update Faculty"
                                    : "Save Faculty"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={Boolean(deletingFaculty)}
                onClose={closeDeleteModal}
                title="Delete Faculty?"
            >
                <p className="logout-message">
                    Are you sure you want to delete{" "}
                    <strong>{deletingFaculty?.name}</strong>?
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
                        {isSubmitting ? "Deleting..." : "Delete Faculty"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Faculty;