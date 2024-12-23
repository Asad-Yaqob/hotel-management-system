import { useRef } from "react";
import { Image } from "lucide-react";
import { toast } from "react-toastify";

export default function RoomImage({ image, roomNo, accessToken, onImageUpdate }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // console.log("File: ", file);
    // console.log("Room ID: ", roomNo);
    // console.log("Access Token: ", accessToken);

    if (file && onImageUpdate) {
      const response = await onImageUpdate(file, roomNo, accessToken);
      console.log("Response: ", response);

      if (response.success) {
        toast.dismiss();
        toast.success("Image updated successfully.");
      } else {
        toast.dismiss();
        toast.error("Failed to update image: " + response.message);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative">
      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304"
        }
        alt={`Room ${roomNo}`}
        className="w-full h-96 object-cover rounded-lg"
      />
      <button
        onClick={handleButtonClick}
        className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 flex items-center justify-center group"
      >
        <Image className="w-5 h-5 text-gray-700" />
        {/* Tooltip */}
        <span className="absolute bottom-12 right-0 mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
          Change Image
        </span>
      </button>
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
