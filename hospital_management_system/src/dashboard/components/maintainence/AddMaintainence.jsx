import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const AddMaintainence = ({ rooms, accessToken,report , fetch}) => {
  const formik = useFormik({
    initialValues: {
      roomNo: "",
      issueDescription: "",
    },
    onSubmit: async (values) => {
      // console.log("Form Values:", values);

    const response = await report(
      accessToken,
      values.roomNo,
      values.issueDescription
    );

    if (response.success) {
      await fetch(accessToken);
      toast.dismiss();
      toast.success("Issue reported successfully.");
      return;
    }

     toast.dismiss();
     toast.error(response.message || "Issue reported failed.");
    },
  });

  return (
    <>
      {/* Add Maintenance Request Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Maintenance Request
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            name="roomNo"
            value={formik.values.roomNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.roomNo && formik.errors.roomNo
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="" disabled>
              Select Room Number
            </option>
            {rooms.map((room, index) => (
              <option key={index} value={room._id}>
                {room.roomNo}
              </option>
            ))}
          </select>
          {formik.touched.roomNo && formik.errors.roomNo && (
            <p className="text-red-500 text-sm">{formik.errors.roomNo}</p>
          )}

          <input
            type="text"
            name="issueDescription"
            placeholder="Issue Description"
            value={formik.values.issueDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.issueDescription && formik.errors.issueDescription
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.issueDescription &&
            formik.errors.issueDescription && (
              <p className="text-red-500 text-sm">
                {formik.errors.issueDescription}
              </p>
            )}

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Request
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMaintainence;
