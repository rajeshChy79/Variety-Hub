const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_products");

  const response = await fetch(url, {
    method: "post",
    body: formData,  // Important: Send form data
  });

  return response.json();
};

export default uploadImage;
