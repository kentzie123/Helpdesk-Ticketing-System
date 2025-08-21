// Hooks
import { useState, useRef } from "react";

// Stores
import { useUserStore } from "../../store/useUserStore";

const CreateUserModal = () => {
  const closeCreateUserModalRef = useRef(null);
  const { createUser, isCreatingUser } = useUserStore();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: { roleName: "Client", roleId: 3 },
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const createUserSuccess = await createUser(form);
    if (!createUserSuccess) return;
    setForm({
      fullname: "",
      email: "",
      password: "",
      role: { roleName: "Client", roleId: 3 },
    });
    closeCreateUserModalRef.current.click();
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="createUserModal"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Create User
        </h5>
        <button
          ref={closeCreateUserModalRef}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <form
        onSubmit={handleCreateUser}
        className="d-flex flex-column justify-content-between offcanvas-body"
      >
        <div className="d-flex flex-column gap-3">
          <div>
            <div className="mb-1">Fullname</div>
            <input
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              value={form.fullname}
              placeholder="Enter fullname"
              className="form-control"
              type="text"
              required
            />
          </div>
          <div>
            <div className="mb-1">Email</div>
            <input
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              placeholder="Enter email"
              className="form-control"
              type="email"
              required
            />
          </div>
          <div>
            <div className="mb-1">Password</div>
            <input
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              placeholder="Enter password"
              className="form-control"
              type="text"
              required
            />
          </div>
          <div>
            <div className="mb-1">Role</div>
            <select
              required
              onChange={(e) =>
                setForm({ ...form, role: JSON.parse(e.target.value) })
              }
              value={JSON.stringify(form.data)}
              className="form-select"
              aria-label="Default select example"
            >
              <option value={JSON.stringify({ roleName: "Client", roleId: 3 })}>
                Client
              </option>
              <option value={JSON.stringify({ roleName: "Staff", roleId: 2 })}>
                Staff
              </option>
              <option value={JSON.stringify({ roleName: "Admin", roleId: 1 })}>
                Admin
              </option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isCreatingUser}
          >
            {isCreatingUser ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
