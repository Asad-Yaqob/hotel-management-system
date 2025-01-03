import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { baseURl } from "../utils/constants";

const MaintainenceContext = createContext();

export const useMaintainenceContext = () => {
  return useContext(MaintainenceContext);
};

export const MaintainenceProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mainRequests, setMainRequests] = useState([]);
  const [statuses, setStatuses] = useState({});

  const fetchMaintainenceRequests = useCallback(async (accessToken) => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURl}/maintainence/requests`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        setMainRequests(response.data.data.requests);
      }
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback((maintainenceId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [maintainenceId]: newStatus,
    }));
  }, []);

  const handleUpdateStatus = useCallback(
    async (maintainenceId, accessToken) => {
      if (!accessToken) return;

      const newStatus = statuses[maintainenceId] || "reported";

      if (!newStatus) {
        console.error(`No status found for ${maintainenceId}`);
        return;
      }

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
    },
    [statuses]
  );

  const reportMaintenance = useCallback(
    async (accessToken, roomId, description) => {
      if (!accessToken) return;

      try {
        setIsLoading(true);

        const response = await axios.post(
          `${baseURl}/maintainence/add`,
          { roomId, description },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.status < 400) {
          return {
            success: true,
            message: "Maintenance reported successfully.",
          };
        }

        return {
          success: false,
          message: response.data || "Failed to report maintenance.",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message || "Failed to report maintenance.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // useEffect(() => {
  //   // Fetch maintenance requests when the component mounts
  //   // You can pass the accessToken here if available
  //   // fetchMaintainenceRequests(accessToken);
  // }, [fetchMaintainenceRequests]);

  const values = useMemo(
    () => ({
      isLoading,
      statuses,
      mainRequests,
      fetchMaintainenceRequests,
      handleStatusChange,
      handleUpdateStatus,
      reportMaintenance,
    }),
    [
      isLoading,
      statuses,
      mainRequests,
      fetchMaintainenceRequests,
      handleStatusChange,
      handleUpdateStatus,
      reportMaintenance,
    ]
  );

  return (
    <MaintainenceContext.Provider value={values}>
      {children}
    </MaintainenceContext.Provider>
  );
};

MaintainenceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
