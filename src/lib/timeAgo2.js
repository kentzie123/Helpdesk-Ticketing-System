export const timeAgo2 = (dateString) => {
      if (!dateString) return 'Recently';
      try {
          const date = new Date(dateString);
          const now = new Date();
          const seconds = Math.floor((now - date) / 1000);
          if (isNaN(seconds)) return 'Recently';

          if (seconds < 60) return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
          const hours = Math.floor(minutes / 60);
          if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
          const days = Math.floor(hours / 24);
          if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
          const weeks = Math.floor(days / 7);
          if (weeks < 4) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
          const months = Math.floor(days / 30);
          if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
          const years = Math.floor(days / 365);
          return years === 1 ? '1 year ago' : `${years} years ago`;
      } catch {
          return 'Recently';
      }
  };