const uploadImageToImgbb = async (imageFile) => {
  const API_KEY = "c6a562004bff421926419e6b22cec40e"; // Replace with your IMGBB API key
  const formData = new FormData();
  formData.append("image", imageFile); // Append image file
  formData.append("name", imageFile.name); // Optional: Image name

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data.url; // Return the direct image URL
    } else {
      throw new Error("Image upload failed!");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
export default uploadImageToImgbb;
