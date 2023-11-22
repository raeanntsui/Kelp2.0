import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSpotsThunk, updateSpotThunk } from "../../store/spots";

const UpdateSpotPage = () => {
  const { id } = useParams();

  const spots = useSelector((state) => state.spots.spots);
  const spot = spots[id];
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("checking to see if it is right spot", spot);

  const [businessName, setBusinessName] = useState(spot.business_name);

  console.log("before handleSubmit");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const form = new FormData();

  form.append("businessName", businessName);

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
          {/* {errors.address && (
                <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
              )} */}
        </div>
      </form>
    </div>
  );
};

export default UpdateSpotPage;
