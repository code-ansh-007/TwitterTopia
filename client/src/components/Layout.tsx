import React, { FC, ComponentType, useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import MobileBottomNav from "./MobileBottomNav";
import { useLocation } from "react-router-dom";

const Layout = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const WrappedComponent: FC<P> = (props) => {
    const [url, setUrl] = useState<string>("");
    const location = useLocation();
    useEffect(() => {
      if (location.pathname === "/user/profile") setUrl("profile");
    }, [url, location.pathname]);

    return (
      <div className="flex flex-col min-h-screen">
        {/* Top Navbar */}
        {url !== "profile" && <MobileNavbar />}

        {/* Main Content */}
        <div className="flex-grow container mx-auto p-4">
          <Component {...props} />
        </div>

        {/* Bottom Navbar */}
        <MobileBottomNav />
      </div>
    );
  };

  return WrappedComponent;
};

export default Layout;
