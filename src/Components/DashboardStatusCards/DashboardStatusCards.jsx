// Store
import { useTicketStore } from "../../store/useTicketStore";

// Hooks
import { useMemo } from "react";


const DashboardStatusCards = () => {
  const { tickets } = useTicketStore();
  const totalTickets = useMemo(() => {
    return tickets.length;
  }, [tickets]);

  const countByStatus = (status) =>
    tickets.filter((t) => t.status === status).length;
  const countByPriority = (priority) =>
    tickets.filter((t) => t.priority === priority).length;

  const resolvedTickets = useMemo(() => countByStatus("Resolved"), [tickets]);
  const pendingTickets = useMemo(() => countByStatus("In Progress"), [tickets]);
  const urgentTickets = useMemo(() => countByPriority("Urgent"), [tickets]);

  

  const statusCards = useMemo(
    () => [
      {
        title: "Total Tickets",
        total: totalTickets,
        bgColor: "bg-primary-subtle",
        txtColor: "text-primary",
        icon: "bi-ticket-perforated",
      },
      {
        title: "Resolved",
        total: resolvedTickets,
        bgColor: "bg-success-subtle",
        txtColor: "text-success",
        icon: "bi-check2-circle",
      },
      {
        title: "Pending",
        total: pendingTickets,
        bgColor: "bg-warning-subtle",
        txtColor: "text-warning",
        icon: "bi-clock",
      },
      {
        title: "Urgent",
        total: urgentTickets,
        bgColor: "bg-danger-subtle",
        txtColor: "text-danger",
        icon: "bi-exclamation-triangle",
      },
    ],
    [totalTickets, resolvedTickets, pendingTickets, urgentTickets]
  );

  return (
    <div className="row">
      {statusCards.map((status, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-3 mt-3">
          <div className="d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3">
            <div
              className={`stat-card-icon-container d-flex align-items-center justify-content-center rounded-3 ${status.bgColor}`}
            >
              <i
                className={`stat-card-icon bi ${status.icon} ${status.txtColor}`}
              ></i>
            </div>
            <div>
              <h5 className="status-card-title text-muted m-0">
                {status.title}
              </h5>
              <h4 className="m-0">{status.total}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatusCards;
