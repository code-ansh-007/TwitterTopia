import React, { FC, ComponentType } from "react";
import MobileNavbar from "./MobileNavbar";
import MobileBottomNav from "./MobileBottomNav";

const Layout = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const WrappedComponent: FC<P> = (props) => {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Top Navbar */}
        <MobileNavbar />

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
