// React & Router
import { useCallback, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Toast notification
import { ToastContainer } from "react-toastify";

// Layouts
import Layout from "./Layouts/Layout";

// Pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Forgot from "./pages/Forgot/Forgot";
import Tickets from "./pages/Tickets/Tickets";
import TicketInfo2 from "./pages/TicketInfo/TicketInfo";
import Users from "./pages/Users/Users";
import Notifications from "./pages/Notifications/Notifications";
import Dashboard from "./pages/Dashboard/Dashboard";
import Reports from "./pages/Reports/Reports";
import KnowledgeBase from "./pages/KnowledgeBase/KnowledgeBase";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Page403 from "./pages/Page403/Page403";

// Components
import NotificationToastResponse from "./Components/NotificationToastResponse/NotificationToastResponse";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import OuterNotificationToast from "./Components/OuterNotificationToast/OuterNotificationToast";

// Store
import { useAuthStore } from "./store/useAuthStore";
import { usePagePrivilegeStore } from "./store/usePagePrivilegeStore";
import { useSignupStore } from "./store/useSignupStore";
import { useNotificationStore } from "./store/useNotificationStore";
import { useForgotPasswordStore } from "./store/useForgotPasswordStore";

// Route guard
const ProtectedRoute = ({ canAccess, children }) => {
  console.log(canAccess);
  if (!authUser) return <Navigate to="/login" />;
  if (!canAccess) return <Navigate to="/403" />;
  return children;
};

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {
    isSignupRequestCodeSuccess,
    setIsSignupRequestCodeSuccess,
    isEmailVerificationSuccess,
    setIsEmailVerificationSuccess,
  } = useSignupStore();
  const { popupNotification } = useNotificationStore();
  const { checkPageAccess, pagePrivileges } = usePagePrivilegeStore();
  const {
    isRequestCodeSuccess,
    setIsRequestCodeSuccess,
    isResetPasswordSuccess,
    setIsResetPasswordSuccess,
  } = useForgotPasswordStore();

  // Page access check
  const canView = useCallback(checkPageAccess, [pagePrivileges]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  let isReady = !isCheckingAuth && pagePrivileges.length > 0;

  if (isCheckingAuth && !authUser) {
    <LoadingSpinner />;
  }

  return (
    <div className="position-relative">
      {/* Toast Component */}
      <ToastContainer />

      {/* Global Notification */}
      {popupNotification && <NotificationToastResponse />}

      {isRequestCodeSuccess && (
        <OuterNotificationToast
          state={isRequestCodeSuccess}
          setState={setIsRequestCodeSuccess}
          title={"Request code sent"}
          content={"Please check your email for the password reset code."}
        />
      )}

      {isResetPasswordSuccess && (
        <OuterNotificationToast
          state={isResetPasswordSuccess}
          setState={setIsResetPasswordSuccess}
          title={"Password reset successful"}
          content={
            "Your password has been reset. You can now sign in with your new password."
          }
        />
      )}

      {isSignupRequestCodeSuccess && (
        <OuterNotificationToast
          state={isSignupRequestCodeSuccess}
          setState={setIsSignupRequestCodeSuccess}
          title={"Request code sent"}
          content={"Please check your email for the password reset code."}
        />
      )}

      {isEmailVerificationSuccess && (
        <OuterNotificationToast
          state={isEmailVerificationSuccess}
          setState={setIsEmailVerificationSuccess}
          title={"Email verified"}
          content={
            "Your account has been successfully verified. You can now sign in."
          }
        />
      )}

      {/* Loader */}

      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/tickets" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/tickets" /> : <Signup />}
        />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/403" element={<Page403 />} />

        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Dashboard")}>
                  <Dashboard />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/tickets"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Tickets")}>
                  <Tickets />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/ticket/:id"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Tickets")}>
                  <TicketInfo2 />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/users"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Users")}>
                  <Users />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Notifications")}>
                  <Notifications />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/reports"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Reports")}>
                  <Reports />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/knowledge-base"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Knowledge Base")}>
                  <KnowledgeBase />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/knowledge-base/:slug"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView("Knowledge Base")}>
                  <ArticleInfo />
                </ProtectedRoute>
              )
            }
          />
        </Route>

        {/* Fallback route for unmatched paths (optional) */}
        <Route path="*" element={<Navigate to="/403" />} />
      </Routes>
    </div>
  );
}

export default App;
