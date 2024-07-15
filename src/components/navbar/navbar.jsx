import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const Links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Top Products",
      link: "/topProducts",
    },
    {
      name: "Customers",
      link: "/customers",
    },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="md:sticky md:top-0 z-40 border-b-2 border-b-gray-300 ">
      <div className="w-full bg-white">
        <nav className="md:container flex justify-between items-center w-full  text-gray-700 py-4 mx-auto">
          <div>
            <Link
              className="text-4xl text-orange-400 cursor-pointer font-bold font-heading"
              to="/"
            >
              LOGO
            </Link>
          </div>
          <div
            className={`md:static absolute  text-base bg-white  font-medium md:min-h-fit min-h-[50vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 ease-in ${
              open ? "top-[8%] " : "top-[-100%] "
            } z-40`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-4 ">
              {Links.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.link}>{link.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div onClick={() => setOpen(!open)} className="mr-12 md:hidden">
            {open ? <RiCloseFill size={28} /> : <FaBars size={28} />}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
