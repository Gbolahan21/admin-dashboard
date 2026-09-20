import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Student from "./Student";
import Attendance from "./Attendance";
import Setting from "./Setting";
import Report from "./Report";
import Faculty from "./Faculty";
import Department from "./Department";
import Level from "./Level";
import Course from "./Course";
import Semester from "./Semester";
import NotFound from "./NotFound";

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
      name: "Attendance",
      component: Attendance,
      path: "/attendance",
    },
    {
      name: "Setting",
      component: Setting,
      path: "/setting",
    },
    {
      name: "Report",
      component: Report,
      path: "/report",
    },
    {
      name: "Faculty",
      component: Faculty,
      path: "/faculty",
    },
    {
      name: "Department",
      component: Department,
      path: "/department",
    },
    {
      name: "Level",
      component: Level,
      path: "/level",
    },
    {
      name: "Course",
      component: Course,
      path: "/course",
    },
    {
      name: "Semester",
      component: Semester,
      path: "/semester",
    },
    {
      name: "NotFound",
      component: NotFound,
      path: "/404",
    },
  ],
};

export default baseRoutes;
