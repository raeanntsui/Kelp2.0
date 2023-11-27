import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import "./CreateSpot.css";

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

  //   if (!currentUser) {
  //     history.push("/");
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("business_name", businessName);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip_code", zipCode);
    formData.append("categories", categories);
    formData.append("open_hours", openHours);
    formData.append("close_hours", closeHours);
    formData.append("description", description);
    formData.append("price_range", priceRange);

    try {
      const response = await dispatch(createSpotThunk(formData));

      console.log("Response:", response);

      if (response && response.errors) {
        setErrors(response.errors);
      } else {
        console.log("Create new spot success", response);
        history.push(`/spots`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 id="create-h1">Create a Spot</h1>
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-errors">
            {errors &&
              errors.length >= 1 &&
              errors.map((error, idx) => (
                <div className="error" key={idx}>
                  {error}
                </div>
              ))}
          </div>
          <div className="form-chunk">
            <label>Hello! Let’s start with your business name</label>
            <p id="form-chunk-p">
              We’ll use this information to help you claim your Kelp page. Your
              business will come up automatically if it is already listed.
            </p>
            <input
              type="text"
              placeholder="Your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>What is your business address?</label>
            <p id="form-chunk-p">
              Enter the address for where your customers can find you.
            </p>
            <input
              type="text"
              placeholder="Street Address"
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
            <p id="form-chunk-p">
              Help customers find your product and service. You can add up to 3
              categories that best describe what your core business is. You can
              always edit and add more later.
            </p>
            <input
              type="text"
              placeholder="Business categories"
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
            <p id="form-chunk-p">
              Write some information about your business that will draw
              customers in.
            </p>
            <input
              id="description-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>Price Range </label>
            <input
              type="number"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
          <div className="sign-up">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
