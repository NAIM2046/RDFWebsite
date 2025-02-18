import React from "react";
import logo from "/assets/rdfnew-5 (1).png";
import youtub from "/assets/youTub.png";
import facebook from "/assets/sm-icons-facebook-logo.webp";
import instgram from "/assets/instagram.png";
import linkeden from "/assets/linkeden.png";
import { SlLocationPin } from "react-icons/sl";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RxTriangleRight } from "react-icons/rx";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content  py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img className="w-auto max-w-48" src={logo} alt="RDF Logo" />
          <p className="text-sm text-gray-400">
            Resource Development Foundation(RDF) <br />
            Providing reliable Service since 1992
          </p>
        </div>

        {/* Find Us */}
        <div>
          <h6 className="font-semibold  mb-3 text-xl border-b-2 pb-2 font-serif">
            Find Us
          </h6>
          <div className="space-y-3">
            <p className="flex gap-1">
              <FaMapMarkerAlt className=" text-2xl text-red-600" />{" "}
              <span className="text-xl font-semibold font-serif">Address:</span>
            </p>
            <p className="flex items-center gap-2 ml-4 font-serif">
              Head Office : RDF BHABAN, House #21, Road #12, Pisciculture
              Housing Society, Block-Kha, Adabor, Dhaka-1207
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneVolume className="text-red-500" /> +8802-22243850,
              +8801733065522
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-red-500" /> info@rdfbd.org
            </p>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h6 className="font-semibold  mb-3 text-xl border-b-2 pb-2 font-serif">
            About Us
          </h6>
          <div className="space-y-2">
            <a className="hover:text-orange-600 hover:underline transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight
                className="text-2xl text-red-700
              "
              />{" "}
              <span className=""> About RDF</span>
            </a>
            <a className="hover:text-blue-400 transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight className="text-2xl text-red-400" />{" "}
              <span className=""> Vision and Mission</span>
            </a>
            <a className="hover:text-blue-400 transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight className="text-2xl text-red-400" />{" "}
              <span className="">Our Partners and Donors</span>
            </a>
            <a className="hover:text-blue-400 transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight className="text-2xl text-red-400" />{" "}
              <span className="">Job Apply</span>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h6 className="font-semibold  mb-3 text-xl border-b-2 pb-2 font-serif">
            Useful Links
          </h6>
          <div className="space-y-2">
            <a className="hover:text-blue-400 transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight className="text-2xl text-red-400" />{" "}
              <span className=""> Blogs and News</span>
            </a>
            <a className="hover:text-blue-400 transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight className="text-2xl text-red-400" />{" "}
              <span className="">Publications</span>
            </a>
            <a className="hover:text-blue-400 transition flex space-x-1 cursor-pointer ">
              {" "}
              <RxTriangleRight className="text-2xl text-red-400" />{" "}
              <span className="">Notices</span>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-10 text-center">
        <h6 className="font-semibold mb-3 text-xl font-serif">
          Subscribe to Our Newsletter
        </h6>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition cursor-pointer font-serif">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center">
        <p className="text-gray-400 mb-4 text-xl font-semibold font-serif">
          Follow us on social media
        </p>
        <div className="flex justify-center gap-5 mb-4">
          <a href="#" className="w-8 transition transform hover:scale-110">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="#" className="w-8 transition transform hover:scale-110">
            <img src={instgram} alt="Instagram" />
          </a>
          <a href="#" className="w-8 transition transform hover:scale-110">
            <img src={linkeden} alt="LinkedIn" />
          </a>
          <a href="#" className="w-8 transition transform hover:scale-110">
            <img src={youtub} alt="YouTube" />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} RDF BD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
