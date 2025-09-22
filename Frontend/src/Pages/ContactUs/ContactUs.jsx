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
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div className="w-full lg:w-2/5">
            <div className="rounded-xl overflow-hidden shadow-xl h-full">
              <img
                src="/assets/ContactUs/rdftower.png"
                alt="RDF Office Building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="w-full lg:w-3/5 bg-white rounded-xl shadow-xl p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-8 text-green-600 text-center font-serif border-b-2 border-green-200 pb-4">
              Contact Us
            </h2>

            <div className="space-y-8">
              {/* Head Office */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <FaLocationDot className="text-2xl text-orange-500" />
                </div>
                <div className="flex-1">
                  <a
                    href="https://www.google.com/maps/place/Resource+Development+Foundation/@23.7656605,90.3470314,15z/data=!4m10!1m2!2m1!1sPisciculture+Housing+Society+RDF!3m6!1s0x3755c098a14f7011:0x5e4ead7428592246!8m2!3d23.7700141!4d90.3558215!15sCiBQaXNjaWN1bHR1cmUgSG91c2luZyBTb2NpZXR5IFJERloiIiBwaXNjaWN1bHR1cmUgaG91c2luZyBzb2NpZXR5IHJkZpIBF25vbl9wcm9maXRfb3JnYW5pemF0aW9umgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU50YWpWeE9VWlJFQUXgAQD6AQUIgwEQPA!16s%2Fg%2F11clsh20x9?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors"
                  >
                    Head Office
                  </a>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    House # 21, Road # 12, Pisciculture Housing Society,
                    Block-Kha, Adabor, Dhaka 1207
                  </p>
                </div>
              </div>

              {/* Barguna Office */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <FaLocationDot className="text-2xl text-orange-500" />
                </div>
                <div className="flex-1">
                  <a
                    href="https://www.google.com/maps/place/RDF+Tower/@22.1519777,90.1285341,16z/data=!4m14!1m7!3m6!1s0x30aa998d296c6c1f:0x567c97ad6ae76f66!2sRDF+Tower!8m2!3d22.151842!4d90.1308193!16s%2Fg%2F11c1wx0l52!3m5!1s0x30aa998d296c6c1f:0x567c97ad6ae76f66!8m2!3d22.151842!4d90.1308193!16s%2Fg%2F11c1wx0l52?entry=ttu&g_ep=EgoyMDI1MDIxMS.0IKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors"
                  >
                    Barguna Office
                  </a>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    RDF Training & Research Center, Police line Sarak,
                    Barguna-8700
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <MdOutlineMail className="text-2xl text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Mail Us
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Head Office:</span>{" "}
                      info@rdfdb.org
                    </p>
                    <p>
                      <span className="font-medium">Barguna Office:</span>{" "}
                      rdfbangladesh@hotmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex gap-4">
                <div className="mt-1">
                  <FiPhoneCall className="text-2xl text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Call Us
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Head Office:</span>{" "}
                      +88-0561-52149, +88-0561-61614, +88 01714-063360
                    </p>
                    <p>
                      <span className="font-medium">Barguna Office:</span>{" "}
                      +88-02-479930042
                    </p>
                  </div>
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
