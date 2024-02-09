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
  const [imageUrl, setImageUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);

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
    formData.append("img_url", imageUrl);

    if (Object.keys(validationErrors).length === 0) {
      await dispatch(createSpotThunk(formData)).then((res) => {
        history.push(`/spots/${res.id}`);
      });
    }
    setSubmit(true);
  };

  useEffect(() => {
    let errorsObject = {};
    if (!businessName) errorsObject.businessName = "Business name is required";
    if (!address) errorsObject.address = "Address is required";
    if (!city) errorsObject.city = "City is required";
    if (!state) errorsObject.state = "State is required";
    if (!zipCode) {
      errorsObject.zipCode = "Zip Code is required";
    } else if (zipCode.length !== 5 || isNaN(zipCode)) {
      errorsObject.zipCode = "Zip Code must be a 5-digit number";
    }
    if (!categories)
      errorsObject.categories = "Category of your business is required";
    if (!openHours) {
      errorsObject.openHours = "Enter a valid opening hour";
    } else if (isNaN(openHours) || openHours < 0 || openHours > 24) {
      errorsObject.openHours = "Open Hours must be a number between 0 and 24";
    }
    if (!closeHours) {
      errorsObject.closeHours = "Enter a valid closing hour";
    } else if (isNaN(closeHours) || closeHours < 0 || closeHours > 24) {
      errorsObject.closeHours = "Close Hours must be a number between 0 and 24";
    }
    if (!description) errorsObject.description = "Description is required";
    if (!priceRange) {
      errorsObject.priceRange = "Average price is required";
    }
    // if (isNaN(priceRange) || priceRange < 0 || priceRange > 100000) {
    //   errorsObject.priceRange =
    //     "Average price must be a number between $0 and $100,000";
    // }
    if (priceRange && priceRange <= 0)
      errorsObject.priceRange = "Price must be at least $1";
    if (priceRange && priceRange < 0)
      errorsObject.priceRange = "Price cannot be negative";
    if (priceRange && priceRange > 100000)
      errorsObject.priceRange = "Price cannot exceed $100,000";
    if (!imageUrl) errorsObject.imageUrl = "Image is required";
    setValidationErrors(errorsObject);
  }, [
    businessName,
    address,
    city,
    state,
    zipCode,
    categories,
    openHours,
    closeHours,
    description,
    priceRange,
    imageUrl,
  ]);
  return (
    <>
      <h1 id="create-h1">Create a New Business</h1>
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-errors"></div>
          <div className="form-chunk">
            <label>
              Hello! Let’s start with the name for your new business!
            </label>
            {submit && validationErrors.businessName && (
              <p id="errors">{validationErrors.businessName}</p>
            )}
            <input
              type="text"
              placeholder="Enter your business' name here"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>Where is your business located?</label>
            {submit && validationErrors.address && (
              <p id="errors">{validationErrors.address}</p>
            )}
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
              {submit && validationErrors.city && (
                <p id="errors">{validationErrors.city}</p>
              )}
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-chunk1">
              <label>State</label>
              {submit && validationErrors.state && (
                <p id="errors">{validationErrors.state}</p>
              )}
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
            {submit && validationErrors.zipCode && (
              <p id="errors">{validationErrors.zipCode}</p>
            )}
            <input
              type="number"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>What kind of business are you in?</label>
            {submit && validationErrors.categories && (
              <p id="errors">{validationErrors.categories}</p>
            )}
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
              <label>When do you open?</label>
              {submit && validationErrors.openHours && (
                <p id="errors">{validationErrors.openHours}</p>
              )}
              <input
                type="number"
                placeholder="Opening time (Military Time)"
                value={openHours}
                onChange={(e) => setOpenHours(e.target.value)}
              />
            </div>

            <div className="form-chunk1">
              <label>When do you close?</label>
              {submit && validationErrors.closeHours && (
                <p id="errors">{validationErrors.closeHours}</p>
              )}
              <input
                type="number"
                placeholder="Closing time (Military Time)"
                value={closeHours}
                onChange={(e) => setCloseHours(e.target.value)}
              />
            </div>
          </div>

          <div className="form-chunk">
            <label>Tell us more about your business</label>
            {submit && validationErrors.description && (
              <p id="errors">{validationErrors.description}</p>
            )}
            <input
              placeholder="Write something that will draw customers in"
              id="description-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>
              What is average price of the items or services sold at your
              business?{" "}
            </label>
            {submit && validationErrors.priceRange && (
              <p id="errors">{validationErrors.priceRange}</p>
            )}
            <input
              placeholder="What is the average price?"
              type="number"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>

          <div className="form-chunk">
            <label>Image URL</label>
            {submit && validationErrors.imageUrl && (
              <p id="errors">{validationErrors.imageUrl}</p>
            )}
            <input
              type="text"
              placeholder="Enter the URL for your business image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="sign-up">
            <button
              className="button-color"
              type="submit"
              style={{
                backgroundColor: `rgba(0, 137, 13, ${
                  Object.keys(validationErrors).length > 0 ? "0.7" : "1"
                })`,
              }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
