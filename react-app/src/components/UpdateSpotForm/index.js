import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getAllSpotsThunk,
  getOneSpotThunk,
  updateSpotThunk,
} from "../../store/spots";

const UpdateSpotPage = () => {
  const { id } = useParams();
  const spots = useSelector((state) => state.spots.allSpots);
  const spot = spots[id];

  const dispatch = useDispatch();
  const history = useHistory();

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
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneSpotThunk(id)).then((response) => {
      setBusinessName(response.business_name);
      setAddress(response.address);
      setCity(response.city);
      setState(response.state);
      setZipCode(response.zip_code);
      setCategories(response.categories);
      setOpenHours(response.open_hours);
      setCloseHours(response.close_hours);
      setDescription(response.description);
      setPriceRange(response.price_range);
    });
  }, [dispatch, id]);

  useEffect(() => {
    const errorsObject = {};

    if (!businessName) errorsObject.businessName = "Business name is required";
    if (!address) errorsObject.address = "Address is required";
    if (!city) errorsObject.city = "City is required";
    if (!state) errorsObject.state = "State is required";
    const trimmedZipCode = zipCode.toString().trim();
    if (!trimmedZipCode) {
      errorsObject.zipCode = "Zip Code is required";
    } else if (trimmedZipCode.length !== 5 || isNaN(trimmedZipCode)) {
      errorsObject.zipCode = "Zip Code must be a 5-digit number";
    }
    if (!categories)
      errorsObject.categories = "Category of your business is required";
    if (!openHours) {
      errorsObject.openHours = "Open Hours is required";
    } else if (isNaN(openHours) || openHours < 0 || openHours > 24) {
      errorsObject.openHours = "Open Hours must be a number between 0 and 24";
    }

    if (!closeHours) {
      errorsObject.closeHours = "Close Hours is required";
    } else if (isNaN(closeHours) || closeHours < 0 || closeHours > 24) {
      errorsObject.closeHours = "Close Hours must be a number between 0 and 24";
    }
    if (!description) errorsObject.description = "Description is required";
    if (!priceRange) {
      errorsObject.priceRange = "Price Range is required";
    } else if (isNaN(priceRange) || priceRange < 0 || priceRange > 100000) {
      errorsObject.priceRange =
        "Price Range must be a number between 0 and 100000";
    }
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
  ]);

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

    const response = await dispatch(updateSpotThunk(formData, id));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      // console.log("update business successful res", response);
      history.push(`/spots/${id}`);
      return "success";
    }
  };

  return (
    <>
      <h1 id="create-h1">Update Your Spot</h1>
      <div className="form-content">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="modal-errors">
            {Object.keys(validationErrors).length > 0 && (
              <div className="modal-errors">
                {Object.values(validationErrors).map((error, idx) => (
                  <div className="error" key={idx}>
                    {error}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-chunk">
            <label>Business Name</label>
            <input
              type="text"
              placeholder="Name of business"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Address</label>
            <input
              type="text"
              placeholder="Business address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>City</label>
            <input
              type="text"
              placeholder="Business address"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>State</label>
            <input
              type="text"
              placeholder="Business address"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Zip Code</label>
            <input
              type="text"
              placeholder="Business address"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Categories</label>
            <input
              type="text"
              placeholder="Business address"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Open Hours</label>
            <input
              type="text"
              placeholder="Business address"
              value={openHours}
              onChange={(e) => setOpenHours(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Close Hours</label>
            <input
              type="text"
              placeholder="Business address"
              value={closeHours}
              onChange={(e) => setCloseHours(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Description</label>
            <input
              type="text"
              placeholder="Business address"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-chunk">
            <label>Price Range</label>
            <input
              type="text"
              placeholder="Business address"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
          <div className="sign-up">
            <button
              type="submit"
              disabled={Object.keys(validationErrors).length > 0}
              style={{
                backgroundColor: `rgba(0, 137, 13, ${
                  Object.keys(validationErrors).length > 0 ? "0.7" : "1"
                })`,
              }}>
              Update Spot
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateSpotPage;
