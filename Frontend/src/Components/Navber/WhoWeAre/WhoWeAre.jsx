import React from "react";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-green-400 text-center font-serif">
        Who We Are
      </h1>
      <section className="flex flex-col lg:flex-row items-center justify-center space-x-16 p-10 bg-white">
        <div className="relative w-96 h-96 pl-10">
          <div className="rounded-full border-4 border-green-500">
            <img
              src="/assets/RDF Photo/CEO.jpeg" // Replace with actual image path
              alt="Solar Pump"
              className="w-full h-full object-cover rounded-full  p-4"
            />
          </div>
          <div className=" absolute bottom-12 left-12 rounded-full border-2 border-green-400  ">
            <div className="p-2 bg-white rounded-full">
              <div className=" bg-green-600 text-white  rounded-full shadow-lg flex flex-col  justify-center items-center w-36 h-36 p-2 ">
                <span className="text-3xl font-bold">16+</span>
                <span className="text-sm text-center font-serif">
                  Year Work Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 text-gray-700  lg:mt-0 lg:ml-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Resource Development Foundation (RDF)
          </h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A animi
            eos velit quis nesciunt laborum adipisci neque, eveniet saepe, ipsa
            modi sint veniam quam atque assumenda, laudantium excepturi fuga
            optio. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Itaque, recusandae, praesentium quas error assumenda quidem
            repellendus quis sit laboriosam exercitationem officia. Aspernatur
            recusandae quasi veritatis eligendi aperiam velit ipsum rerum?
          </p>
          <p className="mt-2">
            Md. Abu Taher invented and designed the first deep tube well solar
            pump design in Southeast Asia and received the BIDS Golden Category
            Award from Spain. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Cumque pariatur saepe soluta vero maiores vitae, laborum,
            ipsam asperiores excepturi quas labore iure, quisquam est
            dignissimos! In eum vero id quas. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit consequatur dignissimos
            repellat vitae tempora nemo fugit omnis quod, ipsam odit eligendi
            mollitia, animi fugiat laboriosam necessitatibus at, in tempore
            quia.
          </p>
          <div className="flex items-center mt-2 text-green-400">
            <Link>Read More..</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeAre;
