import "./ForgotPasswordS2.css";

// Routing
import { Link } from "react-router-dom";

// Stores
import { useForgotPasswordStore } from "../../store/useForgotPasswordStore";

const Forgot2 = () => {
  const { verifyCode, isVerifyingCode, requestResetPassCode, code, setCode } =
    useForgotPasswordStore();

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <div className="mb-4 text-center">
        <h4 className="fw-bold">Reset your password</h4>
        <div className="f-size-14 text-muted">
          Enter the verification code sent to your email
        </div>
      </div>

      <div className="forgot-pass-container d-flex flex-column gap-3 rounded-3 shadow border p-4">
        <div>
          <h5 className="fw-medium text-center">Verify code</h5>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div className="d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium">
              1
            </div>
            <div
              className="bg-primary"
              style={{ width: "45px", height: "2px" }}
            ></div>
            <div className="d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium">
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
            htmlFor="forgot-pass-code"
            className="form-label f-size-14 fw-medium"
          >
            Verification Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            className="form-control email-signin-input f-size-14 text-center"
            id="forgot-pass-code"
            placeholder="Enter 6-digit code"
            required
            value={code}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) {
                setCode(value);
              }
            }}
          />
        </div>

        <button
          onClick={verifyCode}
          type="submit"
          className="btn btn-primary fw-medium"
          disabled={isVerifyingCode}
        >
          {isVerifyingCode ? "Verifying..." : "Verify code"}
        </button>

        <button
          onClick={requestResetPassCode}
          className="btn btn-link text-decoration-none f-size-14 text-center"
        >
          Didn't receive the code? Resend
        </button>

        <hr />

        <Link to={"/"} className="text-decoration-none f-size-14 text-center">
          <i className="bi bi-arrow-left icon-bold me-1"></i> Back to login
        </Link>
      </div>
    </div>
  );
};

export default Forgot2;
