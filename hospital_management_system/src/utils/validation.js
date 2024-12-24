export function validateDates(checkInDate, checkOutDate) {
  if (!checkInDate || !checkOutDate) {
    return "Please select both check-in and check-out dates";
  }

  if (new Date(checkOutDate) <= new Date(checkInDate)) {
    return "Check-out date must be after check-in date";
  }

  return null;
}
