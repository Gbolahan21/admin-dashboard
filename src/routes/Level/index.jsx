import { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

import { Modal, Pagination, Loading } from "../../components";

function Level({
    level,
    getLevels,
    createLevel,
    updateLevel,
    deleteLevel,
}) {
    const { levels } = level;

    const [modalVisible, setModalVisible] = useState(false);
    const [isLevelLoading, setIsLevelLoading] = useState(true);
    const [levelName, setLevelName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingLevel, setEditingLevel] = useState(null);
    const [deletingLevel, setDeletingLevel] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "Level | Moh";
    }, []);

    useEffect(() => {
        const loadLevel = async () => {
            setIsLevelLoading(true);

            const startTime = Date.now();

            try {
                await getLevels();
            } finally {
                const elapsed = Date.now() - startTime;
                const minimumTime = 1000;

                const remainingTime = minimumTime - elapsed;

                if (remainingTime > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, remainingTime)
                    );
                }

                setIsLevelLoading(false);
            }
        };

        loadLevel();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const openEditModal = (level) => {
        setEditingLevel(level);
        setLevelName(level.name);
        setModalVisible(true);
    };

    const openAddModal = () => {
        setEditingLevel(null);
        setLevelName("");
        setModalVisible(true);
    };

    const closeModal = () => {
        if (isSubmitting) return;

        setModalVisible(false);
        setLevelName("");
        setEditingLevel(null);
    };

    const openDeleteModal = (level) => {
        setDeletingLevel(level);
    };

    const closeDeleteModal = () => {
        if (isSubmitting) return;

        setDeletingLevel(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = levelName.trim();

        if (!name) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingLevel) {
                await updateLevel(
                    editingLevel.id,
                    name,
                    (error) => {
                        console.error(
                            "Update level error:",
                            error
                        );
                    },
                    () => {
                        setModalVisible(false);
                        setLevelName("");
                        setEditingLevel(null);
                    }
                );
            } else {
                await createLevel(
                    name,
                    (error) => {
                        console.error(
                            "Create level error:",
                            error
                        );
                    },
                    () => {
                        setModalVisible(false);
                        setLevelName("");
                    }
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingLevel) return;

        setIsSubmitting(true);

        try {
            await deleteLevel(
                deletingLevel.id,
                (error) => {
                    console.error("Delete level error:", error);
                },
                () => {
                    setDeletingLevel(null);
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPages = Math.ceil(
        levels.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedLevels = levels.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (isLevelLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="faculty-page">

            {/* Header */}
            <div className="faculty-header">
                <div>
                    <h1>Level Management</h1>

                    <p>
                        Manage the levels in your institution.
                    </p>
                </div>

                <button
                    type="button"
                    className="faculty-add-button"
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    <span>Add Level</span>
                </button>
            </div>

            {/* Faculty Table */}
            <div className="faculty-table-container">
                {levels.length === 0 ? (
                    <div className="faculty-empty">
                        <p>No levels found.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Level</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedLevels.map((level, index) => (
                                    <tr key={level.id}>
                                        <td>{index + 1}</td>

                                        <td>{level.name}</td>

                                        <td>
                                            {new Date(
                                                level.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="faculty-actions">
                                                <button
                                                    type="button"
                                                    className="faculty-action-button"
                                                    onClick={() =>
                                                        openEditModal(level)
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="faculty-action-button delete"
                                                    onClick={() =>
                                                        openDeleteModal(level)
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
                            {paginatedLevels.map((level, index) => (
                                <div
                                    className="faculty-card"
                                    key={level.id}
                                >
                                    <div className="faculty-card-header">
                                        <div className="faculty-card-number">
                                            #{index + 1}
                                        </div>

                                        <div className="faculty-card-name">
                                            {level.name}
                                        </div>
                                    </div>

                                    <div className="faculty-card-details">
                                        <div className="faculty-card-detail">
                                            <span>Created</span>

                                            <strong>
                                                {new Date(
                                                    level.created_at
                                                ).toLocaleDateString()}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="faculty-card-actions">
                                        <button
                                            type="button"
                                            className="faculty-action-button"
                                            onClick={() =>
                                                openEditModal(level)
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="faculty-action-button delete"
                                            onClick={() =>
                                                openDeleteModal(level)
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

            {/* Add and Edit Level Modal */}
            <Modal
                open={modalVisible}
                onClose={closeModal}
                title={editingLevel ? "Edit Level" : "Add Level"}
            >
                <form
                    onSubmit={handleSubmit}
                    className="faculty-form"
                >
                    <div className="faculty-form-group">
                        <label htmlFor="levelName">
                            Level
                        </label>

                        <input
                            id="levelName"
                            type="text"
                            value={levelName}
                            onChange={(event) =>
                                setLevelName(event.target.value)
                            }
                            placeholder="Enter level name"
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
                                !levelName.trim()
                            }
                        >
                            {isSubmitting
                                ? "Saving..."
                                : editingLevel
                                    ? "Update Level"
                                    : "Save Level"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={Boolean(deletingLevel)}
                onClose={closeDeleteModal}
                title="Delete Level?"
            >
                <p className="logout-message">
                    Are you sure you want to delete{" "}
                    <strong>{deletingLevel?.name}</strong>?
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
                        {isSubmitting ? "Deleting..." : "Delete Level"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Level;