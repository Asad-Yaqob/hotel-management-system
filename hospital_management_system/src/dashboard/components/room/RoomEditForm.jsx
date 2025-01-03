import React, { useDebugValue, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRoomContext } from "../../../context/RoomContext";
import { Loader } from "../reusable/Loader";
import { useStaffAuth } from "../../../context/auth/StaffAuthContext";

const RoomEditForm = ({ room, onCancel }) => {
  const { updateRoom, isLoading, setCurrentRoom } = useRoomContext();
  const { accessToken } = useStaffAuth();

  useEffect(() => {
    console.log(room);
  }, []);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    roomNo: Yup.string()
      .required("Room number is required")
      .matches(/^\d+$/, "Room number must be numeric"),
    roomType: Yup.string().required("Room type is required"),
    capacity: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be a positive number")
      .integer("Capacity must be an integer"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    amenities: Yup.string()
      .required("Amenities are required")
      .test(
        "valid-amenities",
        "Amenities must be comma-separated strings",
        (value) => value.split(",").every((item) => item.trim() !== "")
      ),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      roomNo: room.roomNo || "",
      roomType: room.roomType || "",
      capacity: room.capacity || 0,
      price: room.price || 0,
      amenities: room.amenities ? room.amenities : "",
      description: room.description || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await updateRoom(
        room._id,
        accessToken,
        values.roomNo,
        values.roomType,
        values.capacity,
        values.price,
        values.amenities,
        values.description
      );

      if (response.success) {
        setCurrentRoom({ ...room, ...values });
        toast.dismiss();
        toast.success("Room updated successfully.");
        return;
      }

      toast.dismiss();
      toast.error("Failed to update: " + response.message);
    },
  });

  if (isLoading) {
    return <Loader message="Updating Information..." />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="roomNo"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.roomNo}
          className="w-full p-2 border rounded"
          placeholder="Room Number"
        />
        {formik.touched.roomNo && formik.errors.roomNo && (
          <p className="text-red-500 text-sm">{formik.errors.roomNo}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="roomType"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.roomType}
          className="w-full p-2 border rounded"
          placeholder="Room Type"
        />
        {formik.touched.roomType && formik.errors.roomType && (
          <p className="text-red-500 text-sm">{formik.errors.roomType}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="capacity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.capacity}
          className="w-full p-2 border rounded"
          placeholder="Capacity"
        />
        {formik.touched.capacity && formik.errors.capacity && (
          <p className="text-red-500 text-sm">{formik.errors.capacity}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          className="w-full p-2 border rounded"
          placeholder="Price"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-sm">{formik.errors.price}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="amenities"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amenities}
          className="w-full p-2 border rounded"
          placeholder="Amenities (comma-separated)"
        />
        {formik.touched.amenities && formik.errors.amenities && (
          <p className="text-red-500 text-sm">{formik.errors.amenities}</p>
        )}
      </div>

      <div>
        <textarea
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RoomEditForm;
