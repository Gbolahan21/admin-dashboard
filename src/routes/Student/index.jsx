import AdminStudent from "./AdminStudent";
import LecturerStudent from "./LecturerStudent";

const Student = (props) => {
    const role = props.admin?.role;

    if (role === "admin") {
        return <AdminStudent {...props} />;
    }

    if (role === "lecturer") {
        return <LecturerStudent {...props} />;
    }

    return null;
};

export default Student;