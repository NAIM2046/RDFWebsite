import { useState } from "react";

const regions = ["All Regions", "Occupied Palestinian Territory", "Global"];
const themes = [
  "All Themes",
  "Environment",
  "Health",
  "Technology",
  "Politics",
];

const NewsFilter = ({ onFilter }) => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedTheme, setSelectedTheme] = useState("All Themes");

  const handleApply = () => {
    onFilter(selectedRegion, selectedTheme);
  };

  const handleReset = () => {
    setSelectedRegion("All Regions");
    setSelectedTheme("All Themes");
    onFilter("All Regions", "All Themes");
  };

  return (
    <div className="mx-auto max-w-7xl flex items-center gap-4 p-4 rounded-lg shadow-md">
      {/* Region Dropdown */}
      <select
        className="border p-2 rounded w-48"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Theme Dropdown */}
      <select
        className="border p-2 rounded w-48"
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>

      {/* Apply Button */}
      <button
        className="bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleApply}
      >
        APPLY &gt;
      </button>

      {/* Reset Button */}
      <button
        className="text-red-600 flex items-center gap-1"
        onClick={handleReset}
      >
        🔄 RESET
      </button>
    </div>
  );
};

export default NewsFilter;
