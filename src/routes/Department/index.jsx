import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

import { Modal, Pagination, Dropdown, Loading } from "../../components";

function Department({
    faculty,
    department,
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getFaculties
}) {
    const { faculties } = faculty;
    const { departments } = department;

    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [departmentName, setDepartmentName] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [maxLevel, setMaxLevel] = useState("");
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [deletingDepartment, setDeletingDepartment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        document.title = "Department | Moh";
    }, []);

    useEffect(() => {
        const loadDepartment = async () => {
            setIsDepartmentLoading(true);

            const startTime = Date.now();

            try {
                await getFaculties();
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

                setIsDepartmentLoading(false);
            }
        };

        loadDepartment();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openEditModal = useCallback((department) => {
        setEditingDepartment(department);
        setDepartmentName(department.name);
        setSelectedFaculty(String(department.faculty_id));
        setMaxLevel(String(department.max_level));
        setModalVisible(true);
    }, []);

    const openAddModal = useCallback(() => {
        setEditingDepartment(null);
        setDepartmentName("");
        setSelectedFaculty("");
        setMaxLevel("");
        setModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        if (isSubmitting) return;

        setModalVisible(false);
        setDepartmentName("");
        setSelectedFaculty("");
        setMaxLevel("");
        setEditingDepartment(null);
    }, [isSubmitting]);

    const openDeleteModal = useCallback((faculty) => {
        setDeletingDepartment(faculty);
    }, []);

    const closeDeleteModal = useCallback(() => {
        if (isSubmitting) return;

        setDeletingDepartment(null);
    }, [isSubmitting]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const name = departmentName.trim();
        const facultyId = Number(selectedFaculty);
        const selectedMaxLevel = Number(maxLevel);

        if (!name || !facultyId || ![500, 600].includes(selectedMaxLevel)) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingDepartment) {
                await updateDepartment(
                    editingDepartment.id,
                    name,
                    facultyId,
                    selectedMaxLevel,
                    (error) => {
                        console.error(
                            "Update department error:",
                            error
                        );
                    },
                    () => {
                        closeModal();
                    }
                );
            } else {
                await createDepartment(
                    name,
                    facultyId,
                    selectedMaxLevel,
                    (error) => {
                        console.error(
                            "Create department error:",
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
    }, [
        departmentName,
        selectedFaculty,
        editingDepartment,
        updateDepartment,
        createDepartment,
        closeModal,
        maxLevel
    ]);

    const handleDelete = useCallback(async () => {
        if (!deletingDepartment) return;

        setIsSubmitting(true);

        try {
            await deleteDepartment(
                deletingDepartment.id,
                (error) => {
                    console.error("Delete department error:", error);
                },
                () => {
                    setDeletingDepartment(null);
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    }, [deletingDepartment, deleteDepartment]);

    const totalPages = useMemo(
        () => Math.ceil(departments.length / itemsPerPage),
        [departments.length, itemsPerPage]
    );

    const startIndex = useMemo(
        () => (currentPage - 1) * itemsPerPage,
        [currentPage, itemsPerPage]
    );

    const paginatedDepartments = useMemo(
        () => departments.slice(startIndex, startIndex + itemsPerPage),
        [departments, startIndex, itemsPerPage]
    );

    if (isDepartmentLoading) {
        return <Loading size="big" />;
    }

    return (
        <div className="faculty-page">

            {/* Header */}
            <div className="faculty-header">
                <div>
                    <h1>Department Management</h1>

                    <p>
                        Manage the departments in your institution.
                    </p>
                </div>

                <button
                    type="button"
                    className="faculty-add-button"
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    <span>Add Department</span>
                </button>
            </div>

            {/* Faculty Table */}
            <div className="faculty-table-container">
                {departments.length === 0 ? (
                    <div className="faculty-empty">
                        <p>No departments found.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <table className="faculty-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Department Name</th>
                                    <th>Faculty</th>
                                    <th>Maximum Level</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedDepartments.map((department, index) => (
                                    <tr key={department.id}>

                                        <td>
                                            {startIndex + index + 1}
                                        </td>

                                        <td>
                                            {department.name}
                                        </td>

                                        <td>
                                            {department.faculty_name}
                                        </td>

                                        <td>
                                            {department.max_level} Level
                                        </td>

                                        <td>
                                            {new Date(
                                                department.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="faculty-actions">
                                                <button
                                                    type="button"
                                                    className="faculty-action-button"
                                                    onClick={() =>
                                                        openEditModal(department)
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="faculty-action-button delete"
                                                    onClick={() =>
                                                        openDeleteModal(department)
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
                            {paginatedDepartments.map((department, index) => (
                                <div
                                    className="faculty-card"
                                    key={department.id}
                                >
                                    <div className="faculty-card-header">

                                        <div className="faculty-card-number">
                                            #{startIndex + index + 1}
                                        </div>

                                        <div className="faculty-card-name">
                                            {department.name}
                                        </div>

                                    </div>

                                    <div className="faculty-card-details">

                                        <div className="faculty-card-detail">
                                            <span>Faculty</span>

                                            <strong>
                                                {department.faculty_name}
                                            </strong>
                                        </div>

                                        <div className="faculty-card-detail">
                                            <span>Maximum Level</span>
                                            <strong>{department.max_level} Level</strong>
                                        </div>

                                        <div className="faculty-card-detail">
                                            <span>Created</span>

                                            <strong>
                                                {new Date(
                                                    department.created_at
                                                ).toLocaleDateString()}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="faculty-card-actions">
                                        <button
                                            type="button"
                                            className="faculty-action-button"
                                            onClick={() =>
                                                openEditModal(department)
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="faculty-action-button delete"
                                            onClick={() =>
                                                openDeleteModal(department)
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
                    editingDepartment
                        ? "Edit Department"
                        : "Add Department"
                }
            >
                <form
                    onSubmit={handleSubmit}
                    className="faculty-form"
                >

                    {/* Faculty */}
                    <div className="faculty-form-group">
                        <Dropdown
                            label="Faculty"
                            placeholder="Select Faculty"
                            value={selectedFaculty}
                            onSelect={setSelectedFaculty}
                            options={faculties.map((faculty) => ({
                                value: String(faculty.id),
                                label: faculty.name,
                            }))}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="faculty-form-group">
                        <Dropdown
                            label="Maximum Programme Level "
                            placeholder="Select maximum programme level"
                            value={maxLevel}
                            onSelect={setMaxLevel}
                            options={[ 
                                { 
                                    value: "500", 
                                    label: "500 Level (5-year programme)", 
                                }, 
                                { 
                                    value: "600", 
                                    label: "600 Level (6-year programme)", 
                                }, 
                            ]}
                            disabled={isSubmitting}
                        />
                    </div>


                    {/* Department Name */}
                    <div className="faculty-form-group">
                        <label htmlFor="departmentName">
                            Department Name
                        </label>

                        <input
                            id="departmentName"
                            type="text"
                            value={departmentName}
                            onChange={(event) =>
                                setDepartmentName(event.target.value)
                            }
                            placeholder="Enter department name"
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
                                !departmentName.trim() ||
                                !selectedFaculty ||
                                !["500", "600"].includes(maxLevel)
                            }
                        >
                            {isSubmitting
                                ? "Saving..."
                                : editingDepartment
                                    ? "Update Department"
                                    : "Save Department"}
                        </button>
                    </div>

                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={Boolean(deletingDepartment)}
                onClose={closeDeleteModal}
                title="Delete Department?"
            >
                <p className="logout-message">
                    Are you sure you want to delete{" "}
                    <strong>{deletingDepartment?.name}</strong>?
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
                        {isSubmitting ? "Deleting..." : "Delete Department"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Department;