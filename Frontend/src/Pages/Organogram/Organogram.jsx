import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const Organogram = () => {
  return (
    <div>
      <PageCoverPhoto
        imageUrl={`/assets/RDF Photo/organogram1.webp`}
        title={"Our OganoGram"}
      ></PageCoverPhoto>
      <div className="min-h-screen mx-auto max-w-7xl bg-white shadow-2xl p-6 mt-24 mb-10 rounded-lg">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-center text-orange-400 mb-6">
          RDF Organogram Structure
        </h1>

        {/* Organogram Flowchart Image */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/RDF Photo/organogram.png"
            alt="ESDO Organogram"
            className="w-full max-w-4xl shadow-2xl rounded-lg"
          />
        </div>
        <div className="bg-white">
          {/* Governance Details Section */}
          <div className=" p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Governance Overview
            </h2>
            <p className="text-gray-600">
              A 21-member <strong>General Committee (GC)</strong> governs ESDO.
              The GC selects a 7-member{" "}
              <strong>Executive Committee (EC)</strong> responsible for policy
              guidelines. The
              <strong>Executive Director (ED)</strong> oversees programs and
              implementation.
            </p>
          </div>

          {/* Coordination Units Section */}
          <div className="">
            <div className=" p-4 rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-700">
                Central Coordination Unit (CCU)
              </h3>
              <p className="text-gray-600">
                Consists of 21 senior officials (Finance, HR, Program, etc.).
                The ED is the Chairman of CCU.
              </p>
            </div>

            <div className=" p-4 rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-700">
                Regional Coordination Unit (RCU)
              </h3>
              <p className="text-gray-600">
                Five RCU teams ensure coordination between central and field
                offices.
              </p>
            </div>

            <div className=" p-4 rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-700">
                District Focal Team (DFT)
              </h3>
              <p className="text-gray-600">
                Manages all ongoing programs within each district.
              </p>
            </div>

            <div className=" p-4 rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-700">
                Upazila Focal Team (UFT)
              </h3>
              <p className="text-gray-500">
                Oversees Upazila programs, conducts review and planning
                meetings.
              </p>
            </div>
          </div>

          {/* Decision-Making Process Section */}
          <div className=" p-6 rounded-lg  mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Decision-Making Process
            </h2>
            <p className="text-gray-500">
              The governance structure follows a two-way decision-making
              process, ensuring accountability from both top-down and bottom-up
              approaches.
            </p>
            <ul className="list-disc pl-6 mt-3 text-gray-600">
              <li>GC → EC → ED → CCU → RCU → DFT → UFT</li>
              <li>
                AGM ensures annual review, discussions, and budget approvals.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organogram;
