import React from "react";
import logo from "/assets/rdfnew-5 (1).png";
import youtub from "/assets/youTub.png";
import facebook from "/assets/sm-icons-facebook-logo.webp";
import instgram from "/assets/instagram.png";
import linkeden from "/assets/linkeden.png";
import twiter from "/assets/RDF Photo/twitter-x.png";
import { SlLocationPin } from "react-icons/sl";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RxTriangleRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content  py-10 px-5 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img
            className="w-auto max-w-48"
            src={logo}
            alt="RDF Logo"
            loading="lazy"
          />
          <p className="text-md font-light text-gray-500">
            Resource Development Foundation (RDF) <br />
            Providing reliable service since 1992
          </p>
        </div>

        {/* Find Us */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 pb-2 font-serif text-gray-700">
            Find Us
          </h6>
          <div className="space-y-3 mt-3 text-gray-600">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-2xl text-red-700" />
              <span className="text-lg font-semibold">Address:</span>
            </p>
            <p className="ml-6 text-sm leading-relaxed">
              Head Office: RDF BHABAN, House #21, Road #12, Pisciculture Housing
              Society, Block-Kha, Adabor, Dhaka-1207
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaPhoneVolume className="text-red-700" /> +8802-22243850,
              +8801733065522
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MdEmail className="text-red-700" /> info@rdfbd.org
            </p>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 pb-2 text-gray-700">
            About Us
          </h6>
          <div className="space-y-2 mt-3">
            <Link to="/our-history" className="footer-link">
              <RxTriangleRight className="icon" /> About RDF
            </Link>
            <a href="/vision-mission" className="footer-link">
              <RxTriangleRight className="icon" /> Vision and Mission
            </a>
            <a href="/our-partners" className="footer-link">
              <RxTriangleRight className="icon" /> Our Partners & Donors
            </a>
            <a href="/careers" className="footer-link">
              <RxTriangleRight className="icon" /> Job Apply
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h6 className="font-semibold text-xl border-b-2 pb-2 text-gray-700">
            Useful Links
          </h6>
          <div className="space-y-2 mt-3">
            <a href="/news" className="footer-link">
              <RxTriangleRight className="icon" /> Blogs & News
            </a>
            <a href="/publication" className="footer-link">
              <RxTriangleRight className="icon" /> Publications
            </a>
            <a href="/notice" className="footer-link">
              <RxTriangleRight className="icon" /> Notices
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-10 text-center p-6 rounded-lg">
        <h6 className="font-semibold mb-3 text-lg font-serif text-gray-800">
          Subscribe to Our Newsletter
        </h6>
        <p className="text-sm mb-4 text-gray-600">
          Stay updated with our latest news and offers!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <button className="px-5 py-2 bg-blue-600 text-white font-serif rounded-md transition-all duration-300 hover:bg-blue-700 shadow-md cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="mt-10 border-t border-gray-400 pt-6 text-center">
        {/* Social Media Heading */}
        <p className="text-gray-600 mb-4 text-xl font-semibold font-serif">
          Follow us on social media
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-5">
          <a
            href="https://www.facebook.com/profile.php?id=61556311631080"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <img src={facebook} alt="Facebook" className="w-full" />
          </a>
          <a
            href="https://www.instagram.com/rdfbangladesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <img src={instgram} alt="Instagram" className="w-full" />
          </a>
          <a
            href="https://www.linkedin.com/in/resource-development-foundation-rdf-2ba4832b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <img src={linkeden} alt="LinkedIn" className="w-full" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCf9PTB7a6ejQn7I1u53IzMA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <img src={youtub} alt="YouTube" className="w-full" />
          </a>
          <a
            href="https://twitter.com/rdf_bd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 transition-transform transform hover:scale-110"
          >
            <img src={twiter} alt="Twitter" className="w-full" />
          </a>
        </div>

        {/* Copyright & Developer Info */}
        <p className="text-lg font-semibold text-gray-600">
          &copy; {new Date().getFullYear()} RDF BD. All rights reserved |{" "}
          <a href="#" className="text-sm font-light font-serif hover:underline">
            Developed by Naim Hossain (JU-IIT)
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
