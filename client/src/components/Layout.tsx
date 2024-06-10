import React, { FC, ComponentType, useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import MobileBottomNav from "./MobileBottomNav";
import { useLocation } from "react-router-dom";
import CreateModal from "./modals/CreateModal";
import UpdateModal from "./modals/UpdateModal";
import useUpdateModalStore from "../utils/updateModalStore";
import UserDetails from "../pages/UserDetails";

const Layout = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const WrappedComponent: FC<P> = (props) => {
    const [url, setUrl] = useState<string>("");
    const location = useLocation();
    const { isModalOpen } = useUpdateModalStore();
    useEffect(() => {
      if (location.pathname === "/user/profile") setUrl("profile");
      else if (location.pathname === "/user/notifications") setUrl("mail");
      else if (location.pathname === "/user/search") setUrl("search");
      else if (location.pathname.includes("userDetails")) setUrl("userDetails");
    }, [url, location.pathname]);

    return (
      <div className="flex flex-col min-h-screen relative">
        {/* Top Navbar */}
        <div
          hidden={
            url === "profile" ||
            url === "mail" ||
            url === "search" ||
            url === "userDetails"
          }
        >
          <MobileNavbar />
        </div>

        {/* Main Content */}
        <div
          className={`flex-grow container mx-auto ${
            location.pathname === "/user/profile" || url === "userDetails"
              ? "p-0"
              : "p-4"
          }`}
        >
          <Component {...props} />
        </div>

        {/* Bottom Navbar */}
        <MobileBottomNav />
        <CreateModal />
        {isModalOpen && <UpdateModal />}
      </div>
    );
  };

  return WrappedComponent;
};

export default Layout;
