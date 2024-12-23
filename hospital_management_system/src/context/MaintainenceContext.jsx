import { createContext, useContext, useState } from "react";
import { baseURl } from "../utils/constants";
import axios from "axios";

const MaintainenceContext = createContext();

export const useMaintainenceContext = () => {
  return useContext(MaintainenceContext);
};

export const MaintainenceProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mainRequests, setMainRequests] = useState([]);
  const [statuses, setStatuses] = useState({});

  const fetchMaintainenceRequests = async (accessToken) => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURl}/maintainence/requests`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // console.log(response.data.data.requests);

      if (response.status === 200) {
        setMainRequests(response.data.data.requests);
      }
    } catch (error) {
      console.error("Error fetching cleaning requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

 const handleStatusChange = (maintainenceId, newStatus) => {
//    console.log(`Changing status for ${maintainenceId} to ${newStatus}`);
   setStatuses((prevStatuses) => ({
     ...prevStatuses,
     [maintainenceId]: newStatus,
   }));
//    console.log("Updated statuses:", statuses);
 };

 const handleUpdateStatus = async (maintainenceId, accessToken) => {

   if (!accessToken) return;
   const newStatus =
     statuses[maintainenceId] || "reported";

   if (!newStatus) {
     console.error(`No status found for ${maintainenceId}`);
     return;
   }

   console.log("Updating status:", newStatus);

   try {
     setIsLoading(true);
     const response = await axios.patch(
       `${baseURl}/maintainence/update/${maintainenceId}`,
       { status: newStatus },
       {
         withCredentials: true,
         headers: { Authorization: `Bearer ${accessToken}` },
       }
     );

     console.log(response.data)

     if (response.status === 200) {
       console.log("Status updated successfully");
       return { success: true, message: "Status updated." };
     }

     return { success: false, message: "Failed to update status." };
   } catch (error) {
     console.error("Error updating status:", error);
     return {
       success: false,
       message: error.message || "Failed to update status.",
     };
   } finally {
     setIsLoading(false);
   }
 };

 const reportMaintainece = async (accessToken, roomId, description) => {

  if (!accessToken) return;

  try {
    setIsLoading(true);

    const response = await axios.post(
      `${baseURl}/maintainence/add`,
      { roomId , description },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    
    if (response.status < 400) {

      return {
        success: true,
        message: "Maintainance reported successfully.",
      }
    }

    return {
      success: false,
      message: response.data || "Failed to report maintainance.",
    }

  } catch (error) {
    return {
      success: false,
      message: error || "Failed to report maintainance.",
    }
  } finally {
    setIsLoading(false);
  }
 }


  const values = {
    isLoading,
    statuses,
    mainRequests,
    fetchMaintainenceRequests,
    handleStatusChange,
    handleUpdateStatus,
    reportMaintainece,
  };

  return (
    <MaintainenceContext.Provider value={values}>
      {children}
    </MaintainenceContext.Provider>
  );
};
