import React from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import { useLocation } from "react-router-dom";

const ActivitiesDetail = () => {
  const location = useLocation();
  const { activity } = location?.state;
  console.log(activity);

  const projects = [
    {
      name: "Resilient Futures: Transforming Gender Inequality and Ensuring Empowerment for Climate-induced Displaced People in Urban Slum (Climate Bridge Fund-CBF)",
      location: "Barishal City Corporation, Barishal",
      intervention: [
        "Enhance Service Access",
        "Strengthen Local Capacities",
        "Boost Resilience",
      ],
      dateFrom: "25/1/2025",
      dateTo: "11/1/2027",
      benefitedHHs: 2900,
      contractValue: "32,604,444",
      fundingAgencies: "KfW-BRAC",
      costRatio: "69:31",
    },
    {
      name: "Bridging the Gap: Locally-led and Comprehensive Support to Combat Child Marriage in Barishal- USAID Bangladesh America Maitree Activity (BAMA)",
      location: "Barishal, Gouranadi, Babuganj",
      intervention: [
        "Legal and Policy Advocacy",
        "Education",
        "Health Services",
        "Economic Development",
        "Community Engagement and Capacity Building",
      ],
      dateFrom: "12/11/2024",
      dateTo: "11/11/2026",
      benefitedHHs: 4345,
      contractValue: "42,363,930",
      fundingAgencies: "USAID-BRAC",
      costRatio: "69:31",
    },
    {
      name: "Climate Action for Coastal Communities",
      location: "Cox’s Bazar, Chattogram",
      intervention: [
        "Disaster Preparedness",
        "Community Awareness",
        "Infrastructure Development",
      ],
      dateFrom: "1/3/2024",
      dateTo: "30/9/2026",
      benefitedHHs: 5200,
      contractValue: "50,000,000",
      fundingAgencies: "UNDP-BRAC",
      costRatio: "70:30",
    },
    {
      name: "Women’s Economic Empowerment Initiative",
      location: "Dhaka, Narayanganj",
      intervention: [
        "Skill Development",
        "Financial Inclusion",
        "Entrepreneurship Support",
      ],
      dateFrom: "15/5/2023",
      dateTo: "15/5/2026",
      benefitedHHs: 6000,
      contractValue: "60,500,000",
      fundingAgencies: "World Bank-BRAC",
      costRatio: "65:35",
    },
    {
      name: "Sustainable Agriculture and Food Security",
      location: "Rajshahi, Rangpur",
      intervention: ["Organic Farming", "Irrigation Support", "Market Access"],
      dateFrom: "10/6/2022",
      dateTo: "10/6/2025",
      benefitedHHs: 7500,
      contractValue: "45,800,000",
      fundingAgencies: "FAO-BRAC",
      costRatio: "68:32",
    },
    {
      name: "Youth Skills and Employment Program",
      location: "Sylhet, Mymensingh",
      intervention: [
        "Vocational Training",
        "Job Placement",
        "Internship Support",
      ],
      dateFrom: "5/2/2024",
      dateTo: "5/2/2027",
      benefitedHHs: 4000,
      contractValue: "30,750,000",
      fundingAgencies: "ILO-BRAC",
      costRatio: "66:34",
    },
  ];
  return (
    <div className="">
      <PageCoverPhoto title={activity.title}></PageCoverPhoto>
      <div>
        <div className="overflow-x-auto p-4 ">
          <table className="min-w-full border border-gray-300 text-sm text-left shadow-2xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Project Name</th>
                <th className="border px-4 py-2">Project Location</th>
                <th className="border px-4 py-2">Key Intervention Area</th>
                <th className="border px-4 py-2">Date From</th>
                <th className="border px-4 py-2">Date To</th>
                <th className="border px-4 py-2">Benefited HHs</th>
                <th className="border px-4 py-2">Contract Value (BDT)</th>
                <th className="border px-4 py-2">Funding Agencies</th>
                <th className="border px-4 py-2">
                  Direct & Administrative Cost Ratio
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">
                    {" "}
                    <strong>{index + 1}.</strong> {project.name}
                  </td>
                  <td className="border px-4 py-2">{project.location}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc ml-4">
                      {project.intervention.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">{project.dateFrom}</td>
                  <td className="border px-4 py-2">{project.dateTo}</td>
                  <td className="border px-4 py-2">{project.benefitedHHs}</td>
                  <td className="border px-4 py-2">{project.contractValue}</td>
                  <td className="border px-4 py-2">
                    {project.fundingAgencies}
                  </td>
                  <td className="border px-4 py-2">{project.costRatio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDetail;
