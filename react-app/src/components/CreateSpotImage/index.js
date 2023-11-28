import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSpotImageThunk } from "../../store/spots";
import "./CreateSpotImage.css";

const ImageUploadModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [forceRender, setForceRender] = useState(false);

  const spotImages = useSelector(
    (state) => state.spots.allSpots[spotId]?.img_urls
  );
  console.log(
    "🚀 ~ file: index.js:18 ~ ImageUploadModal ~ spotImages:",
    spotImages
  );

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setError("");
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validExtensions = ["png", "jpeg", "jpg"];
    const validUrl = validExtensions.some((ext) => imageUrl.endsWith(ext));

    if (!validUrl) {
      setError("Invalid image URL. Supported extensions: png, jpeg, jpg");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("img_url", imageUrl);
      formData.append("preview", preview);

      await dispatch(createSpotImageThunk(spotId, formData, imageUrl, preview));
      closeModal();
      setPreview(imageUrl);
    } catch (error) {
      console.error("Image upload error:", error.message);
    }
  };

  useEffect(() => {
    console.log("Preview state changed:", preview);
    setForceRender((prev) => !prev);
  }, [preview]);

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="Enter image URL"
        />
        <div className="preview-img">
          {preview && <img src={preview} alt="Preview" />}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUploadModal;
