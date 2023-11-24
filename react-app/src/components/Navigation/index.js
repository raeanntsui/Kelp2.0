import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div id="upper-half-homepage">
        <div id="top-nav">
          <div id="kelp-logo">
            <NavLink exact to="/">
              Kelp
            </NavLink>{" "}
            <i class="fa-brands fa-yelp"></i>
          </div>
          <div id="searchbar">
            <input
              type="text"
              placeholder="things to do, nail salons, plumbers"
            />
            <h1>|</h1>
            <input type="text" placeholder="San Francisco, CA" />
            <button id="search-icon" type="submit" className="search-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div id="homepage-buttons">
            <button id="write-review-button">Write a Review</button>
            <button id="login-button">Log In</button>
            <button id="signup-button">Sign Up</button>
          </div>
        </div>
      </div>
      <div>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/spots">
              Spots
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/spots/new">
              Create New Spot
            </NavLink>
          </li>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navigation;
