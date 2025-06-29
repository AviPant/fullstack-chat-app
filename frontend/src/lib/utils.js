export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata", // Explicitly force IST
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}