export const formatDate = (dateString) => {
  const localDate = new Date(dateString);
  const now = new Date();

  const isToday = localDate.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = localDate.toDateString() === yesterday.toDateString();

  const time = localDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return `Today ${time}`;
  if (isYesterday) return `Yesterday ${time}`;
  return `${(localDate.getMonth() + 1).toString().padStart(2, "0")}/${localDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${localDate.getFullYear()} ${time}`;
};
