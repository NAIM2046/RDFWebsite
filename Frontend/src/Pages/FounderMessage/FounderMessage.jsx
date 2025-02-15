import React from "react";
import demonfounder from "/assets/RDF Photo/demofounder.jpg";
import tower from "/assets/RDF Photo/tower.jpg";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
const FounderMessage = () => {
  return (
    <div>
      <div>
        <PageCoverPhoto
          imageUrl={`/assets/RDF Photo/3.jpg`}
          title={"FOUNDER MESSAGE"}
        ></PageCoverPhoto>
      </div>
      <div>
        <div className="min-h-screen flex items-center justify-center  px-6 py-12 mt-2">
          <div className="max-w-7xl bg-white space-x-3  md:flex">
            {/* Left Side - Founder Image */}
            <div className="md:w-1/3 flex flex-col justify-center items-center p-6 shadow-lg space-y-4 rounded-lg ">
              <img
                src={demonfounder} // Replace with your actual image path
                alt="Founder"
                className=" shadow-lg border-4 border-white"
              />
              <div>
                <p className="text-3xl font-serif italic ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi possimus explicabo autem officia. Voluptate ipsam modi
                  reprehenderit ut! Omnis at nisi saepe similique facilis.
                  Repellat illo ab repudiandae delectus qui!
                </p>
                <div className="flex  flex-col justify-center items-center">
                  <p>Dr. John Doe </p>
                  <h3 className="font-semibold text-lg text-gray-700">
                    Founder & CEO
                  </h3>
                </div>
              </div>

              <img
                src={tower} // Replace with your actual image path
                alt="Founder"
                className=" shadow-lg w-full "
              />
            </div>

            {/* Right Side - Founder Message */}
            <div className="md:w-2/3 p-6 flex flex-col rounded-lg  shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
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
