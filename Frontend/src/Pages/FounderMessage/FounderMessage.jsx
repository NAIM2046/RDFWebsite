import React from "react";
import demonfounder from "/assets/CEOphoto/CEO Pic PP.jpg";
import tower from "/assets/RDF Photo/tower.jpg";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";
const FounderMessage = () => {
  return (
    <div>
      <Helmet>
        <title> RDF-Rounder Message </title>
      </Helmet>
      <div>
        <PageCoverPhoto
          imageUrl={`/assets/RDF Photo/3.jpg`}
          title={"FOUNDER MESSAGE"}
        ></PageCoverPhoto>
      </div>
      <div>
        <div className="min-h-screen flex items-center justify-center  px-8 py-12 mt-2 bg-gray-100">
          <div className="max-w-7xl  space-x-8 rounded-2xl  md:flex">
            {/* Left Side - Founder Image */}
            <div className=" w-full md:w-1/3 flex flex-col justify-center items-center p-6 shadow-lg space-y-4 rounded-lg bg-white ">
              <img
                src={demonfounder} // Replace with your actual image path
                alt="Founder"
                className=" shadow-2xl rounded-xl "
              />
              <div>
                <p className="text-3xl font-serif italic ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi possimus explicabo autem officia. Voluptate ipsam modi
                  reprehenderit ut! Omnis at nisi saepe similique facilis.
                  Repellat illo ab repudiandae delectus qui!
                </p>
                <div className="flex  flex-col justify-center items-center font-serif mt-2">
                  <p> M Golam Mostofa </p>
                  <h3 className="font-semibold text-lg text-gray-700">
                    Founder & Dhif Executive officer
                  </h3>
                </div>
              </div>
              <div className="w-full">
                <img
                  src={tower} // Replace with your actual image path
                  alt="Founder"
                  className=" shadow-2xl w-full object-cover "
                />
                <p className="text-center text-sm font-light">RDF TOWER</p>
              </div>
            </div>

            {/* Right Side - Founder Message */}
            <div className="md:w-2/3 p-6 flex flex-col rounded-lg  shadow-lg bg-white">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center font-serif">
                Message from Our Founder
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                "At RDF Bangladesh Foundation, we believe in empowering
                communities through education, healthcare, and sustainability
                initiatives. Our journey has been one of passion and dedication,
                and we invite you to join us in making a difference. Together,
                we can build a better future for the next generation. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Molestias
                tenetur hic, ad reiciendis itaque voluptate illum accusantium
                ipsam nostrum voluptatibus iure sint esse dicta odit enim,
                repellendus facere tempore adipisci. "
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderMessage;
