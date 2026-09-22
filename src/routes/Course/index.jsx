import AdminCourse from "./AdminCourse";
import LecturerCourse from "./LecturerCourse";

const Course = ({
    admin,
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
}) => {
    const role = admin?.role;

    if (role === "admin") {
        return <AdminCourse
                level={level}
                department={department}
                semester={semester}
                course={course}
                getCourses={getCourses}
                createCourse={createCourse}
                updateCourse={updateCourse}
                deleteCourse={deleteCourse}
                getDepartments={getDepartments}
                getLevels={getLevels}
                getSemesters={getSemesters}
            />;
    }

    if (role === "lecturer") {
        return <LecturerCourse />;
    }

    return null;
};

export default Course;