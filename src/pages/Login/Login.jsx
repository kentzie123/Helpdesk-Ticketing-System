import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

// Store
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const { login } = useAuthStore();
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleHidePassword = () => {
    setIsPassHidden((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = await login({ email, password });
    if(!isValid) return;
    setEmail("");
    setPassword("");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="login-container w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <h4 className="fw-bold">Sign in to your account</h4>
          <div className="text-muted f-size-14">
            Access the helpdesk management system
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-3 border shadow p-4 bg-white"
        >
          <h5 className="fw-medium text-center mb-4">Login</h5>

          <div className="mb-3">
            <label
              htmlFor="email-signin"
              className="form-label f-size-14 fw-medium"
            >
              Email
            </label>
            <div className="position-relative">
              <i className="bi bi-envelope text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <input
                type="text"
                className="form-control ps-5 email-signin-input f-size-14"
                id="email-signin"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="password-signin"
              className="form-label f-size-14 fw-medium"
            >
              Password
            </label>
            <div className="position-relative">
              <i className="bi bi-lock text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <i
                onClick={handleHidePassword}
                className={`bi ${
                  isPassHidden ? "bi-eye" : "bi-eye-slash"
                } password-hide-icon text-secondary position-absolute top-50 end-0 translate-middle-y me-3 icon-bold`}
                style={{ cursor: "pointer" }}
              ></i>
              <input
                type={isPassHidden ? "password" : "text"}
                className="form-control ps-5 pe-5 password-signin-input f-size-14"
                id="password-signin"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <Link
              className="f-size-14 text-decoration-none"
              to={"/forgot-password"}
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary f-size-14 w-100 fw-medium"
          >
            Sign in
          </button>

          <hr />

          <div className="text-center f-size-14">
            <span>Don't have an account?</span>
            <Link
              className="text-decoration-none fw-medium ms-1"
              to={"/signup"}
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
