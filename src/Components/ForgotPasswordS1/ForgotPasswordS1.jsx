import "./ForgotPasswordS1.css";

// Routing
import { Link } from "react-router-dom";

// Stores
import { useForgotPasswordStore } from "../../store/useForgotPasswordStore";

// Hooks
import { useEffect, useState } from "react";

const Forgot1 = () => {
  const { cooldown, setEmail, email, requestResetPassCode, isRequestingCode } =
    useForgotPasswordStore();

  const [time, setTime] = useState(0);

  useEffect(()=>{
    setTime(cooldown)
  },[cooldown])

  const handleSendConfirmationCode = (e) => {
    e.preventDefault();
    requestResetPassCode();
  };

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <div className="mb-4 text-center">
        <h4 className="fw-bold">Reset your password</h4>
        <div className="f-size-14 text-muted">
          Enter your email to receive a reset code
        </div>
      </div>

      <form
        onSubmit={handleSendConfirmationCode}
        className="forgot-pass-container d-flex flex-column gap-3 rounded-3 shadow border p-4"
      >
        <div>
          <h5 className="fw-medium text-center">Find your account</h5>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div className="d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium">
              1
            </div>
            <div
              className="bg-secondary-subtle"
              style={{ width: "45px", height: "2px" }}
            ></div>
            <div className="d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 bg-secondary-subtle fw-medium text-muted">
              2
            </div>
            <div
              className="bg-secondary-subtle"
              style={{ width: "45px", height: "2px" }}
            ></div>
            <div className="d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 bg-secondary-subtle fw-medium text-muted">
              3
            </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={cooldown > 0}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary fw-medium"
          disabled={isRequestingCode || time > 0}
        >
          {isRequestingCode
            ? "Sending code..."
            : time > 0
            ? `Please wait ${time}s`
            : "Send reset code"}
        </button>

        <hr />

        <Link to={"/"} className="text-decoration-none f-size-14 text-center">
          <i className="bi bi-arrow-left icon-bold me-1"></i> Back to login
        </Link>
      </form>
    </div>
  );
};

export default Forgot1;
