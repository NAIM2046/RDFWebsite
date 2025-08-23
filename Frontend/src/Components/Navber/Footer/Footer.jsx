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
    <footer className="bg-[#262626] text-base-content  py-10 px-4 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img
            className="w-auto max-w-48"
            src={logo}
            alt="RDF Logo"
            loading="lazy"
          />
          <p className="text-md font-light text-white">
            Resource Development Foundation (RDF) <br />
          </p>
        </div>

        {/* Find Us */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 border-green-400 pb-2 font-serif text-white">
            Find Us
          </h6>
          <div className="space-y-3 mt-3 text-gray-300">
            <p className=" items-center gap-2">
              <p className="flex gap-1">
                <FaMapMarkerAlt className="text-2xl text-green-400" />
                <span className="text-lg font-semibold">Address:</span>
              </p>
              <p className="ml-7 text-sm leading-relaxed">
                Head Office: RDF BHABAN, House #21, Road #12, Pisciculture
                Housing Society, Block-Kha, Adabor, Dhaka-1207
              </p>
            </p>

            <p className="flex items-center gap-2 text-sm">
              <FaPhoneVolume className="text-green-400 text-2xl" />{" "}
              +8802-222243850, +8801733065522
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MdOutlineEmail className="text-green-400 text-2xl" />{" "}
              info@rdfbd.org
            </p>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 border-green-400 pb-2 text-white">
            About Us
          </h6>
          <div className="space-y-2 mt-3">
            <Link to="/our-history" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> About RDF</span>
            </Link>
            <a href="/vision-mission" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> Vision and Mission</span>
            </a>
            <a href="/our-partners" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> Our Partners & Donors</span>
            </a>
            <a href="/careers" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> Job Apply</span>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 border-green-400 pb-2 text-white">
            Useful Links
          </h6>
          <div className="space-y-2 mt-3">
            <a href="/news" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> Blogs & News</span>
            </a>
            <a href="/publication" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> Publications</span>
            </a>
            <a href="/notice" className="footer-link">
              <RxTriangleRight className="text-2xl text-green-400" />{" "}
              <span className="text-gray-300"> Notices</span>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-10 text-center p-6 rounded-lg">
        <h6 className="font-semibold mb-3 text-lg font-serif text-green-400">
          Subscribe to Our Newsletter
        </h6>
        <p className="text-sm mb-4 text-gray-400">
          Stay updated with our latest news and offers!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-64 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
          />
          <button className="px-5 py-2 bg-blue-600 text-white font-serif rounded-md transition-all duration-300 hover:bg-blue-700 shadow-md cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center">
        {/* Social Media Heading */}
        <p className="text-gray-100 mb-4 text-xl font-semibold font-serif">
          Follow us on social media
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-3 mb-5">
          <a
            href="https://www.facebook.com/profile.php?id=61556311631080"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <FaFacebook className="text-3xl text-white" />
          </a>
          <a
            href="https://www.instagram.com/rdfbangladesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <FaSquareInstagram className="text-3xl text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/resource-development-foundation-rdf-2ba4832b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <IoLogoLinkedin className="text-3xl text-white" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCf9PTB7a6ejQn7I1u53IzMA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <IoLogoYoutube className="text-3xl text-white" />
          </a>
          <a
            href="https://twitter.com/rdf_bd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <FaSquareXTwitter className="text-3xl text-white" />
          </a>
        </div>

        {/* Copyright & Developer Info */}
        <p className="text-lg font-semibold text-gray-400">
          &copy; {new Date().getFullYear()} RDF BD. All rights reserved |{" "}
          <a
            href="#"
            className="text-sm text-gray-600 font-light font-serif hover:underline"
          >
            Developed by Naim Hossain (JU-IIT)
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
