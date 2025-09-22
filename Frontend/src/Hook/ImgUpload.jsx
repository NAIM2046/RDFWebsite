const uploadImageToImgbb = async (imageFile) => {
  const API_KEY = "7c51597d4570f95ba73873af0d327edc"; // Replace with your IMGBB API key
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
