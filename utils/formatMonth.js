export default function formatMonth(dateString) {
  if (!dateString) return ""
  const str = typeof dateString === "string" ? dateString : dateString?.toISOString?.()?.slice(0, 10) || String(dateString)
  const parts = str.split("-")
  const year = Number(parts[0])
  const month = Number(parts[1]) - 1
  if (isNaN(year) || isNaN(month) || month < 0 || month > 11) return str
  const date = new Date(year, month, 1)
  return date.toLocaleString("en-US", { month: "long", year: "numeric" })
}