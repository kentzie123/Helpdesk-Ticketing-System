// Hooks
import { useEffect, useState, useRef } from "react";

// Stores
import { useUserStore } from "../../store/useUserStore";

const EditUserModal = () => {
  const closeEditUserModalRef = useRef(null);
  const { updateUser, isUpdatingUser, selectedUser, setSelectedUser } =
    useUserStore();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: { roleName: "Client", roleId: 3 },
  });

  useEffect(() => {
    setForm({
      fullname: selectedUser?.fullname || "",
      email: selectedUser?.email || "",
      role: { roleName: selectedUser?.roleName, roleId: selectedUser?.role },
      password: "",
    });
  }, [selectedUser]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updateUserSuccess = await updateUser(form, selectedUser.userID);
    if (!updateUserSuccess) return;
    closeEditUserModalRef.current.click();
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="updateUserModal"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Edit User
        </h5>
        <button
          ref={closeEditUserModalRef}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <form
        onSubmit={handleUpdateUser}
        className="d-flex flex-column justify-content-between offcanvas-body"
      >
        <div className="d-flex flex-column gap-3">
          <div>
            <div className="mb-1">Fullname</div>
            <input
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              value={form?.fullname}
              placeholder="Enter new fullname"
              className="form-control"
              type="text"
              required
            />
          </div>
          <div>
            <div className="mb-1">Email</div>
            <input
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form?.email}
              placeholder="Enter new email"
              className="form-control"
              type="email"
              required
            />
          </div>
          <div>
            <div className="mb-1">New Password (optional)</div>
            <input
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form?.password}
              placeholder="Enter new password"
              className="form-control"
              type="password"
            />
          </div>
          <div>
            <div className="mb-1">Role</div>
            <select
              required
              onChange={(e) =>
                setForm({ ...form, role: JSON.parse(e.target.value) })
              }
              value={JSON.stringify(form?.role)}
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
            disabled={isUpdatingUser}
          >
            {isUpdatingUser ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
