import React from "react";
import { FaLocationDot } from "react-icons/fa6";
const ContactUs = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 p-8 bg-gray-200 min-h-screen mt-24">
        <div className="max-w-7xl  flex flex-col md:flex-row w-full shadow-lg rounded-3xl overflow-hidden space-x-4">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/3 h-full bg-white  shadow-2xl rounded-3xl">
            <img
              src="/assets/RDF Photo/tower.jpg" // Replace with your image path
              alt="Office Building"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* Right Side - Contact Info */}
          <div className="w-full md:w-2/3 flex flex-col justify-between p-8 bg-white shadow-2xl rounded-3xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Contact Us
            </h2>

            {/* Head Office */}
            <div className="mb-6">
              <a
                href="https://www.google.com/maps/place/RDF+Tower/@22.1519777,90.1285341,16z/data=!4m14!1m7!3m6!1s0x30aa998d296c6c1f:0x567c97ad6ae76f66!2sRDF+Tower!8m2!3d22.151842!4d90.1308193!16s%2Fg%2F11c1wx0l52!3m5!1s0x30aa998d296c6c1f:0x567c97ad6ae76f66!8m2!3d22.151842!4d90.1308193!16s%2Fg%2F11c1wx0l52?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                className="text-xl font-semibold text-gray-700 flex items-center gap-2"
              >
                <FaLocationDot className="text-orange-400" /> Head Office
              </a>
              <p className="text-gray-600">542J+P8P, Police Line Rd, Barguna</p>
            </div>

            {/* Dhaka Office */}
            <div className="mb-6">
              <a
                href="https://www.google.com/maps/place/Resource+Development+Foundation/@23.7656605,90.3470314,15z/data=!4m10!1m2!2m1!1sPisciculture+Housing+Society+RDF!3m6!1s0x3755c098a14f7011:0x5e4ead7428592246!8m2!3d23.7700141!4d90.3558215!15sCiBQaXNjaWN1bHR1cmUgSG91c2luZyBTb2NpZXR5IFJERloiIiBwaXNjaWN1bHR1cmUgaG91c2luZyBzb2NpZXR5IHJkZpIBF25vbl9wcm9maXRfb3JnYW5pemF0aW9umgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU50YWpWeE9VWlJFQUXgAQD6AQUIgwEQPA!16s%2Fg%2F11clsh20x9?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                className="text-xl font-semibold text-gray-700 flex items-center gap-2"
              >
                <FaLocationDot className="text-orange-400" /> Dhaka Office
              </a>
              <p className="text-gray-600">
                House # 21, Road # 12, Pisciculture, Housing Society, Block-Kha,
                Adabor,, Dhaka 1207
              </p>
            </div>

            {/* Email */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                ✉️ Mail Us
              </h3>
              <p className="text-gray-600">
                <strong>Head Office:</strong> rdfbangladesh@hotmail.com,
                zamenesdo@gmail.com
              </p>
              <p className="text-gray-600">
                <strong>Dhaka Office:</strong> rdfbangladesh@hotmail.com
              </p>
            </div>

            {/* Phone Numbers */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                📞 Call Us
              </h3>
              <p className="text-gray-600">
                <strong>Head Office:</strong> +88-0561-52149, +88-0561-61614,
                +88 01714-063360
              </p>
              <p className="text-gray-600">
                <strong>Dhaka Office:</strong> +88-02-58154857, +88-01713149259
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-8 flex flex-col justify-center items-center mt-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Our Locations
        </h2>
        <div className="w-full h-96 rounded-3xl overflow-hidden shadow-lg  items-center ">
          <iframe
            title="RDF Office Locations"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.848742142172!2d90.35582151538424!3d23.77001414458664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c098a14f7011%3A0x5e4ead7428592246!2sResource%20Development%20Foundation!5e0!3m2!1sen!2sbd!4v1617312889246!5m2!1sen!2sbd"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
