import "./TopNav.css";

// Routing
import { Link } from "react-router-dom";

// Hooks
import { useMemo } from "react";

// lib
import { getInitials } from "../../lib/getInitials";

// Store
import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { useSideNavStore } from "../../store/useSideNavStore";

const TopNav = () => {
  const { authUser } = useAuthStore();
  const { notifications } = useNotificationStore();
  const { setToggleNav } = useSideNavStore();
  const unreadCount = useMemo(
    () => notifications.filter((n) => n.status === "Unread").length,
    [notifications]
  );

  return (
    <div className="py-2 px-3 border">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <i
            className="side-nav-btn bi bi-list"
            onClick={() => setToggleNav()}
          ></i>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="sm-text">
            Welcome {authUser?.fullname || "Guest"}!
          </div>

          <Link
            to="/notifications"
            className="position-relative text-dark text-decoration-none"
          >
            <i className="bi bi-bell-fill fs-5"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

          <div className="profile-pic d-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle fw-medium">{getInitials(authUser?.fullname)}</div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
