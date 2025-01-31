import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/rdfnew-5.png";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      title: "ABOUT RDF",
      links: [
        "Vision & Mission",
        "Our Team",
        "Annual Reports",
        "Policy Document",
      ],
    },
    {
      title: "OUR WORK",
      links: [
        "Our Approach",
        "We Work For",
        "Key Focus Area",
        "Current Projects",
        "Archive Projects",
      ],
    },
    {
      title: "NEWS & PUBLICATION",
      links: [
        "Recent News",
        "Blog and Stories",
        "Press and Media",
        "Photos",
        "Videos",
      ],
    },
    {
      title: "GET INVOLVED",
      links: [
        "As Project Partner",
        "Internship",
        "Volunteer",
        "Career with RDF",
      ],
    },
  ];

  return (
    <nav className="bg-orange-500 border-b shadow-md fixed w-full z-50 ">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8 py-3">
        {/* Logo */}
        <Link to="/">
          <img src={img} alt="RDF Logo" className="h-14 cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-white font-semibold">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <span className="cursor-pointer flex items-center gap-1 hover:text-black">
                {item.title}{" "}
                <FaAngleDown className="group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <ul className="absolute left-0 top-12 w-56 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
                {item.links.map((link, idx) => (
                  <li
                    key={idx}
                    className="hover:bg-gray-100 hover:text-orange-400 transition-transform duration-300 p-2 rounded"
                  >
                    <Link to="#" className="block text-sm font-medium">
                      {link}
                    </Link>
                    <hr className="border-dotted" />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="bg-white p-2 rounded-full text-orange-500 cursor-pointer"
          >
            {openSearch ? (
              <RxCross2 className="text-xl" />
            ) : (
              <CiSearch className="text-xl" />
            )}
          </button>

          {/* Donate Button */}
          <a
            href="#"
            className="hidden lg:block bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Donate Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-2xl cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <RxCross2 /> : <SlMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-md transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <img src={img} alt="RDF Logo" className="h-10" />
          <button className="cursor-pointer" onClick={() => setOpenMenu(false)}>
            <RxCross2 className="text-2xl text-gray-700" />
          </button>
        </div>
        <ul className="p-4 space-y-4 text-gray-800 font-semibold">
          {navItems.map((item, index) => (
            <li key={index}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setActiveDropdown(activeDropdown === index ? null : index)
                }
              >
                {item.title}{" "}
                <FaAngleDown
                  className={`${
                    activeDropdown === index ? "rotate-180" : ""
                  } transition-transform`}
                />
              </div>
              {activeDropdown === index && (
                <ul className="mt-2 space-y-2 pl-4 text-sm">
                  {item.links.map((link, idx) => (
                    <li
                      key={idx}
                      className="hover:bg-gray-100 hover:text-amber-500 p-2 rounded"
                    >
                      <Link to="#" className="block">
                        {link}
                      </Link>
                      <hr className="border-dotted" />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Search Bar */}
      {openSearch && (
        <div className="absolute top-16 right-4 bg-white shadow-md p-3 rounded-lg w-64">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full outline-none"
            />
            <button className="bg-orange-500 p-2 text-white">
              <CiSearch size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
