import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/rdfnew-5.png";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import {
  FaAngleDown,
  FaUsers,
  FaClipboardList,
  FaNewspaper,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FiUsers, FiBriefcase, FiBook } from "react-icons/fi";
import { MdVolunteerActivism, MdOutlineWork } from "react-icons/md";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      title: "ABOUT RDF",
      icon: <FaUsers />,
      links: [
        {
          name: "Vision & Mission",
          link: "/vision-mission",
          icon: <FiUsers />,
        },
        { name: "Our Team", link: "/our-team", icon: <FaUsers /> },
        {
          name: "Annual Reports",
          link: "/annual-reports",
          icon: <FaClipboardList />,
        },
        { name: "Policy Document", link: "/policy-document", icon: <FiBook /> },
      ],
    },
    {
      title: "OUR WORK",
      icon: <FaClipboardList />,
      links: [
        { name: "Our Approach", link: "/our-approach", icon: <FaNewspaper /> },
        { name: "We Work For", link: "/we-work-for", icon: <FiUsers /> },
        {
          name: "Key Focus Area",
          link: "/key-focus-area",
          icon: <FaClipboardList />,
        },
        {
          name: "Current Projects",
          link: "/current-projects",
          icon: <FaNewspaper />,
        },
        {
          name: "Archive Projects",
          link: "/archive-projects",
          icon: <FaClipboardList />,
        },
      ],
    },
    {
      title: "NEWS & PUBLICATION",
      icon: <FaNewspaper />,
      links: [
        { name: "Recent News", link: "/recent-news", icon: <FaNewspaper /> },
        { name: "Blog and Stories", link: "/blogs", icon: <FiBook /> },
        {
          name: "Press and Media",
          link: "/press-media",
          icon: <FaNewspaper />,
        },
        { name: "Photos", link: "/photos", icon: <FiBook /> },
        { name: "Videos", link: "/videos", icon: <FiBook /> },
      ],
    },
    {
      title: "GET INVOLVED",
      icon: <FaHandHoldingHeart />,
      links: [
        {
          name: "As Project Partner",
          link: "/project-partner",
          icon: <FaHandHoldingHeart />,
        },
        { name: "Internship", link: "/internship", icon: <FiBriefcase /> },
        {
          name: "Volunteer",
          link: "/volunteer",
          icon: <MdVolunteerActivism />,
        },
        { name: "Career with RDF", link: "/careers", icon: <MdOutlineWork /> },
      ],
    },
  ];

  return (
    <nav className="bg-orange-500 border-b shadow-md fixed w-full z-50">
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
                {item.icon} {item.title}{" "}
                <FaAngleDown className="group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <ul className="absolute left-0 top-12 w-56 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
                {item.links.map((link, idx) => (
                  <li
                    key={idx}
                    className="hover:bg-gray-100 hover:text-orange-400 transition-transform duration-300 p-2 rounded flex items-center gap-2"
                  >
                    {link.icon}
                    <Link to={link.link} className="block text-sm font-medium">
                      {link.name}
                    </Link>
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
                {item.icon} {item.title}
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
                      className="hover:bg-gray-100 hover:text-amber-500 p-2 rounded flex items-center gap-2"
                    >
                      {link.icon}
                      <Link to={link.link} className="block">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
