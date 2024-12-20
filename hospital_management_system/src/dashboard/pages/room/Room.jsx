import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useStaffAuthContext } from '../../../context/auth/StaffAuthContext';

const Room = () => {

      const { accessToken } = useStaffAuthContext();

    // useEffect(()=> {
    //   console.log(accessToken)
    // },[])  

  const formik = useFormik({
    initialValues: {
      roomNo: '',
      roomType: '',
      capacity: '',
      price: '',
      amenities: '',
      description: '',
      image: null, 
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      
      formData.append('roomNo', values.roomNo);
      formData.append('roomType', values.roomType);
      formData.append('capacity', values.capacity);
      formData.append('price', values.price);
      formData.append('amenities', values.amenities);     
      formData.append('description', values.description);
      formData.append('image', values.image); 

      try {
        const response = await axios.post('http://localhost:8000/api/v1/room/add', formData, {
            headers: accessToken
              ? {
                  Authorization: `Bearer ${accessToken}`,
                }
              : {},
          }
        );

        console.log(response);
        if (response.status === 200) {
          alert('Room added successfully');
        }

      } catch (error) {
        console.error('Error adding room:', error);
        alert('Failed to add room');
      }
    },
  });

  return (
    <div className="rooms bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Management</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Room</h2>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="roomNo"
            value={formik.values.roomNo}
            onChange={formik.handleChange}
            placeholder="Room Number"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="roomType"
            value={formik.values.roomType}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option  value="" disabled>
              Select Room Type
            </option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
          </select>
          <input
            type="number"
            name="capacity"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            placeholder="Capacity"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            placeholder="Rate per Night"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="amenities"
            value={formik.values.amenities}
            onChange={formik.handleChange}
            placeholder="Amenities "
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          
  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={(event) => {
      formik.setFieldValue('image', event.currentTarget.files[0]);
    }}
    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Description"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Room
          </button>
        </form>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Room List</h2>
        <table className="w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Room Number</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Rate</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">101</td>
              <td className="p-2">Deluxe</td>
              <td className="p-2">$120</td>
              <td className="p-2">Available</td>
              <td className="p-2 flex space-x-2">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Room;
