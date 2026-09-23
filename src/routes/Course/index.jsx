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

    getCurrentSemester,
    getLecturerFaculties,
    getDepartmentsByFaculty,
    getAvailableCourses,
    getMyCourses,
    registerCourses,
    removeCourseRegistration,
    lecturer,
    getLecturerLevels,
}) => {
    const {
        currentSemester,
        faculties,
        departments,
        levels,
        availableCourses,
        myCourses,
    } = lecturer || {};
    
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
        return <LecturerCourse
                getAvailableCourses={getAvailableCourses}
                getCurrentSemester={getCurrentSemester}
                getLecturerFaculties={getLecturerFaculties}
                getDepartmentsByFaculty={getDepartmentsByFaculty}
                getMyCourses={getMyCourses}
                registerCourses={registerCourses}
                removeCourseRegistration={removeCourseRegistration}
                currentSemester={currentSemester}
                faculties={faculties}
                departments={departments}
                levels={levels}
                availableCourses={availableCourses}
                myCourses={myCourses}
                getLecturerLevels={getLecturerLevels}
            />;
    }

    return null;
};

export default Course;