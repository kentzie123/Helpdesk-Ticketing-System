import appLogo from "../../assets/imgs/appLogo.png";
import "./SideNav.css";

// Routing
import { NavLink, useNavigate } from "react-router-dom";

// Store
import { useAuthStore } from "../../store/useAuthStore";
import { usePagePrivilegeStore } from "../../store/usePagePrivilegeStore";
import { useSideNavStore } from "../../store/useSideNavStore";

// Hooks
import { useCallback } from "react";

const SideNav = () => {
  const { logout } = useAuthStore();
  const { checkPageAccess, pagePrivileges } = usePagePrivilegeStore();
  const { navOpen } = useSideNavStore();

  const navigate = useNavigate();

  const canView = useCallback(checkPageAccess, [pagePrivileges]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className="sidenav-cozntainer p-2 border"
      style={navOpen ? { width: "200px" } : { width: "60px" }}
    >
      <div
        className={`d-flex flex-column justify-content-between h-100 ${
          !navOpen ? "align-items-center" : "align-items-start"
        }`}
      >
        <div
          className={`rounded-3 text-decoration-none d-flex gap-2 align-items-center ${
            !navOpen ? "justify-content-center" : ""
          }`}
        >
          <img
            className="app-logo rounded-circle border"
            src={appLogo}
            alt="App Logo"
          />
          {navOpen && (
            <div className="menu-item-text user-select-none fw-bold">
              HELPDESK
            </div>
          )}
        </div>

        <div className="d-flex flex-column gap-3 w-100 fw-medium">
          {canView("Dashboard") && (
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } menu-item rounded-3 text-decoration-none d-flex gap-3 align-items-center ${
                  !navOpen ? "justify-content-center" : ""
                }`
              }
            >
              <i className="bi bi-house-door-fill"></i>
              {navOpen && (
                <div className="menu-item-text user-select-none">Dashboard</div>
              )}
            </NavLink>
          )}

          {canView("Users") && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } menu-item rounded-3 text-decoration-none d-flex gap-3 align-items-center ${
                  !navOpen ? "justify-content-center" : ""
                }`
              }
            >
              <i className="bi bi-people-fill"></i>
              {navOpen && (
                <div className="menu-item-text user-select-none">Users</div>
              )}
            </NavLink>
          )}

          {canView("Tickets") && (
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } menu-item rounded-3 text-decoration-none d-flex gap-3 align-items-center ${
                  !navOpen ? "justify-content-center" : ""
                }`
              }
            >
              <i className="bi bi-ticket-fill"></i>
              {navOpen && (
                <div className="menu-item-text user-select-none">Tickets</div>
              )}
            </NavLink>
          )}

          {canView("Notifications") && (
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } menu-item rounded-3 text-decoration-none d-flex gap-3 align-items-center ${
                  !navOpen ? "justify-content-center" : ""
                }`
              }
            >
              <i className="bi bi-bell-fill"></i>
              {navOpen && (
                <div className="menu-item-text user-select-none">
                  Notifications
                </div>
              )}
            </NavLink>
          )}

          {canView("Reports") && (
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } menu-item rounded-3 text-decoration-none d-flex gap-3 align-items-center ${
                  !navOpen ? "justify-content-center" : ""
                }`
              }
            >
              <i className="bi bi-bar-chart-line-fill"></i>
              {navOpen && (
                <div className="menu-item-text user-select-none">Reports</div>
              )}
            </NavLink>
          )}

          {canView("Knowledge Base") && (
            <NavLink
              to="/knowledge-base"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } menu-item rounded-3 text-decoration-none d-flex gap-3 align-items-center ${
                  !navOpen ? "justify-content-center" : ""
                }`
              }
            >
              <i className="bi bi-book-fill"></i>
              {navOpen && (
                <div className="menu-item-text user-select-none">
                  Knowledge Base
                </div>
              )}
            </NavLink>
          )}
        </div>
        <button
          className="logout-btn d-flex gap-3 btn w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-left"></i>
          {navOpen && <div className="p-0">Logout</div>}
        </button>
      </div>
    </div>
  );
};

export default SideNav;
