import React, { useEffect, useState } from "react";
import axios from "axios";

import AddService from "../components/service/AddService";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { baseURl } from "../../utils/constants";

const Service = () => {
  const [showAddService, setShowAddService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);

  const { accessToken } = useStaffAuth();
  
  // const [services, setServices] = useState([
  //   {
  //     id: 1,
  //     name: "Pick and Drop",
  //     description: "Transport services to and from the airport or city center.",
  //     available: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Room Service",
  //     description: "Order food and drinks directly to your room.",
  //     available: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Laundry Service",
  //     description: "Get your clothes cleaned and delivered to your room.",
  //     available: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Concierge Service",
  //     description: "Get recommendations for local attractions and bookings.",
  //     available: false,
  //   },
  //   {
  //     id: 5,
  //     name: "Extra Bed Request",
  //     description: "Request an additional bed in your room.",
  //     available: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Maintenance Request",
  //     description: "Request room repairs or maintenance.",
  //     available: true,
  //   },
  // ]);

  // Toggle service availability

  useEffect(() => {
    const loadData = async () => {
      await getServices(accessToken);
    };

    loadData();
  }, []);

  const toggleServiceAvailability = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === id
          ? { ...service, available: !service.available }
          : service
      )
    );
  };

  const getServices = async (accessToken) => {
    if (!accessToken) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`${baseURl}/service/get-services`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        setServices(response.data.data);
        return { success: true };
      }

      return {
        success: true,
        message: response.data || "Failed to fetch data",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch data",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (name, description, price, accessToken) => {
    if (!accessToken || !name || !description || !price) {
      return { success: false, message: "All fields are required" };
    }

    try {

      setIsLoading(true);

      const response = await axios.post(
        `${baseURl}/service/add`,
        { name, description, price },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status < 400) {
         return { success: true };
      }

      return {
        success: false,
        message: response.data || "Failed to add service",
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to add service",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold">Hotel  Services</h1>
        <p className="mt-2 text-lg">Manage and Book Services for Your Stay</p>
      </header>

      <div className="mb-6 px-4 pt-4">
        <button
          onClick={() => setShowAddService((prev) => !prev)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {showAddService ? "Hide Add Service" : "Add Service"}
        </button>
      </div>

      {showAddService && (
        <AddService
          accessToken={accessToken}
          isLoading={isLoading}
          fetchServices={getServices}
          addService={addService}
        />
      )}

      {/* Service List Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mt-4">{service.name}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-sm ${
                    service.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {service.available ? "Available" : "Not Available"}
                </span>
                <button
                  onClick={() => toggleServiceAvailability(service.id)}
                  className={`bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition-colors`}
                >
                  {service.available
                    ? "Mark as Unavailable"
                    : "Mark as Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;
