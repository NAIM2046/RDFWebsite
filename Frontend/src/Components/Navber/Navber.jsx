import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/rdfnew-5.png";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { MdWorkHistory } from "react-icons/md";
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
import { CiSearch } from "react-icons/ci";
import { Search } from "lucide-react";
import { FiUsers, FiBriefcase, FiBook } from "react-icons/fi";
import { MdVolunteerActivism, MdOutlineWork } from "react-icons/md";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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
          name: "Founder Messages",
          link: "/founder-messages",
          icon: <FaUsers />,
        },
        {
          name: "Our Partners",
          link: "/our-partners",
          icon: <FaHandHoldingHeart />,
        },
        { name: "Organogram", link: "/organogram", icon: <FaClipboardList /> },
        { name: "Certification", link: "/certification", icon: <FiBook /> },
        {
          name: "Our Strategy",
          link: "/our-strategy",
          icon: <FaClipboardList />,
        },
        { name: "Our History", link: "/our-history", icon: <MdWorkHistory /> },
      ],
    },
    {
      title: "WHAT WE DO",
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
        {
          name: "Where We Work",
          link: "/where-we-work",
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
        { name: "News", link: "/recent-news", icon: <FaNewspaper /> },
        { name: "Blog", link: "/blogs", icon: <FiBook /> },
        { name: "Story", link: "/story", icon: <FiBook /> },
        {
          name: "Press and Media",
          link: "/press-media",
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
      className={` shadow-lg w-full transition-all duration-300 z-50 ${
        scrolled ? "fixed bg-white" : " bg-[#f7f773]"
      }  `}
    >
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8 py-3">
        {/* Logo */}
        <Link to="/">
          <img src={img} alt="RDF Logo" className="h-16 cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <ul
          className={`hidden lg:flex space-x-6 ${
            scrolled ? "text-black" : "text-black"
          } font-semibold`}
        >
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <span className="cursor-pointer flex items-center gap-1 font-bold  hover:text-orange-500">
                {item.icon} {item.title}{" "}
                <FaAngleDown className="group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <ul className="absolute left-0 top-12 w-56 z-50 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
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
          <a
            href="#"
            className="hidden lg:block bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Donate
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
        <ul className="p-4 space-y-4 text-gray-800 font-semibold bg-white">
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
