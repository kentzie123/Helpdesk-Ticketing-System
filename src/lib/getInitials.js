export const getInitials = (fullname) => {
  if (!fullname) return "";

  const parts = fullname.trim().split(" ");
  const firstInitial = parts[0]?.charAt(0).toUpperCase();

  if (parts.length === 1) return firstInitial;

  const lastInitial = parts[parts.length - 1]?.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};
