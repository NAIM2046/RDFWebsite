import React from "react";
import { Helmet } from "react-helmet-async";
import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="mx-auto bg-gray-50 min-h-screen">
      <Helmet>
        <title>Contact Us | Resource Development Foundation (RDF)</title>
        <meta
          name="description"
          content="Get in touch with Resource Development Foundation (RDF). Visit our head office in Dhaka or our Barguna office. Contact via phone, email, or view our locations on Google Maps."
        />
        <meta
          name="keywords"
          content="RDF contact, RDF Dhaka office, RDF Barguna office, NGO Bangladesh, RDF phone, RDF email"
        />
        <link rel="canonical" href="https://rdfbd.org/contact" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Contact RDF | Resource Development Foundation"
        />
        <meta
          property="og:description"
          content="Contact RDF via phone, email or visit our offices in Dhaka & Barguna. Learn more about our work in Bangladesh."
        />
        <meta property="og:url" content="https://rdfbd.org/contact" />
        <meta
          property="og:image"
          content="https://rdfbd.org/assets/ContactUs/rdftower.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact RDF | Resource Development Foundation"
        />
        <meta
          name="twitter:description"
          content="Contact RDF via phone, email or visit our offices in Dhaka & Barguna."
        />
        <meta
          name="twitter:image"
          content="https://rdfbd.org/assets/ContactUs/rdftower.png"
        />
      </Helmet>

      {/* Main Contact Section */}
     <div className="max-w-6xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
    
    {/* Left – Image */}
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/assets/ContactUs/rdftower.png"
        alt="RDF Office Building"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right – Contact Info */}
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-serif font-bold text-green-700 text-center mb-10 border-b border-green-200 pb-4">
        Contact Information
      </h2>

      <div className="space-y-9">

        {/* Head Office */}
        <div className="flex gap-5">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-100">
            <FaLocationDot className="text-orange-500 text-xl" />
          </div>
          <div>
            <a
              href="https://www.google.com/maps/place/Resource+Development+Foundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-800 hover:text-green-700 transition"
            >
              Head Office – Dhaka
            </a>
            <p className="mt-2 text-gray-600 leading-relaxed">
              House # 21, Road # 12, Pisciculture Housing Society, Block-Kha,
              Adabor, Dhaka 1207
            </p>
          </div>
        </div>

        {/* Barguna Office */}
        <div className="flex gap-5">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-100">
            <FaLocationDot className="text-orange-500 text-xl" />
          </div>
          <div>
            <a
              href="https://www.google.com/maps/place/RDF+Tower/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-800 hover:text-green-700 transition"
            >
              Barguna Office
            </a>
            <p className="mt-2 text-gray-600 leading-relaxed">
              RDF Training & Research Center, Police Line Sarak, Barguna-8700
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-5">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-100">
            <MdOutlineMail className="text-orange-500 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
            <p className="mt-2 text-gray-600">
              <span className="font-medium">Head Office:</span> info@rdfbd.org
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Barguna Office:</span> rtrc@rdfbd.org
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-5">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-100">
            <FiPhoneCall className="text-orange-500 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
            <p className="mt-2 text-gray-600">
              <span className="font-medium">Head Office (T&T):</span>{" "}
              +88-02-222243850
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Mobile:</span> 01733-065522
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Barguna Office (T&T):</span>{" "}
              +88-02-479930041
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>


      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 font-serif">
          Our Locations
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1776540.832258226!2d89.0114359!3d23.803433!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1000dcc73e7%3A0xd82969f3638b6a5c!2sResource%20Development%20Foundation%20(RDF)!5e1!3m2!1sen!2sbd!4v1755972640783!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="RDF Location Map"
            className="block"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
