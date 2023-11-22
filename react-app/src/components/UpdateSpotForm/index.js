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
      console.log("update product successful react act, res", response);
      history.push(`/spots/${id}`);
      return "success";
    }
  };

  return (
    <div>
      <h1>Update Your spot</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Business Name</label>
          <input
            type="text"
            placeholder="Name of business"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="Business address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="Business address"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            placeholder="Business address"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            placeholder="Business address"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div>
          <label>Categories</label>
          <input
            type="text"
            placeholder="Business address"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        <div>
          <label>Open Hours</label>
          <input
            type="text"
            placeholder="Business address"
            value={openHours}
            onChange={(e) => setOpenHours(e.target.value)}
          />
        </div>
        <div>
          <label>Close Hours</label>
          <input
            type="text"
            placeholder="Business address"
            value={closeHours}
            onChange={(e) => setCloseHours(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Business address"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price Range</label>
          <input
            type="text"
            placeholder="Business address"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
};

export default UpdateSpotPage;
