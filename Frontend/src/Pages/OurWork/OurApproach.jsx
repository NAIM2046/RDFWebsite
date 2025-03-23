import React, { useState } from "react";

const workApproach = [
  {
    title: "Identifying Issues",
    description:
      "We conduct thorough research and assessments to identify the most pressing community issues. Our team engages with local communities, gathers data, and evaluates the social, economic, and environmental challenges they face. This ensures that our solutions are relevant, impactful, and sustainable.",
    image: "/assets/photo-41.1-400x284.jpg",
  },
  {
    title: "Planning & Strategy",
    description:
      "Developing strategic action plans with measurable goals to address identified problems effectively. We collaborate with stakeholders, experts, and local leaders to design targeted interventions. Our approach includes setting clear objectives, defining success metrics, and ensuring that every step aligns with our mission for sustainable development.",
    image: "/assets/our2.webp",
  },
  {
    title: "Community Engagement",
    description:
      "Working closely with local communities to ensure participatory solutions that drive real impact. We believe that empowering people to take an active role in their development leads to lasting change. Through workshops, training programs, and partnerships, we create a space where community voices are heard, respected, and valued.",
    image: "/assets/our3.webp",
  },
  {
    title: "Implementation",
    description:
      "Executing projects and programs with transparency, efficiency, and sustainability in mind. Our on-the-ground teams work tirelessly to bring our plans to life while maintaining high standards of accountability and effectiveness. We ensure that our initiatives not only provide immediate benefits but also create long-term improvements in the community.",
    image: "/assets/our4.webp",
  },
  {
    title: "Monitoring & Impact",
    description:
      "Tracking progress, evaluating results, and continuously improving for long-term effectiveness. We use data-driven approaches, feedback loops, and impact assessments to measure the success of our initiatives. By learning from each project, we refine our methods and enhance future interventions, ensuring continued growth and improvement.",
    image: "/assets/our4.webp",
  },
];

const OurApproach = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row  justify-between gap-8 mt-1 bg-gray-100 pl-8 pt-4 rounded-lg min-h-[300px]">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold">
            Our <span className="text-orange-500">Approach</span>
          </h1>
          <p className="text-gray-700 mt-4">
            Placing women and girls at the center of focus and working with
            government, national and international NGOs, and civil society
            partners, RDF is working with millions.
            {isExpanded && (
              <>
                {" "}
                Through its projects and programs, RDF aims to create lasting
                change by strengthening marginalized communities and amplifying
                their voices. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quo minus corporis fugiat dignissimos rem numquam hic nemo
                molestias sunt laudantium possimus iste doloribus aliquam
                officia inventore, minima sit! Sint, repellat! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Voluptatem illo atque,
                vel ab dicta minima commodi. Quam expedita amet velit dicta,
                accusantium nihil aut maiores impedit pariatur optio ea eaque!
              </>
            )}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-500 font-semibold mt-4 inline-block hover:underline transition-all duration-300 cursor-pointer"
          >
            {isExpanded ? "Read Less -" : "Read More +"}
          </button>
        </div>

        {/* Right Images */}
        <div className="md:w-1/2 relative">
          <img
            src="/assets/ourapproach.webp"
            alt="Community Women"
            className="w-96 rounded-lg shadow-lg"
          />
          <img
            src="/assets/ourApproach1.webp"
            alt="Empowered Woman"
            className="hidden lg:flex absolute top-32 left-32 w-64 rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      </div>

      {/* Work Approach Steps */}
      <div className="space-y-12 mt-24">
        {workApproach.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } bg-white shadow-lg rounded-lg hover:shadow-xl transition-all p-6`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={step.image}
                alt={step.title}
                className="w-64 md:w-96 h-auto object-cover rounded-md shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurApproach;
