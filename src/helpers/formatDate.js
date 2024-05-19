export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function formatHour(dateString) {
  const date = new Date(dateString);

  const formattedHour = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return formattedHour;
}
