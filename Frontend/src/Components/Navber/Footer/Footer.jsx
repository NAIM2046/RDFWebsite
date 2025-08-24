import React from "react";
import logo from "/assets/rdfnew-5 (1).png";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RxTriangleRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#262626] text-base-content py-12 px-6 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img
            className="w-auto max-w-48 mb-2"
            src={logo}
            alt="RDF Logo"
            loading="lazy"
          />
          <p className="text-md font-light text-white leading-relaxed">
            Resource Development Foundation(RDF)
          </p>
        </div>

        {/* Find Us */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 border-green-400 pb-3 mb-4 font-serif text-white">
            Find Us
          </h6>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-2xl text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-semibold mb-1">Address:</p>
                <p className="text-sm leading-relaxed">
                  Head Office: RDF BHABAN, House #21, Road #12, Pisciculture
                  Housing Society, Block-Kha, Adabor, Dhaka-1207
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneVolume className="text-green-400 text-2xl flex-shrink-0" />
              <p className="text-sm">+8802-222243850, +8801733065522</p>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlineEmail className="text-green-400 text-2xl flex-shrink-0" />
              <p className="text-sm">info@rdfbd.org</p>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 border-green-400 pb-3 mb-4 text-white">
            About Us
          </h6>
          <div className="space-y-3">
            <Link
              to="/our-history"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">About RDF</span>
            </Link>
            <a
              href="/vision-mission"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">Vision and Mission</span>
            </a>
            <a
              href="/our-partners"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">Our Partners & Donors</span>
            </a>
            <a
              href="/careers"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">Job Apply</span>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 border-green-400 pb-3 mb-4 text-white">
            Useful Links
          </h6>
          <div className="space-y-3">
            <a
              href="/news"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">Blogs & News</span>
            </a>
            <a
              href="/publication"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">Publications</span>
            </a>
            <a
              href="/notice"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
            >
              <RxTriangleRight className="text-2xl text-green-400" />
              <span className="text-gray-300">Notices</span>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-[#333333] rounded-lg  text-center">
        <h6 className="font-semibold mb-3 text-xl font-serif text-green-400">
          Subscribe to Our Newsletter
        </h6>
        <p className="text-sm mb-5 text-gray-400">
          Stay updated with our latest news and offers!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-72 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 bg-white"
          />
          <button className="px-6 py-3 bg-green-600 text-white font-serif rounded-md transition-all duration-300 hover:bg-green-700 shadow-md cursor-pointer w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-600 text-center">
        {/* Social Media Heading */}
        <p className="text-gray-100 mb-5 text-xl font-semibold font-serif">
          Follow us on social media
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-5 mb-6">
          <a
            href="https://www.facebook.com/profile.php?id=61556311631080"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3a3a3a] transition-all duration-300 hover:bg-green-600"
          >
            <FaFacebook className="text-xl text-white" />
          </a>
          <a
            href="https://www.instagram.com/rdfbangladesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3a3a3a] transition-all duration-300 hover:bg-green-600"
          >
            <FaSquareInstagram className="text-xl text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/resource-development-foundation-rdf-2ba4832b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3a3a3a] transition-all duration-300 hover:bg-green-600"
          >
            <IoLogoLinkedin className="text-xl text-white" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCf9PTB7a6ejQn7I1u53IzMA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3a3a3a] transition-all duration-300 hover:bg-green-600"
          >
            <IoLogoYoutube className="text-xl text-white" />
          </a>
          <a
            href="https://twitter.com/rdf_bd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3a3a3a] transition-all duration-300 hover:bg-green-600"
          >
            <FaSquareXTwitter className="text-xl text-white" />
          </a>
        </div>

        {/* Copyright & Developer Info */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} RDF BD. All rights reserved |{" "}
          <a
            href="https://my-portfolio-zslo.onrender.com/"
            className="text-gray-500 font-light font-serif hover:text-green-400 transition-colors"
          >
            Developed by Naim Hossain (JU-IIT)
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
