export function timeDiffFromNow(timeNow: Date) {
  const now = new Date();
  timeNow = new Date(timeNow);
  const diffInSeconds = Math.floor((now.getTime() - timeNow.getTime()) / 1000);

  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000; // Approximate (30 days)
  const secondsInYear = 31536000; // Approximate (365 days)

  if (diffInSeconds < secondsInHour) {
    return "1H ago";
  } else if (diffInSeconds < secondsInDay) {
    return `${Math.round(diffInSeconds / secondsInHour)}H ago`;
  } else if (diffInSeconds < secondsInMonth) {
    return `${Math.round(diffInSeconds / secondsInDay)}D ago`;
  } else if (diffInSeconds < secondsInYear) {
    return `${Math.round(diffInSeconds / secondsInMonth)}M ago`;
  } else {
    return `${Math.round(diffInSeconds / secondsInYear)}Y ago`;
  }
}
