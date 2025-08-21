import "./Tickets.css";

// Hooks
import { useState } from "react";

// Components
import TicketCard from "../../Components/TicketCard/TicketCard";
import CreateTicketModal from "../../Components/CreateTicketModal/CreateTicketModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

// Store
import { useTicketStore } from "../../store/useTicketStore";

const Tickets = () => {
  const {
    tickets,
    handleToggleTicketSelection,
    selectedTickets,
    setDeleteTicketsModal,
    showDeleteTicketsModal,
    deleteSelectedTickets,
  } = useTicketStore();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sort: "newest",
  });

  const filteredTickets = tickets
    .filter(
      (ticket) =>
        ticket.ticketId.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((ticket) =>
      filters.status ? ticket.status === filters.status : true
    )
    .sort((a, b) => {
      if (filters.sort === "newest") {
        return new Date(b.createdDate) - new Date(a.createdDate);
      } else {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
    });

  return (
    <div className="main-ticket-container p-2">
      <h4 className="mb-3">Tickets</h4>
      <div className="border rounded shadow-sm container-fluid mb-3">
        <div className="row py-4 px-3">
          <div className="col-md-3">
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ID or Subject"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <button
              className="d-flex align-items-center gap-1 btn btn-primary w-100 h-100 fw-medium"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
            >
              <i className="bi bi-plus-lg icon-bold"></i>
              <span>Create ticket</span>
            </button>
            <CreateTicketModal />
          </div>
        </div>
      </div>
      <div className="border rounded shadow-sm py-4 px-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between mb-3">
            <h4>Tickets ({tickets.length})</h4>
            {selectedTickets.length > 0 && (
              <button
                onClick={() => {
                  setDeleteTicketsModal(true);
                  console.log("Selected Ticket:", selectedTickets);
                }}
                className="btn btn-danger fw-medium"
              >
                <i className="bi bi-trash me-2 icon-bold"></i>
                <span>Delete Selected ({selectedTickets.length})</span>
              </button>
            )}
            {showDeleteTicketsModal && (
              <DeleteModal
                setShowModal={setDeleteTicketsModal}
                title={"Delete Selected Tickets"}
                message={
                  "Are you sure you want to delete this selected tickets? This will permanently remove the tickets."
                }
                deleteHandler={deleteSelectedTickets}
                selectedItemId={selectedTickets}
                selectedItemContent={`Selected Tickets: ${selectedTickets.length}`}
              />
            )}
          </div>
          <div className="tickets-container border border-secondary rounded m-1 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 p-2 g-3 overflow-y-scroll">
            {filteredTickets.map((ticket) => (
              <div
                className="ticket-container p-1"
                key={ticket.ticketId}
                onClick={() => {
                  handleToggleTicketSelection(ticket._id);
                }}
              >
                <TicketCard
                  isSelected={selectedTickets.includes(ticket._id)}
                  ticket={ticket}
                />
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="w-100 text-center py-5">
                <h5>No tickets found</h5>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
