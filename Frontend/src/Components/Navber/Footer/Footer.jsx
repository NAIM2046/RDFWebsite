import React from "react";
import logo from "./../../../../public/assets/rdfnew-5 (1).png";
import youtub from "./../../../../public/assets/youTub.png";
import facebook from "./../../../../public/assets/sm-icons-facebook-logo.webp";
import instgram from "./../../../../public/assets/instagram.png";
import linkeden from "./../../../../public/assets/linkeden.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Logo & Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
          <img className="w-auto max-w-48" src={logo} alt="RDF Logo" />
          <p className="text-sm text-gray-400">
            ACME Industries Ltd. <br />
            Providing reliable tech since 1992
          </p>
        </div>

        {/* Links */}
        <div className="lg:flex lg:flex-wrap justify-center lg:justify-start gap-12 text-center text-xl space-y-4">
          <div>
            <h6 className="font-semibold text-white mb-3 text-2xl border-b-2">
              Find Us
            </h6>
            <a className="block hover:text-blue-400 transition">Branding</a>
            <a className="block hover:text-blue-400 transition">Design</a>
            <a className="block hover:text-blue-400 transition">Marketing</a>
            <a className="block hover:text-blue-400 transition">
              Advertisement
            </a>
          </div>
          <div>
            <h6 className="font-semibold text-white mb-3 text-2xl border-b-2">
              About Us
            </h6>
            <a className="block hover:text-blue-400 transition">Our Story</a>
            <a className="block hover:text-blue-400 transition">Contact</a>
            <a className="block hover:text-blue-400 transition">Careers</a>
            <a className="block hover:text-blue-400 transition">Press</a>
          </div>
          <div>
            <h6 className="font-semibold text-white mb-3 text-2xl border-b-2">
              Useful Links
            </h6>
            <a className="block hover:text-blue-400 transition">Terms of Use</a>
            <a className="block hover:text-blue-400 transition">
              Privacy Policy
            </a>
            <a className="block hover:text-blue-400 transition">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="text-center lg:text-left">
          <h6 className="font-semibold text-white mb-3 text-2xl">
            Subscribe to Our Newsletter
          </h6>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center">
        <p className="text-gray-400 mb-4 text-2xl font-semibold">
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
          &copy; {new Date().getFullYear()} ACME Industries Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
