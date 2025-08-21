import "./SignupModal.css";

// Component
import OuterNotificationToast from "../OuterNotificationToast/OuterNotificationToast";

// For routing
import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

// Toast notification
import { toast } from "react-toastify";

// Store
import { useSignupStore } from "../../store/useSignupStore";

const SignupModal = () => {
  const {
    signupPhase1ConfirmationCode,
    isSigningUp,
  } = useSignupStore();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isConfirmPassHidden, setIsConfirmPassHidden] = useState(true);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    signupPhase1ConfirmationCode(form);
    setForm({
      fullname: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
  };

  // useEffect(()=>{
  //   console.log(isSignupRequestCodeSuccess);
    
  // }, [isSignupRequestCodeSuccess])

  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100">
      <div className="text-center mb-4">
        <h4 className="fw-bold">Create your account</h4>
        <div className="text-muted f-size-14">
          Join the helpdesk management system
        </div>
      </div>

      <form className="p-4 rounded-3 shadow border" onSubmit={handleSignup}>
        <h5 className="fw-medium text-center mb-4">Sign Up</h5>

        <div className="signup-container d-flex flex-column gap-2">
          <div>
            <label
              htmlFor="fullname-signup"
              className="form-label f-size-14 fw-medium"
            >
              Fullname
            </label>
            <div className="position-relative">
              <i className="bi bi-person text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <input
                type="text"
                className="form-control ps-5 email-signin-input f-size-14"
                id="fullname-signup"
                placeholder="Enter your name"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email-signup"
              className="form-label f-size-14 fw-medium"
            >
              Email
            </label>
            <div className="position-relative">
              <i className="bi bi-envelope text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <input
                type="email"
                className="form-control ps-5 email-signin-input f-size-14"
                id="email-signup"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password-signup"
              className="form-label f-size-14 fw-medium"
            >
              Password
            </label>
            <div className="position-relative">
              <i className="bi bi-lock text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <i
                onClick={() => setIsPassHidden((prev) => !prev)}
                className={`bi ${
                  isPassHidden ? "bi-eye" : "bi-eye-slash"
                } password-hide-icon text-secondary position-absolute top-50 end-0 translate-middle-y me-3 icon-bold`}
                style={{ cursor: "pointer" }}
              ></i>
              <input
                type={isPassHidden ? "password" : "text"}
                className="form-control ps-5 pe-5 password-signin-input f-size-14"
                id="password-signup"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password-signup"
              className="form-label f-size-14 fw-medium"
            >
              Confirm Password
            </label>
            <div className="position-relative">
              <i className="bi bi-lock text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <i
                onClick={() => setIsConfirmPassHidden((prev) => !prev)}
                className={`bi ${
                  isConfirmPassHidden ? "bi-eye" : "bi-eye-slash"
                } password-hide-icon text-secondary position-absolute top-50 end-0 translate-middle-y me-3 icon-bold`}
                style={{ cursor: "pointer" }}
              ></i>
              <input
                type={isConfirmPassHidden ? "password" : "text"}
                className="form-control ps-5 pe-5 password-signin-input f-size-14"
                id="confirm-password-signup"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary fw-medium"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Please wait..." : "Create Account"}
          </button>

          <hr />

          <div className="text-center f-size-14">
            <span>Already have an account?</span>
            <Link className="text-decoration-none fw-medium ms-1" to={"/login"}>
              Sign in
            </Link>
          </div>
        </div>
      </form>

      
    </div>
  );
};

export default SignupModal;
