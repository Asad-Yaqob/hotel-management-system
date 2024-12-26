export function convertDateToDDMMYYYY(date) {
  
  if (!date) {
    throw new Error("Date is required");
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    throw new Error("Invalid date format");
  }

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
