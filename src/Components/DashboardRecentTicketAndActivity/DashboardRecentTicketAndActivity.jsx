// Store
import { useDashboardStore } from "../../store/useDashboardStore";

// Hooks
import { useEffect, useMemo } from "react";

// Routing
import { Link } from "react-router-dom";

// lib
import { formatDate } from "../../lib/formatDate";

const DashboardRecentTicketAndActivity = () => {
  const {
    getRecentTickets,
    getRecentNotifications,
    recentTickets,
    recentNotifications,
  } = useDashboardStore();

  useEffect(()=>{
    getRecentTickets();
    getRecentNotifications();
  },[]);

  const priorityColors = {
    Urgent: "bg-danger-subtle text-danger",
    High: "bg-warning-subtle text-warning",
    Medium: "bg-info-subtle text-info",
    Low: "bg-secondary-subtle text-secondary",
  };

  return (
    <div className="row row-cols-1 row-cols-md-2 dashboard-content-container">
      <div className="col p-3 h-100">
        <div
          className=" border shadow-sm rounded-3 p-3"
          style={{ minHeight: "130px", height: "100%" }}
        >
          <h5 className="mb-3">Recent Tickets</h5>
          <div className="recent-ticket-container d-flex flex-column gap-2">
            {recentTickets?.length > 0 ? (
              recentTickets?.map((ticket, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between bg-body-secondary p-3 rounded-2"
                >
                  <div className="d-flex flex-column justify-content-center">
                    <div className="fw-medium">{ticket.ticketId}</div>
                    <p className="recent-ticket-description text-muted m-0">
                      {ticket.subject}
                    </p>
                  </div>
                  <div className="d-flex flex-column justify-content-between gap-1">
                    <div
                      className={`recent-ticket-priority-status rounded-pill px-3 py-1 fw-medium ${
                        priorityColors[`${ticket.priority}`]
                      }`}
                    >
                      {ticket.priority}
                    </div>
                    <Link
                      className="recent-ticket-link text-decoration-none"
                      to={`/ticket/${ticket.ticketId}`}
                    >
                      Details <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No recent ticket</p>
            )}
          </div>
        </div>
      </div>

      <div className="col p-3 h-100">
        <div
          className="border shadow-sm rounded-3 p-3"
          style={{ minHeight: "130px", height: "100%" }}
        >
          <h5 className="mb-3">Recent Activity</h5>
          <div className="recent-activity-container d-flex flex-column gap-3 p-1">
            {recentNotifications?.length > 0 ? (
              recentNotifications?.map((notif, index) => (
                <div key={index} className="d-flex gap-3">
                  <div className="circle bg-primary mt-2"></div>
                  <div>
                    <div className="recent-activity-descp fw-medium">
                      {notif.message}
                    </div>
                    <div className="text-muted recent-activity-date">
                      {formatDate(notif.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecentTicketAndActivity;
