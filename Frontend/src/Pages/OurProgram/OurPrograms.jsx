import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import OurProgram from "../../Components/Navber/OurProgram/OurProgram";
import { Helmet } from "react-helmet-async";

const OurPrograms = () => {
  return (
    <div>
      <Helmet>
        {/* Title */}
        <title>RDF - Programs | Creating Sustainable Impact</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Discover RDF’s sustainable programs that empower communities in Bangladesh through education, skills development, women empowerment, climate resilience, and youth leadership."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="RDF, NGO Bangladesh, sustainable development, education programs, women empowerment, climate resilience, youth leadership, skills training"
        />

        {/* Open Graph (OG) for Social Sharing */}
        <meta property="og:title" content="RDF - Programs" />
        <meta
          property="og:description"
          content="Explore RDF’s programs focused on creating sustainable impact in Bangladesh through education, empowerment, and transformation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/programs" />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/og-image.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RDF - Programs" />
        <meta
          name="twitter:description"
          content="Learn about RDF programs creating sustainable impact in Bangladesh."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/assets/og-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com/programs" />
      </Helmet>

      {/* Page Components */}
      <PageCoverPhoto
        title={"OUR PROGRAM"}
        subtitle={"Creating Sustainable Impact through Transformation"}
        imageUrl={"assets/wherewework/DSC03473.JPG"}
      />
      <OurProgram />
    </div>
  );
};

export default OurPrograms;
