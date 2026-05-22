function getDateObject(date) {
  return new Date(date);
}

export function formatDate(isoString) {
  if (!isoString) {
    return "-";
  }

  return getDateObject(isoString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(isoString) {
  if (!isoString) {
    return "-";
  }

  return getDateObject(isoString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export function formatRelativeTime(isoString) {
  if (!isoString) {
    return "-";
  }

  const now = new Date();

  const target = new Date(isoString);

  const diffInSeconds = Math.floor((now - target) / 1000);

  const minute = 60;
  const hour = 3600;
  const day = 86400;

  if (diffInSeconds < minute) {
    return "Baru saja";
  }

  if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);

    return `${minutes} menit yang lalu`;
  }

  if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);

    return `${hours} jam yang lalu`;
  }

  const days = Math.floor(diffInSeconds / day);

  return `${days} hari yang lalu`;
}