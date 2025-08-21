import defaultProfilePic from "../../assets/imgs/default.jpg";
import { NavLink } from "react-router-dom";
import "./TicketCard.css";

// lib
import { timeAgo } from "../../lib/timeAgo";

const TicketCard = ({ ticket, isSelected }) => {
  const {
    ticketId,
    ownerName,
    subject,
    assignedTo,
    status,
    createdDate,
    ownerPic,
  } = ticket;

  const statusColors = {
    Open: "status-open",
    New: "status-new",
    "In Progress": "status-in-progress",
    "For Approval": "status-for-approval",
    Resolved: "status-resolved",
    Closed: "status-closed",
  };

  return (
    <div
      className={`ticket shadow-sm p-1 rounded border ${
        isSelected ? "border-primary" : ""
      }`}
    >
      <div className="p-1">
        {/* Header with status and ticket ID */}
        <div className="d-flex justify-content-between border rounded p-1">
          <div
            className={`ticket-status border rounded px-2 py-1 ${
              statusColors[status] || "bg-light"
            }`}
          >
            {status}
          </div>
          <div className="ticket-id py-1 d-flex align-items-center">
            {ticketId}
          </div>
        </div>

        {/* Main content */}
        <div className="d-flex justify-content-between py-3 px-1">
          <div className="d-flex align-items-center">
            <img
              className="ticket-owner-pic rounded-circle border me-2"
              src={ownerPic ? ownerPic : defaultProfilePic}
              alt={`${ownerName}'s profile`}
              width="40"
              height="40"
            />
            <div>
              <div className="fw-bold f-size-14 text-truncate" style={{maxWidth:"145px"}}>{ownerName}</div>
              <div className="text-muted f-size-12 fw-medium">{subject}</div>
            </div>
          </div>

          <div className="text-muted f-size-12 fw-medium text-nowrap d-flex align-items-center">
            {timeAgo(createdDate)}
          </div>
        </div>

        {/* Footer with assignee and action */}
        <div className="ticket-lower-info d-flex justify-content-between align-items-center px-1">
          <div className="d-flex align-items-center gap-1 small">
            <i className="bi bi-person text-muted icon-bold"></i>
            <span
              className="f-size-12 fw-medium text-muted text-truncate"
              style={{ maxWidth: "200px" }}
            >
              {assignedTo ? assignedTo : "Unassigned"}
            </span>
          </div>

          <NavLink to={`/ticket/${ticketId}`} className="text-decoration-none">
            <button
              type="button"
              className="ticket-more-info btn btn-link p-0 d-flex align-items-center gap-1"
              aria-label={`View details for ticket ${ticketId}`}
            >
              More <i className="bi bi-arrow-right-short"></i>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
