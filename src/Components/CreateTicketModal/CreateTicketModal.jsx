// Hooks
import { useState, useRef } from "react";

//Store
import { useUserStore } from "../../store/useUserStore";
import { useTicketStore } from "../../store/useTicketStore";

const CreateTicketModal = () => {
  const { isCreatingTicket, createTicket } = useTicketStore();
  const { users } = useUserStore();
  const [data, setData] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "",
    assignedTo: null,
    targetResolveDate: "",
  });

  const createTicketClsBtn = useRef(null);

  const handleCreateTicket = async () => {
    const createTicketSuccess = await createTicket(data);
    if (!createTicketSuccess) return;

    // Reset data and close modal
    createTicketClsBtn.current.click();
    setData({
      subject: "",
      description: "",
      category: "",
      priority: "",
      assignedTo: null,
      targetResolveDate: "",
    });
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="staticBackdrop"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Create ticket
        </h5>
        <button
          type="button"
          ref={createTicketClsBtn}
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="d-flex flex-column justify-content-between offcanvas-body">
        <div className="d-flex flex-column gap-3">
          <div>
            <div className="mb-1">Subject</div>
            <input
              className="form-control"
              type="text"
              onChange={(e) => {
                setData({ ...data, subject: e.target.value });
              }}
              value={data.subject}
            />
          </div>
          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              value={data.description}
              className="form-control"
              id="description"
              rows="3"
            ></textarea>
          </div>
          <div>
            <div className="mb-1">Category</div>
            <select
              onChange={(e) => {
                setData({ ...data, category: e.target.value });
              }}
              value={data.category}
              className="form-select"
              aria-label="Category"
            >
              <option value="" hidden>
                Select a category
              </option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Account Access">Account Access</option>
              <option value="Hardware Request">Hardware Request</option>
              <option value="Software Installation">
                Software Installation
              </option>
              <option value="Network Problem">Network Problem</option>
              <option value="Maintenance Request">Maintenance Request</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <div className="mb-1">Priority</div>
            <select
              onChange={(e) => {
                setData({ ...data, priority: e.target.value });
              }}
              value={data.priority}
              className="form-select form-select"
              aria-label="Priority"
            >
              <option value="" hidden>
                Select priority level
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div>
            <div className="mb-1">Assign to</div>
            <select
              onChange={(e) =>
                setData({ ...data, assignedTo: JSON.parse(e.target.value) })
              }
              value={JSON.stringify(data.assignedTo)}
              className="form-select"
            >
              <option value="" hidden>
                Select Assignee
              </option>
              {users.filter((user)=> user.role !== 3).map((fn) => (
                <option
                  key={fn.userID}
                  value={JSON.stringify({
                    userID: fn.userID,
                    fullname: fn.fullname,
                  })}
                >
                  {fn.fullname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1">Target resolve date</div>
            <input
              onChange={(e) => {
                setData({ ...data, targetResolveDate: e.target.value });
              }}
              value={data.targetResolveDate}
              type="date"
              className="form-control"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleCreateTicket}
            type="button"
            className="btn btn-primary w-100"
            disabled={isCreatingTicket}
          >
            {isCreatingTicket ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModal;
