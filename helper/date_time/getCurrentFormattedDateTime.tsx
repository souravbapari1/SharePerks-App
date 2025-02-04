export function getCurrentFormattedDateTime(): string {
  const now = new Date();

  // Helper function to pad numbers with leading zeros
  const pad = (num: number) => num.toString().padStart(2, "0");

  // Extract components of the date and time
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = pad(now.getMinutes());

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  // Build the formatted string
  return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
}
export function getRemainingTime(offerEndDateString: string): string {
  // Parse the offer end date string into a Date object
  const offerEndDate = new Date(offerEndDateString);

  // Get the current date and time
  const now = new Date();

  // If the offer end date is today, set it to the end of the day
  if (offerEndDate.toDateString() === now.toDateString()) {
    offerEndDate.setHours(23, 59, 59, 999); // Set to end of the day
  }

  // Calculate the difference in milliseconds
  const remainingTimeMs = offerEndDate.getTime() - now.getTime();

  // Check if the offer has ended
  if (remainingTimeMs < 0) {
    return "00:00"; // Offer has ended
  }

  // Convert milliseconds to hours and minutes
  const remainingMinutes = Math.floor(remainingTimeMs / (1000 * 60));
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  // Format the remaining time as "HH:MM"
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export function isDatePassed(date: string): boolean {
  const today = new Date();
  const inputDate = new Date(date);

  // Reset time for both dates to ensure only the date part is compared
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate <= today;
}

export function getOfferProgress(endDateStr: string): number {
  // Get today's date in UTC
  const now = new Date();

  // Convert the end date string to a Date object
  const endDate = new Date(endDateStr);

  // Create a date object for the start of the day in UTC
  const startDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  // Calculate the total duration of the offer period in milliseconds
  const totalDurationMs = endDate.getTime() - startDate.getTime();

  // Calculate the elapsed time from the start of the offer to the current time
  const elapsedTimeMs = now.getTime() - startDate.getTime();

  // Calculate the progress percentage
  let progressPercentage = 0;

  if (elapsedTimeMs < 0) {
    // The offer has not started yet
    progressPercentage = 0;
  } else if (elapsedTimeMs > totalDurationMs) {
    // The offer has ended
    progressPercentage = 100;
  } else {
    // The offer is in progress
    progressPercentage = (elapsedTimeMs / totalDurationMs) * 100;
  }

  return +progressPercentage.toFixed(2);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Format the date to "YYYY-MM-DD"
  const formattedDate = date.toLocaleDateString("en-CA", options);

  return formattedDate.split("/").reverse().join("-");
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Define time intervals in seconds
  const intervals: { [key: string]: number } = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    week: 60 * 60 * 24 * 7,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  for (const interval in intervals) {
    const value = Math.floor(seconds / intervals[interval]);

    if (value >= 1) {
      return value === 1
        ? `${value} ${interval} ago`
        : `${value} ${interval}s ago`;
    }
  }

  return "just now";
}
