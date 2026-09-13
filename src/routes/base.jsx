import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Student from "./Student";
import AttendanceToday from "./AttendanceToday";
import AttendanceAnalytics from "./AttendanceAnalytics";
import Report from "./Report";

const baseRoutes = {
  public: [
    {
      name: "Home",
      component: Home,
      path: "/",
    },
    {
      name: "SignIn",
      component: SignIn,
      path: "/signin",
    },
    {
      name: "SignUp",
      component: SignUp,
      path: "/signup",
    },
  ],

  private: [
    {
      name: "Dashboard",
      component: Dashboard,
      path: "/dashboard",
    },
    {
      name: "Student",
      component: Student,
      path: "/student",
    },
    {
      name: "Today's Attendance",
      component: AttendanceToday,
      path: "/attendance/today",
    },
    {
      name: "Attendance Analytics",
      component: AttendanceAnalytics,
      path: "/attendance/analytics",
    },
    {
      name: "Report",
      component: Report,
      path: "/report",
    },
  ],
};

export default baseRoutes;
