import Dashboard from "./layouts/views/Dashboard.jsx";
import Typography from "./layouts/views/Typography.jsx";
import Icons from "./layouts/views/Icons.jsx";
import Upgrade from "./layouts/views/Upgrade.jsx";
import UserTableList from "./layouts/views/UserTableList.js";
import AddUser from "./layouts/views/User/AddUser";
import EditUSer from "./layouts/views/User/EditUser.js";
import UpdateProfile from "./layouts/views/User/UpdateProfile.js";
import CreateTeam from "./layouts/views/Team/CreateTeam";
import AddTeamMember from "./layouts/views/Team/AddTeamMember";
import CreateOvertime from "./layouts/views/Overtime/Create";
import ShowAllOT from "./layouts/views/Overtime/ShowAllOT";
import ShowOTMember from "./layouts/views/Overtime/ShowOTMember";
import Update from "./layouts/views/Overtime/Update.js";
import DateOff from "./layouts/views/DateOff/DateOff";
import GetDateOff from "./layouts/views/DateOff/GetDateOff";
import Document from "./layouts/views/Document/Document";
import Detail from "./layouts/views/Document/Detail";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UpdateProfile,
    layout: "/admin",
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  },
  {
    path: "/addMember/:id/overtime",
    name: "Over time",
    component: CreateOvertime,
    layout: "/admin",
    noMenuItem: true,
    routeType: ["Super Admin", "Manager"]
  },
  {
    path: "/date-off",
    name: "Date off",
    icon: "pe-7s-id",
    component: DateOff,
    layout: "/admin",
    routeType: ["Manager", "Developer", "Intern"]
  },
  {
    path: "/get-date-off",
    name: "DateOff Management",
    icon: "pe-7s-id",
    component: GetDateOff,
    layout: "/admin",
    routeType: ["Super Admin"]
  },
  {
    path: "/editMember/:id/overtime",
    name: "Edit Overtime",
    component: Update,
    layout: "/admin",
    noMenuItem: true,
    routeType: ["Super Admin", "Manager"]
  },
  {
    path: "/table-user",
    name: "Table User",
    icon: "pe-7s-note2",
    component: UserTableList,
    layout: "/admin",
    exact: true,
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  },
  {
    path: "/overtime",
    name: "Show All OT",
    icon: "pe-7s-timer",
    component: ShowAllOT,
    layout: "/admin",
    exact: true,
    routeType: ["Super Admin"]
  },
  {
    path: "/createTeam",
    name: "Team & OT",
    icon: "pe-7s-add-user",
    component: CreateTeam,
    layout: "/admin",
    routeType: ["Super Admin", "Manager"]
  },
  {
    path: "/table-overtime",
    name: "Overtime",
    icon: "pe-7s-timer",
    component: ShowOTMember,
    layout: "/admin",
    routeType: ["Intern", "Developer"]
  },
  {
    path: "/addMember/:id",
    name: "Add User",
    icon: "pe-7s-bell",
    component: AddTeamMember,
    layout: "/admin",
    noMenuItem: true,
    routeType: ["Super Admin", "Manager"]
  },
  {
    path: "/document",
    name: "Document",
    icon: "pe-7s-notebook",
    component: Document,
    layout: "/admin",
    routeType: ["Super Admin", "Manager", "Intern", "Developer"],
    exact: true
  },
  {
    path: "/document/:id/detail",
    name: " Detail",
    component: Detail,
    layout: "/admin",
    noMenuItem: true,
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin",
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin",
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  },
  {
    path: "/table-user/addUser",
    name: "Add User",
    icon: "pe-7s-bell",
    component: AddUser,
    layout: "/admin",
    noMenuItem: true,
    routeType: ["Super Admin"]
  },
  {
    path: "/table-user/:id/edit",
    name: "Edit User",
    icon: "pe-7s-bell",
    component: EditUSer,
    layout: "/admin",
    noMenuItem: true,
    routeType: ["Super Admin"]
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin",
    routeType: ["Super Admin", "Manager", "Intern", "Developer"]
  }
];

export default dashboardRoutes;
