import React, { useState } from 'react'

const Service = () => {

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Pick and Drop",
      description: "Transport services to and from the airport or city center.",
      available: true,
    },
    {
      id: 2,
      name: "Room Service",
      description: "Order food and drinks directly to your room.",
      available: true,
    },
    {
      id: 3,
      name: "Laundry Service",
      description: "Get your clothes cleaned and delivered to your room.",
      available: true,
    },
    {
      id: 4,
      name: "Concierge Service",
      description: "Get recommendations for local attractions and bookings.",
      available: false,
    },
    {
      id: 5,
      name: "Extra Bed Request",
      description: "Request an additional bed in your room.",
      available: true,
    },
    {
      id: 6,
      name: "Maintenance Request",
      description: "Request room repairs or maintenance.",
      available: true,
    },
  ]);

  // Toggle service availability
  const toggleServiceAvailability = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, available: !service.available }
          : service
      )
    );
  };


   return (
     <div className="min-h-screen">
       {/* Header Section */}
       <header className="">
         <h1 className="text-4xl font-bold">Hotel Room Services</h1>
         <p className="mt-2 text-lg">Manage and Book Services for Your Stay</p>
       </header>

       {/* Service List Section */}
       <section className="py-16 px-4">
         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
           {services.map((service) => (
             <div
               key={service.id}
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
}

export default Service
