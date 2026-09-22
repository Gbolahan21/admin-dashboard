import AdminDashboard from "./AdminDashboard";
import LecturerDashboard from "./LecturerDashboard";

const Dashboard = ({admin, dashboard, getDashboardStats}) => {
    
    const role = admin?.role;

    if (role === "admin") {
        return <AdminDashboard admin={admin} dashboard={dashboard} getDashboardStats={getDashboardStats} />;
    }

    if (role === "lecturer") {
        return <LecturerDashboard />;
    }

    return null;
};

export default Dashboard;