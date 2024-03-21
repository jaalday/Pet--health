import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const primaryNav = [
  { title: "About", url: "/about" },
  { title: "Signup", url: "/users/add" },
  { title: "Profile", url: "/profile" },
];

const Layout = () => {
  return (
    <>
      <Navigation navItems={primaryNav} />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
