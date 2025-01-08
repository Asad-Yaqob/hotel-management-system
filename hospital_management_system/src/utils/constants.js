export const roles = ["manager", "housekeeping", "maintainence", "receptionist", "admin"];
export const baseURl = "https://luxurystay-hospitality-backend.onrender.com/api/v1";
// export const baseURl = "http://localhost:8080/api/v1";

export const STATUS_OPTIONS = [
  "clean",
  "dirty",
  "out-of-service",
  "maintenance",
];

export const AVAILABILITY_OPTIONS = ["available", "occupied"];

export const STATUS_COLORS = {
  clean: "bg-green-100 text-green-800",
  dirty: "bg-yellow-100 text-yellow-800",
  "out-of-service": "bg-red-100 text-red-800",
  maintenance: "bg-orange-100 text-orange-800",
};

export const services = [
  {
    id: 1,
    name: "Room Cleaning",
    description:
      "General cleaning including dusting, sweeping, and refreshing linens.",
  },
  {
    id: 2,
    name: "Deep Cleaning",
    description:
      "Detailed cleaning of all areas including hard-to-reach places.",
  },
  {
    id: 3,
    name: "Window Cleaning",
    description: "Cleaning of windows inside and out for a crystal-clear view.",
  },
  {
    id: 4,
    name: "Laundry Service",
    description:
      "Cleaning of guest laundry items like clothes, linens, and towels.",
  },
  {
    id: 5,
    name: "Post-Event Cleaning",
    description: "Cleaning service after events or meetings held in the hotel.",
  },
];