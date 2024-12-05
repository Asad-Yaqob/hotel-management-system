import { createContext, useState, useContext } from "react";

export const SidebarContext = createContext(null);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export const SidebarContextProvider = ({ children }) => {
  const [isSideBar, setIsSideBar] = useState(true);

  const toggleSidebar = () => {
    setIsSideBar((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSideBar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
