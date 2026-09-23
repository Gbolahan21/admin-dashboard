import AdminAttendance from "./AdminAttendance";
import LecturerAttendance from "./LecturerAttendance";

const Attendance = (props) => {
    const role = props.admin?.role;

    if (role === "admin") {
        return <AdminAttendance {...props} />;
    }

    if (role === "lecturer") {
        return <LecturerAttendance {...props} />;
    }

    return null;
};

export default Attendance;