export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const formatter = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
}
