import React, { useState } from "react";

const Cleaning = () => {
  const [services] = useState([
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
      description:
        "Cleaning of windows inside and out for a crystal-clear view.",
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
      description:
        "Cleaning service after events or meetings held in the hotel.",
    },
  ]);

  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    serviceType: "",
    specialInstructions: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle request submission
  const handleRequestSubmit = (e) => {
    e.preventDefault();

    // Create a new cleaning request
    const newRequest = {
      ...formData,
      status: "Pending",
      requestId: new Date().getTime(), // Use timestamp as unique ID
    };

    // Add the new request to the requests list
    setRequests([...requests, newRequest]);

    // Reset form data
    setFormData({
      roomNumber: "",
      serviceType: "",
      specialInstructions: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className=" py-8">
        <h1 className="text-4xl font-bold">Cleaning Services</h1>
        <p className="mt-2 text-lg">
          Request a cleaning service to make your stay even more comfortable.
        </p>
      </header>

      {/* Cleaning Service Options Section */}
      <section className="py-5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mt-4">{service.name}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Request Form Section */}
      <section className="bg-gray-200 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">
            Request a Cleaning Service
          </h2>
          <form
            className="mt-8 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
            onSubmit={handleRequestSubmit}
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold"
                htmlFor="roomNumber"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold"
                htmlFor="serviceType"
              >
                Select Service
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold"
                htmlFor="specialInstructions"
              >
                Special Instructions (Optional)
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* Request Status Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Your Cleaning Requests
          </h2>
          {requests.length === 0 ? (
            <p className="text-center text-gray-600">
              You have no cleaning requests yet.
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.requestId}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-semibold">
                    Room {request.roomNumber}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Service: {request.serviceType}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Special Instructions:{" "}
                    {request.specialInstructions || "None"}
                  </p>
                  <p
                    className={`mt-4 font-semibold ${
                      request.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    Status: {request.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Cleaning;
