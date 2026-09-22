import AdminAttendance from "./AdminAttendance";
import LecturerAttendance from "./LecturerAttendance";

const Attendance = ({
    admin,
    getAttendance, 
    attendance,
    level,
    getLevels,
}) => {
    const role = admin?.role;

    if (role === "admin") {
        return <AdminAttendance
                getAttendance={getAttendance}
                attendance={attendance}
                level={level}
                getLevels={getLevels}
            />;
    }

    if (role === "lecturer") {
        return <LecturerAttendance />;
    }

    return null;
};

export default Attendance;