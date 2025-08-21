import "./Notifications.css";

// Components
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";

// Hooks
import { useState, useMemo, useEffect } from "react";

// Store
import { useNotificationStore } from "../../store/useNotificationStore";

const Notifications = () => {
  const {
    notifications,
    clearAllNotifications,
    markAllNotificationsRead,
    getNotifications,
    deleteNotification,
    selectedNotification,
    showDeleteNotificationModal,
    setShowDeleteNotificationModal
  } = useNotificationStore();

  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    getNotifications();
  }, []);

  const filteredNotifications =
    filterBy === "All"
      ? notifications
      : notifications.filter(
          (notification) => notification.status === filterBy
        );

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.status === "Unread").length;
  });

  return (
    <div className="p-2">
      {showDeleteNotificationModal && (
        <DeleteModal
          setShowModal={setShowDeleteNotificationModal}
          title={"Delete Notification"}
          message={
            "Are you sure you want to delete this notification? This will permanently remove the notification."
          }
          deleteHandler={deleteNotification}
          selectedItemId={selectedNotification.notificationId}
          selectedItemContent={selectedNotification.message}
        />
      )}
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4>Notifications</h4>
          <div className="d-flex gap-2">
            <button
              onClick={markAllNotificationsRead}
              type="button"
              className="btn btn-light border f-size-14"
            >
              Mark All Read
            </button>
            <button
              onClick={clearAllNotifications}
              type="button"
              className="btn btn-light border f-size-14"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="d-flex gap-3 border-bottom pb-2 mb-3">
          <button
            onClick={() => setFilterBy("All")}
            type="button"
            className={`btn ${
              filterBy === "All" ? "btn-primary" : "btn-light"
            } f-size-14`}
          >
            {`All (${notifications.length})`}
          </button>
          <button
            onClick={() => setFilterBy("Unread")}
            type="button"
            className={`btn ${
              filterBy === "Unread" ? "btn-primary" : "btn-light"
            } f-size-14`}
          >
            {`Unread (${unreadCount})`}
          </button>
        </div>

        <div className="d-flex flex-column gap-3 notification-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              return (
                <NotificationCard
                  key={notification.notificationId}
                  notification={notification}
                />
              );
            })
          ) : (
            <div className="text-center text-secondary">
              <p>No notifications available</p>
              <p className="text-muted">
                You will see notifications here when you recieve them
              </p>
            </div>
          )}
          {/* <NotificationCard notification={notification}/> */}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
