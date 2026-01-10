import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import map from "/assets/wherewework/image.png"; // Ensure this path is correct for your project
import { Helmet } from "react-helmet-async";
import { offices as officeData } from "./officelist";

const WhereWeWork = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const offices = officeData;
  
  // Get current active office data
  const currentOfficeData = offices[activeOffice];
  const currentOfficeList = currentOfficeData.officeList;

  // 1. Check if this is the "Development Project Offices" tab (ID 4)
  const isProjectTab = currentOfficeData.id === 4;

  // 2. Check for standard Branch/Area info (for ID 3 and similar)
  const hasBranchInfo = currentOfficeList.some(item => item.branchName || item.areaName);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50/50">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <Helmet>
        <title>RDF - We Work Area</title>
        <meta name="description" content="RDF work area all Bangladesh" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 font-serif mb-4 mt-10 lg:mt-0 ">
            Where We Work
          </h2>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto mb-6">
            Discover our office locations and reach out to us
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-green-600 to-emerald-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100"
        >
          {/* Branch Table Section */}
          <div className="p-8 md:p-10">
            {/* Tabs */}
            <div className="flex mb-6 border-b border-green-100 overflow-x-auto no-scrollbar">
              {offices.map((office, idx) => (
                <button
                  key={office.id}
                  className={`px-4 py-2 font-medium cursor-pointer text-sm md:text-base flex-shrink-0 transition-all duration-300 relative ${
                    activeOffice === idx
                      ? "text-green-800 font-bold"
                      : "text-emerald-600 hover:text-green-800 hover:bg-green-50"
                  }`}
                  onClick={() => setActiveOffice(idx)}
                >
                  {office.title}
                  {activeOffice === idx && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar rounded-lg border border-green-100">
              <table className="min-w-full bg-white">
                <thead className="bg-green-50">
                  <tr>
                    {/* --- HEADER LOGIC --- */}
                    {isProjectTab ? (
                      // Headers for ID 4 (Projects)
                      <>
                        <th className="py-3 px-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider w-1/3">
                          Name of the Project
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                          Addresses of Project Office
                        </th>
                      </>
                    ) : (
                      // Headers for Standard Tabs
                      <>
                        {hasBranchInfo && (
                          <>
                            <th className="py-3 px-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                              Branch
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                              Area
                            </th>
                          </>
                        )}
                        <th className="py-3 px-4 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                          Address
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-200">
                  {currentOfficeList.map((branch) => (
                    <tr key={branch.id} className="hover:bg-green-50/50 transition-colors">
                      
                      {/* --- BODY ROW LOGIC --- */}
                      {isProjectTab ? (
                        // 1. RENDER PROJECT ROW (ID 4)
                        <>
                          <td className="py-4 px-4 text-green-800 font-semibold align-top">
                            {branch.nameOfProject}
                          </td>
                          <td className="py-4 px-4 text-stone-600 text-sm whitespace-pre-line align-top leading-relaxed min-w-[200px]">
                            {branch.projectOfficeAddress}
                            {/* Contact Info Block (Reused) */}
                            <div className="flex flex-col gap-3 mt-2">
                              <ContactInfoItem info={branch.contactInfo} />
                            </div>
                          </td>
                        </>
                      ) : (
                        // 2. RENDER STANDARD ROW
                        <>
                          {hasBranchInfo && (
                            <>
                              <td className="py-4 px-4 text-green-800 font-semibold align-top">
                                {branch.branchName}
                              </td>
                              <td className="py-4 px-4 text-emerald-600 font-medium align-top">
                                {branch.areaName}
                              </td>
                            </>
                          )}
                          <td className="py-4 px-4 font-semibold text-stone-600 text-sm whitespace-pre-line align-top leading-relaxed min-w-[200px]">
                            {branch.address}
                            {/* Contact Info Block (Reused) */}
                            <div className="flex flex-col gap-3 mt-2">
                              <ContactInfoItem info={branch.contactInfo} />
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Map Section */}
          <div className="p-8 flex items-center justify-center bg-gray-100">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={map}
                alt="Working Area Map"
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="absolute bottom-4 left-4 text-white font-medium bg-green-900/80 px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                  Click to enlarge
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Map Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative max-w-6xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl border-4 border-green-800">
                  <img
                    src={map}
                    alt="Fullscreen Map"
                    className="w-full max-h-[80vh] object-contain"
                  />
                </div>
                <button
                  className="absolute -top-12 right-0 text-white hover:text-green-400 transition-colors p-2 rounded-full bg-green-900/30 hover:bg-green-900/50 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Helper component to render contact info neatly to avoid code duplication
const ContactInfoItem = ({ info }) => {
  if (!info) return null;
  return (
    <>
      {info.email && (
        <a href={`mailto:${info.email}`} className="flex items-center text-emerald-600 hover:text-green-800 hover:underline">
          <span className="w-5 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          </span>
          {info.email}
        </a>
      )}
      {info.phone && (
        <a href={`tel:${info.phone}`} className="flex items-center text-emerald-600 hover:text-green-800 hover:underline">
          <span className="w-5 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
          </span>
          {info.phone}
        </a>
      )}
      {info.mobile && (
        <a href={`tel:${info.mobile}`} className="flex items-center text-emerald-600 hover:text-green-800 hover:underline">
          <span className="w-5 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
          </span>
          {info.mobile}
        </a>
      )}
    </>
  );
};

export default WhereWeWork;