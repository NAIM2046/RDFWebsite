import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/rdfnew-5.png";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

import { MdPlace } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { MdMore } from "react-icons/md";
import { TbAlertSquare } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { MdEvent } from "react-icons/md";
import {
  FaAngleDown,
  FaUsers,
  FaClipboardList,
  FaNewspaper,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Search } from "lucide-react";
import { FiUsers, FiBriefcase, FiBook } from "react-icons/fi";
import { MdVolunteerActivism, MdOutlineWork } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "WHO WE ARE",
      icon: <FaUsers />,
      links: [
        {
          name: "About RDF",
          link: "/about-rdf",
          icon: <IoMdInformationCircleOutline />,
        },
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

        {
          name: "Our Partners",
          link: "/our-partners",
          icon: <FaHandHoldingHeart />,
        },
        { name: "Organogram", link: "/organogram", icon: <FaClipboardList /> },
        { name: "Certification", link: "/certification", icon: <FiBook /> },
      ],
    },
    {
      title: "WHAT WE DO",
      icon: <FaClipboardList />,
      links: [
        {
          name: "Our Approach",
          link: "/our-work#ourapproach",
          icon: <FaNewspaper />,
        },
        {
          name: "We Work For",
          link: "/our-work#weworkfor",
          icon: <FiUsers />,
        },
        {
          name: "Key Focus Area",
          link: "/key-focus-area",
          icon: <FaClipboardList />,
        },
        {
          name: "All Projects",
          link: "/current-projects",
          icon: <FaNewspaper />,
        },

        {
          name: "Where We Work",
          link: "/our-work#wherewework",
          icon: <MdPlace />,
        },
        {
          name: "Our Programs",
          link: "/our-programs",
          icon: <FaProjectDiagram />,
        },
      ],
    },
    {
      title: "NEWS & PUBLICATION",
      icon: <FaNewspaper />,
      links: [
        { name: "News", link: "/news", icon: <FaNewspaper /> },
        { name: "Blog", link: "/blogs", icon: <FiBook /> },

        {
          name: "Publication",
          link: "/publication",
          icon: <FaNewspaper />,
        },
        {
          name: "Photos",
          link: "/photos",
          icon: <MdOutlineAddPhotoAlternate />,
        },
        { name: "Videos", link: "/videos", icon: <FaVideo /> },
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
    {
      title: "MORE INFO",
      icon: <MdMore />,
      links: [
        {
          name: "Notices",
          link: "/notice",
          icon: <TbAlertSquare />,
        },
        { name: "Contact Us", link: "/contact", icon: <RiContactsLine /> },
        { name: "Events", link: "/events", icon: <MdEvent /> },
      ],
    },
  ];

  return (
    <nav
      className={`shadow-lg w-full transition-all duration-300 z-50 bg-white 
    ${
      scrolled
        ? "lg:fixed max-w-[1800px] backdrop-blur-lg bg-white/30 shadow-md"
        : "lg:static lg:bg-white"
    }  
    fixed`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8 py-3">
        {/* Logo */}
        <Link to="/">
          <img src={img} alt="RDF Logo" className="h-16 cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-gray-800 font-medium font-serif">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <motion.div
                className="cursor-pointer flex items-center gap-1.5 hover:text-green-500 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-600">{item.icon}</span>
                <span className="font-semibold">{item.title}</span>
                <FaAngleDown className="text-xs mt-0.5 group-hover:rotate-180 transition-transform duration-300" />
              </motion.div>
              <ul className="absolute left-0 top-full mt-1 w-56 z-50 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 space-y-1 border border-gray-100">
                {item.links.map((link, idx) => (
                  <motion.li
                    key={idx}
                    className="hover:bg-orange-50 hover:text-orange-600 transition-colors p-2 rounded flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-green-600">{link.icon}</span>
                    <Link to={link.link} className="block text-sm">
                      {link.name}
                    </Link>
                  </motion.li>
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
            className="bg-gray-300 lg:bg-white p-2 rounded-full text-red-700 cursor-pointer"
          >
            {openSearch ? (
              <RxCross2 className="text-xl stroke-1" />
            ) : (
              <CiSearch className="text-2xl stroke-[1] " />
            )}
          </button>
          {openSearch && (
            <div className="absolute right-0 top-20  flex items-center space-x-2 bg-white border border-gray-300 rounded-lg shadow-md p-1 z-50">
              <input
                type="text"
                className="w-64 p-2 outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
                placeholder="Search..."
                onBlur={() => setOpenSearch(false)} // Close on blur
              />
              <button
                // Close when clicked
                className="bg-orange-500 p-3 rounded-lg cursor-pointer"
              >
                <Search className="text-white" size={20} />
              </button>
            </div>
          )}

          {/* Search Icon Button */}

          {/* Donate Button */}
          <motion.button
            onClick={() => navigate("/payment")}
            className="hidden lg:flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>DONATE </span>
            <motion.span
              className="ml-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart className="text-xl" />
            </motion.span>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black text-2xl cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <RxCross2 /> : <SlMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          openMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      >
        <motion.div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          initial={false}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <img src={img} alt="RDF Logo" className="h-12" />
            <motion.button
              onClick={() => navigate("/payment")}
              className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DONATE
              <FaHeart className="ml-2" />
            </motion.button>
            <button
              className="cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={() => setOpenMenu(false)}
            >
              <RxCross2 className="text-2xl" />
            </button>
          </div>
          <div className="h-[calc(100%-64px)] overflow-y-auto p-4">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <div
                    className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-green-600">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <FaAngleDown
                      className={`transition-transform ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {activeDropdown === index && (
                    <motion.ul
                      className="mt-2 space-y-1 pl-4 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.links.map((link, idx) => (
                        <motion.li
                          key={idx}
                          className="hover:bg-orange-50 hover:text-orange-600 p-2 rounded flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-orange-400">{link.icon}</span>
                          <Link
                            to={link.link}
                            className="block"
                            onClick={() => setOpenMenu(false)}
                          >
                            {link.name}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
