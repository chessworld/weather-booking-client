//NOTE: Date from API comes in format: "yyyy-mm-dd" eg "2023-08-04"

export default function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
