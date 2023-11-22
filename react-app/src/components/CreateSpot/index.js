import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";

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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("business_name", businessName);
  //     formData.append("city", city);
  //     formData.append("state", state);
  //     formData.append("zip_code", zipCode);
  //     formData.append("categories", categories);
  //     formData.append("open_hours", openHours);
  //     formData.append("close_hours", closeHours);
  //     formData.append("description", description);
  //     formData.append("price_range", priceRange);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newSpot = {
      businessName,
      city,
      state,
      zipCode,
      categories,
      openHours,
      closeHours,
      description,
      priceRange,
      user_id: user.id,
    };
    const res = await dispatch(createSpotThunk(newSpot));

    if (!res.errors) {
      // history.push(`/products/${product.id}`)
      yesSubmitted(true);
    }
  };

  return (
    <div>
      <h1>Create a Spot</h1>
      <form onSubmit={handleSubmit}>
        {errors &&
          errors.length >= 1 &&
          errors.map((error, idx) => (
            <div className="error" key={idx}>
              {error}
            </div>
          ))}
        <label>Business name</label>
        <input
          type="text"
          placeholder="Title"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        <legend>Business Info</legend>

        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label>
          Zip Code
          <input
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>

        <label>
          Categories
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </label>

        <label>
          Open Hours
          <input
            type="number"
            value={openHours}
            onChange={(e) => setOpenHours(e.target.value)}
          />
        </label>

        <label>
          Close Hours
          <input
            type="number"
            value={closeHours}
            onChange={(e) => setCloseHours(e.target.value)}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Price Range
          <input
            type="number"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </label>

        <button
          type="submit"
          //   disabled={Object.keys(validationObject).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
