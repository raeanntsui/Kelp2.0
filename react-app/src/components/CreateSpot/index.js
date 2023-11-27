import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk, createSpotImageThunk } from "../../store/spots";

export default function CreateSpotModal({ id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [categories, setCategories] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [closeHours, setCloseHours] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [validationObject, setValidationObject] = useState([]);
  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);

  const [imageFormData, setImageFormData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare spot data
    const spotData = new FormData();
    spotData.append("business_name", businessName);
    // ... append other spot data

    try {
      // Dispatch createSpotThunk with spotData and imageFormData
      const createdSpot = await dispatch(
        createSpotThunk(spotData, imageFormData)
      );

      console.log("Response from createSpotThunk:", createdSpot);

      // Redirect to the spots page or handle success as needed
      history.push(`/spots`);
    } catch (error) {
      console.error("Error creating a new Spot:", error);
    }
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    // Set imageFormData state
    setImageFormData(formData);
  };

  return (
    <>
      <h1 id="create-h1">Create a Spot</h1>
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-errors">
            {/* {errors &&
              errors.length >= 1 &&
              errors.map((error, idx) => (
                <div className="error" key={idx}>
                  {error}
                </div>
              ))} */}
          </div>
          <div className="form-chunk">
            <label>Hello! Let’s start with your business name</label>
            {/* <p id="form-chunk-p">
              We’ll use this information to help you claim your Kelp page. Your
              business will come up automatically if it is already listed.
            </p> */}
            <input
              type="text"
              placeholder="Enter your business' name here"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>What is your business address?</label>
            {/* <p id="form-chunk-p">
              Enter the address for where your customers can find you.
            </p> */}
            <input
              type="text"
              placeholder="Enter the address for where your customers can find you."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-chunk-side">
            <div className="form-chunk1">
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-chunk1">
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="form-chunk">
            <label>Zip Code</label>
            <input
              type="number"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>What kind of business are you in?</label>
            {/* <p id="form-chunk-p">
              Help customers find your product and service. You can add up to 3
              categories that best describe what your core business is. You can
              always edit and add more later.
            </p> */}
            <input
              type="text"
              id="description-input"
              placeholder="Share the categories of your business so customers can find your service"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          <div className="form-chunk-side">
            <div className="form-chunk1">
              <label>Open Hours </label>
              <input
                type="number"
                value={openHours}
                onChange={(e) => setOpenHours(e.target.value)}
              />
            </div>

            <div className="form-chunk1">
              <label>Close Hours </label>
              <input
                type="number"
                value={closeHours}
                onChange={(e) => setCloseHours(e.target.value)}
              />
            </div>
          </div>

          <div className="form-chunk">
            <label>Description</label>
            {/* <p id="form-chunk-p">
              Write some information about your business that will draw
              customers in.
            </p> */}
            <input
              placeholder="Write something about your business that will draw customers in"
              id="description-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>Price Range </label>
            <input
              placeholder="Select a price range between $ to $$$$"
              type="number"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
          <div>
            {/* Image input */}
            <label>
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="sign-up">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
