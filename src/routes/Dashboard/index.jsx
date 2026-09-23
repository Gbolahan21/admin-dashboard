import AdminDashboard from "./AdminDashboard";
import LecturerDashboard from "./LecturerDashboard";

const Dashboard = (props) => {
    
    const role = props.admin?.role;

    if (role === "admin") {
        return <AdminDashboard {...props} />;
    }

    if (role === "lecturer") {
        return <LecturerDashboard {...props} />;
    }

    return null;
};

export default Dashboard;