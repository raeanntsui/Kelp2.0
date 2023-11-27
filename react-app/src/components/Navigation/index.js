import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import BusinessButton from "./KelpForBusiness";
// import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import "./Navigation.css";


function Navigation({ isLoaded }) {
  // const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const businessOwner = sessionUser?.business_owner;

  const [spots, setSpots] = useState(getAllSpotsThunk)

  const filterSpots = e => {
    const search = e.target.value.toLowerCase()
    const filteredSpots = getAllSpotsThunk.filter(spots => spots.business_name.toLowerCase().includes(search))
    setSpots(filteredSpots)
  }

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();

  //   history.push("/spots");
  // };

  return (
    <>
      <div id="upper-half-homepage">
        <div id="top-nav">
          <div id="kelp-logo">
            <NavLink exact to="/">
              <div className="logo-container">
                <h1>Kelp</h1>
                <img
                  id="kelp-image"
                  src="https://media.tenor.com/4eI6Uy-ariYAAAAC/jellyfish-spongebob.gif"
                  alt="Kelp Logo"
                />
              </div>
            </NavLink>{" "}
          </div>
          {/* <div id="searchbar">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text" onChange={(e) => filterSpots(e)}
                placeholder="things to do, nail salons, plumbers"
              />
              <h1>|</h1>
              <input type="text" placeholder="San Francisco, CA" />
              <button id="search-icon" type="submit" className="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div> */}
          <div id="homepage-buttons">
            {businessOwner ? (
              // <div className="login-dropdown">
              //   {isLoaded && <BusinessButton user={sessionUser} />}
              // </div>
              <NavLink exact to="/spots/new">
                Create a New Spot
              </NavLink>
            ) : null}
            <div className="all-spots">
              <NavLink exact to="/spots">
                View All Spots
              </NavLink>
            </div>
            {/* <button id="write-review-button">Write a Review</button> */}
            <div className="login-dropdown">
              {isLoaded && (
                // <li>
                <ProfileButton user={sessionUser} />
                // </li>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
